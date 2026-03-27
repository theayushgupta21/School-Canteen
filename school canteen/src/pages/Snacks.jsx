import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { ShoppingCart } from "lucide-react";

export default function Snacks() {
    const {
        snacks,
        students,
        selectedSnack,
        fetchSnacks,
        fetchStudents,
        setSelectedSnack,
        createOrder,
    } = useStore();

    const [selectedStudent, setSelectedStudent] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchSnacks();
        fetchStudents();
    }, []);

    // 🔥 Emoji logic
    const getEmoji = (name) => {
        const n = name.toLowerCase();
        if (n.includes("burger")) return "🍔";
        if (n.includes("pizza")) return "🍕";
        if (n.includes("coffee")) return "☕";
        if (n.includes("donut")) return "🍩";
        if (n.includes("fries")) return "🍟";
        if (n.includes("sandwich")) return "🥪";
        if (n.includes("smoothie")) return "🥭";
        return "🍽️";
    };

    // 🔥 Close modal reset
    const closeModal = () => {
        setSelectedSnack(null);
        setSelectedStudent("");
        setQuantity(1);
        setError("");
    };

    // 🔥 Order handler
    const handleOrder = async () => {
        if (!selectedStudent) {
            setError("⚠️ Please select a student");
            return;
        }

        if (quantity < 1 || quantity > 5) {
            setError("⚠️ Quantity must be between 1-5");
            return;
        }

        const order = {
            studentId: Number(selectedStudent),
            snackId: selectedSnack.id,
            quantity: Number(quantity),
            totalPrice: selectedSnack.price * quantity,
            date: new Date().toISOString(),
        };

        try {
            await createOrder(order);
            alert("✅ Order placed successfully!");
            closeModal();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

            {/* 🔥 Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    Today's <span className="text-orange-500">Menu 🍔</span>
                </h1>
            </div>

            {/* 🧾 Snacks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {snacks.map((snack) => (
                    <div
                        key={snack.id}
                        className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
                    >
                        {/* Top Icon */}
                        <div className="h-24 bg-orange-100 flex justify-center items-center text-3xl">
                            {getEmoji(snack.name)}
                        </div>

                        <div className="p-4">
                            <h2 className="font-semibold text-lg">{snack.name}</h2>

                            <p className="text-orange-500 font-bold text-lg">
                                ₹{snack.price}
                            </p>

                            {/* Orders badge */}
                            <p className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full inline-block mt-1">
                                {snack.ordersCount} orders
                            </p>

                            <button
                                onClick={() => setSelectedSnack(snack)}
                                className="mt-4 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl transition"
                            >
                                <ShoppingCart size={16} />
                                Order Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* 🔥 Modal */}
            {selectedSnack && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

                    <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md animate-fadeIn">

                        <h2 className="text-xl font-bold mb-3">
                            Order {selectedSnack.name}
                        </h2>

                        {/* Error */}
                        {error && (
                            <p className="text-red-500 text-sm mb-2">{error}</p>
                        )}

                        {/* Student */}
                        <label className="text-sm font-medium">Student</label>
                        <select
                            value={selectedStudent}
                            onChange={(e) => {
                                setSelectedStudent(e.target.value);
                                setError("");
                            }}
                            className="border w-full p-2 rounded-lg my-2 focus:outline-orange-400"
                        >
                            <option value="">Select Student</option>
                            {students.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.name}
                                </option>
                            ))}
                        </select>

                        {/* Quantity */}
                        <label className="text-sm font-medium">Quantity (1–5)</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={quantity}
                            onChange={(e) => {
                                let val = Number(e.target.value);
                                if (val < 1) val = 1;
                                if (val > 5) val = 5;
                                setQuantity(val);
                            }}
                            className="border w-full p-2 rounded-lg my-2 focus:outline-orange-400"
                        />

                        {/* Total */}
                        <div className="flex justify-between mt-3 mb-4">
                            <span>Total:</span>
                            <span className="font-bold text-orange-500">
                                ₹{selectedSnack.price * quantity}
                            </span>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={closeModal}
                                className="w-full bg-gray-300 hover:bg-gray-400 py-2 rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleOrder}
                                disabled={!selectedStudent || quantity < 1 || quantity > 5}
                                className={`w-full py-2 rounded-lg text-white transition ${selectedStudent && quantity >= 1 && quantity <= 5
                                        ? "bg-green-500 hover:bg-green-600"
                                        : "bg-gray-400 cursor-not-allowed"
                                    }`}
                            >
                                Confirm Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}