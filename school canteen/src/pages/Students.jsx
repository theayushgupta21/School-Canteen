import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Students() {
    const { students, fetchStudents } = useStore();
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchStudents();
    }, []);

    // 🔍 Filter logic
    const filteredStudents = students.filter(
        (s) =>
            s.name &&
            s.name.toLowerCase().includes(search.toLowerCase())
    );

    // 🔤 Avatar initials
    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

            {/* 🔥 Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold">
                        Students <span className="text-orange-500">Hub 🎓</span>
                    </h1>
                    <p className="text-gray-500 text-sm">
                        {students.length} students registered
                    </p>
                </div>

                {/* 🔍 Search */}
                <div className="flex items-center bg-white border rounded-full px-3 py-2 shadow-sm w-full md:w-72">
                    <Search size={16} className="text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search students..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="outline-none w-full text-sm"
                    />
                </div>
            </div>

            {/* 🧾 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStudents.map((student, index) => (
                    <div
                        key={student.id}
                        className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5"
                    >

                        {/* Top */}
                        <div className="flex justify-between items-center mb-4">

                            {/* Avatar */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600">
                                    {getInitials(student.name)}
                                </div>

                                <div>
                                    <h2 className="font-semibold">{student.name}</h2>
                                    <p className="text-xs text-gray-500">
                                        {student.referralCode}
                                    </p>
                                </div>
                            </div>

                            {/* Badge */}
                            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                                Active
                            </span>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3 text-center mb-4">
                            <div className="bg-gray-100 rounded-lg p-2">
                                <p className="text-orange-500 font-bold">
                                    ₹{student.totalSpent}
                                </p>
                                <p className="text-xs text-gray-500">Spent</p>
                            </div>

                            <div className="bg-gray-100 rounded-lg p-2">
                                <p className="text-blue-500 font-bold">#{student.id}</p>
                                <p className="text-xs text-gray-500">ID</p>
                            </div>

                            <div className="bg-gray-100 rounded-lg p-2">
                                <p className="text-green-500 font-bold">
                                    {Math.floor(student.totalSpent / 100)}
                                </p>
                                <p className="text-xs text-gray-500">Orders</p>
                            </div>
                        </div>

                        {/* Button */}
                        <button
                            onClick={() => navigate(`/students/${student.id}`)}
                            className="w-full border rounded-lg py-2 hover:bg-gray-100 transition"
                        >
                            View Profile →
                        </button>
                    </div>
                ))}
            </div>

            {/* ❌ No Data */}
            {filteredStudents.length === 0 && (
                <p className="text-center text-gray-400 mt-10">
                    No students found 😔
                </p>
            )}
        </div>
    );
}