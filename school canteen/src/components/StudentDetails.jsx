import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { ArrowLeft, ShoppingCart } from "lucide-react";



export default function StudentDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        students,
        snacks,
        orders,
        fetchStudents,
        fetchSnacks,
        fetchOrders,
    } = useStore();

    const [student, setStudent] = useState(null);

    useEffect(() => {
        fetchStudents();
        fetchSnacks();
        fetchOrders();
    }, []);

    useEffect(() => {
        const found = students.find((s) => String(s.id) === id);
        setStudent(found);
    }, [students, id]);

    // 🔥 Filter orders for this student
    const studentOrders = (orders || []).filter(
        (o) => String(o.studentId) === id
    );

    // 🔥 Get snack name
    const getSnackName = (snackId) => {
        const snack = snacks.find((s) => s.id === snackId);
        return snack?.name || "Unknown";
    };

    if (!student) {
        return <p className="p-6">Loading...</p>;
    }

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

            {/* 🔙 Back Button */}
            <button
                onClick={() => navigate("/students")}
                className="flex items-center gap-2 text-gray-600 hover:text-black mb-4"
            >
                <ArrowLeft size={18} />
                Back to Students
            </button>

            {/* 👤 Student Info Card */}
            <div className="bg-white rounded-2xl shadow p-6 mb-6">
                <h1 className="text-2xl font-bold mb-2">{student.name}</h1>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <p>🎫 Referral: {student.referralCode}</p>
                    <p>🏫 Class: {student.class}</p>
                    <p>🏠 House: {student.house}</p>
                </div>

                <div className="mt-4 text-orange-500 font-bold text-lg">
                    Total Spent: ₹{student.totalSpent}
                </div>
            </div>

            {/* 🧾 Orders Section */}
            <div className="bg-white rounded-2xl shadow p-6">

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Orders History</h2>

                    {/* ➕ New Order */}
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        <ShoppingCart size={16} />
                        New Order
                    </button>
                </div>

                {/* Table */}
                {studentOrders.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="border-b">
                                <tr>
                                    <th className="py-2">Snack</th>
                                    <th>Qty</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>

                            <tbody>
                                {studentOrders.map((order) => (
                                    <tr key={order.id} className="border-b">
                                        <td className="py-2">
                                            {getSnackName(order.snackId)}
                                        </td>
                                        <td>{order.quantity}</td>
                                        <td className="text-orange-500 font-medium">
                                            ₹{order.totalPrice}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-400 text-center mt-6">
                        No orders yet 😔
                    </p>
                )}
            </div>
        </div>
    );
}