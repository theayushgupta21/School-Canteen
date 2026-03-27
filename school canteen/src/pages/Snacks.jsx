import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { ShoppingCart } from "lucide-react";
import CheckIcon from "@mui/icons-material/Check";
import { Alert } from "@mui/material";

export default function Snacks() {
    const {
        snacks,
        students,
        selectedSnack,
        fetchSnacks,
        fetchStudents,
        setSelectedSnack,
        createOrder,
        loading,
        error: apiError,
    } = useStore();

    const [selectedStudent, setSelectedStudent] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [formError, setFormError] = useState("");
    const [placing, setPlacing] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [showAlert, setShowAlert] = useState(false); // ✅ alert popup state

    useEffect(() => {
        fetchSnacks();
        fetchStudents();
    }, []);

    // 🔥 Loading
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 animate-pulse">Loading snacks... ⏳</p>
            </div>
        );
    }

    // 🔥 API Error
    if (apiError) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">{apiError}</p>
            </div>
        );
    }

    // 🔥 Emoji helper
    const getEmoji = (name = "") => {
        const n = name.toLowerCase();
        if (n.includes("burger")) return "🍔";
        if (n.includes("pizza")) return "🍕";
        if (n.includes("coffee")) return "☕";
        if (n.includes("donut")) return "🍩";
        if (n.includes("fries")) return "🍟";
        if (n.includes("sandwich")) return "🥪";
        if (n.includes("samosa")) return "🥟";
        if (n.includes("cold")) return "🥤";
        return "🍽️";
    };

    // 🔥 Reset modal
    const closeModal = () => {
        setSelectedSnack(null);
        setSelectedStudent("");
        setQuantity(1);
        setFormError("");
    };

    // 🔥 Order handler
    const handleOrder = async () => {
        if (!selectedStudent) {
            setFormError("⚠️ Please select a student");
            return;
        }

        if (quantity < 1 || quantity > 5) {
            setFormError("⚠️ Quantity must be between 1-5");
            return;
        }

        const order = {
            studentId: Number(selectedStudent),
            snackId: selectedSnack.id,
            quantity,
            totalPrice: selectedSnack.price * quantity,
            date: new Date().toISOString(),
        };

        try {
            setPlacing(true);
            await createOrder(order);
            await fetchStudents();

            closeModal();

            // ✅ show success alert and change button
            setOrderSuccess(true);
            setShowAlert(true);

            // hide alert automatically after 3s
            setTimeout(() => {
                setOrderSuccess(false);
                setShowAlert(false);
            }, 3000);

        } catch (err) {
            setFormError("❌ Failed to place order");
        } finally {
            setPlacing(false);
        }
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

            {/* Header */}
            <h1 className="text-2xl font-bold mb-6">
                Today's <span className="text-orange-500">Menu 🍔</span>
            </h1>

            {/* Empty */}
            {snacks.length === 0 ? (
                <p className="text-center text-gray-400 mt-10">No snacks available 🍽️</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {snacks.filter((s) => s.name).map((snack) => (
                        <div key={snack.id} className="bg-white rounded-2xl shadow hover:shadow-lg transition">
                            <div className="h-24 bg-orange-100 flex justify-center items-center text-3xl">
                                {getEmoji(snack.name)}
                            </div>
                            <div className="p-4">
                                <h2 className="font-semibold">{snack.name}</h2>
                                <p className="text-orange-500 font-bold">₹{snack.price}</p>
                                <p className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full inline-block mt-1">
                                    {snack.ordersCount || 0} orders
                                </p>
                                <button
                                    onClick={() => setSelectedSnack(snack)}
                                    className="mt-4 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl"
                                >
                                    <ShoppingCart size={16} />
                                    Order Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {selectedSnack && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md">
                        <h2 className="text-xl font-bold mb-3">Order {selectedSnack.name}</h2>

                        {formError && <p className="text-red-500 text-sm mb-2">{formError}</p>}

                        {/* Student */}
                        <select
                            value={selectedStudent}
                            onChange={(e) => setSelectedStudent(e.target.value)}
                            className="border w-full p-2 rounded-lg my-2"
                        >
                            <option value="">Select Student</option>
                            {students.map((s) => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>

                        {/* Quantity */}
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="border w-full p-2 rounded-lg my-2"
                        />

                        {/* Total */}
                        <div className="flex justify-between my-3">
                            <span>Total:</span>
                            <span className="font-bold text-orange-500">₹{selectedSnack.price * quantity}</span>
                        </div>

                        {/* Success Alert */}
                        {showAlert && (
                            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" className="mb-3">
                                Order Placed Successfully!
                            </Alert>
                        )}

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <button onClick={closeModal} className="w-full bg-gray-300 py-2 rounded-lg">
                                Cancel
                            </button>

                            <button
                                onClick={handleOrder}
                                disabled={placing || !selectedStudent || orderSuccess}
                                className={`w-full py-2 rounded-lg text-white transition-all duration-300 flex items-center justify-center gap-2 ${orderSuccess
                                        ? "bg-green-500 scale-95 cursor-not-allowed"
                                        : placing
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-green-500 hover:bg-green-600"
                                    }`}
                            >
                                {orderSuccess ? <><CheckIcon fontSize="small" /> Order Placed!</> : placing ? "Placing..." : "Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}