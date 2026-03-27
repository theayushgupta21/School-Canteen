import { useState } from "react";
import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Register() {
    const navigate = useNavigate();
    const { students, fetchStudents } = useStore();

    const [name, setName] = useState("");
    const [studentClass, setStudentClass] = useState("10th");
    const [house, setHouse] = useState("Ganga");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // 🔥 Referral Code Generator
    const generateReferral = (name) => {
        const prefix = name.slice(0, 3).toUpperCase();
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

            await fetchStudents(); // 🔥 refresh list

            alert("✅ Student Registered!");
            navigate("/students");
        } catch (err) {
            setError("Something went wrong ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen flex justify-center items-center">

            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">

                {/* 🔙 Back */}
                <button
                    onClick={() => navigate("/students")}
                    className="flex items-center gap-2 text-gray-600 mb-4 hover:text-black"
                >
                    <ArrowLeft size={18} />
                    Back to Students
                </button>

                {/* 🔥 Title */}
                <h1 className="text-2xl font-bold mb-4">
                    Register <span className="text-orange-500">Student 🎓</span>
                </h1>

                {/* ❌ Error */}
                {error && (
                    <p className="text-red-500 text-sm mb-3">{error}</p>
                )}

                {/* 🧾 Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="text-sm font-medium">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter student name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setError("");
                            }}
                            className="border w-full p-2 rounded-lg mt-1 focus:outline-orange-400"
                        />
                    </div>

                    {/* Class */}
                    <div>
                        <label className="text-sm font-medium">Class</label>
                        <select
                            value={studentClass}
                            onChange={(e) => setStudentClass(e.target.value)}
                            className="border w-full p-2 rounded-lg mt-1"
                        >
                            <option>6th</option>
                            <option>9th</option>
                            <option>10th</option>
                            <option>12th</option>
                        </select>
                    </div>

                    {/* House */}
                    <div>
                        <label className="text-sm font-medium">House</label>
                        <select
                            value={house}
                            onChange={(e) => setHouse(e.target.value)}
                            className="border w-full p-2 rounded-lg mt-1"
                        >
                            <option>Ganga</option>
                            <option>Yamuna</option>
                            <option>Narmada</option>
                            <option>Brahmaputra</option>
                        </select>
                    </div>

                    {/* Referral Preview */}
                    <div className="bg-gray-100 p-3 rounded-lg text-sm">
                        Referral Code:{" "}
                        <span className="font-bold text-orange-500">
                            {name ? generateReferral(name) : "AUTO-GENERATED"}
                        </span>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition"
                    >
                        {loading ? "Registering..." : "Register Student"}
                    </button>
                </form>
            </div>
        </div>
    );
}