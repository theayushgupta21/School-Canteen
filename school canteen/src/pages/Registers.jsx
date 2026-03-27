import { useState } from "react";
import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    User,
    School,
    Home,
    Hash,
    Sparkles,
} from "lucide-react";

export default function Register() {
    const navigate = useNavigate();
    const { students, fetchStudents } = useStore();

    const [name, setName] = useState("");
    const [studentClass, setStudentClass] = useState("10th");
    const [house, setHouse] = useState("Ganga");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // 🔥 Auto ID generator
    const generateId = () => {
        if (!students.length) return "1";
        const maxId = Math.max(...students.map((s) => Number(s.id)));
        return String(maxId + 1);
    };

    // 🔥 Referral Code Generator
    const generateReferral = (name) => {
        const prefix = (name || "STD").slice(0, 3).toUpperCase();
        const random = Math.floor(100 + Math.random() * 900);
        return `${prefix}${random}`;
    };

    // 🔥 Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError("⚠️ Name is required");
            return;
        }

        setLoading(true);

        const newStudent = {
            id: generateId(), // ✅ integer (1,2,3...)
            name,
            class: studentClass,
            house,
            referralCode: generateReferral(name),
            totalSpent: 0,
        };

        try {
            await fetch("http://localhost:3000/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newStudent),
            });

            await fetchStudents();

            alert("✅ Student Registered Successfully!");
            navigate("/students");
        } catch (err) {
            setError("❌ Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 flex justify-center items-center p-4">

            <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md">

                {/* 🔙 Back */}
                <button
                    onClick={() => navigate("/students")}
                    className="flex items-center gap-2 text-gray-500 mb-4 hover:text-black"
                >
                    <ArrowLeft size={18} />
                    Back
                </button>

                {/* 🔥 Title */}
                <h1 className="text-2xl font-bold mb-1">
                    🍔 Cafeteria Registration
                </h1>
                <p className="text-gray-500 text-sm mb-4">
                    Add a new student to snack system
                </p>

                {/* ❌ Error */}
                {error && (
                    <p className="text-red-500 text-sm mb-3">{error}</p>
                )}

                {/* 🧾 Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="text-sm font-medium flex items-center gap-2">
                            <User size={16} /> Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter student name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setError("");
                            }}
                            className="border w-full p-2 rounded-xl mt-1 focus:outline-orange-400"
                        />
                    </div>

                    {/* Class */}
                    <div>
                        <label className="text-sm font-medium flex items-center gap-2">
                            <School size={16} /> Class
                        </label>
                        <select
                            value={studentClass}
                            onChange={(e) => setStudentClass(e.target.value)}
                            className="border w-full p-2 rounded-xl mt-1"
                        >
                            <option>6th</option>
                            <option>9th</option>
                            <option>10th</option>
                            <option>12th</option>
                        </select>
                    </div>

                    {/* House */}
                    <div>
                        <label className="text-sm font-medium flex items-center gap-2">
                            <Home size={16} /> House
                        </label>
                        <select
                            value={house}
                            onChange={(e) => setHouse(e.target.value)}
                            className="border w-full p-2 rounded-xl mt-1"
                        >
                            <option>Ganga</option>
                            <option>Yamuna</option>
                            <option>Narmada</option>
                            <option>Brahmaputra</option>
                        </select>
                    </div>

                    {/* Preview Box */}
                    <div className="bg-orange-50 border rounded-xl p-3 text-sm space-y-1">

                        <p className="flex items-center gap-2">
                            <Hash size={14} /> ID:{" "}
                            <span className="font-bold">{generateId()}</span>
                        </p>

                        <p className="flex items-center gap-2">
                            <Sparkles size={14} /> Referral:{" "}
                            <span className="font-bold text-orange-500">
                                {name ? generateReferral(name) : "AUTO"}
                            </span>
                        </p>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl transition shadow"
                    >
                        {loading ? "Registering..." : "Register Student 🚀"}
                    </button>
                </form>
            </div>
        </div>
    );
}