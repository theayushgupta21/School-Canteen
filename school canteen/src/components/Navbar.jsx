import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Home, Users, UserPlus } from "lucide-react";

export default function Navbar() {
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const navLink = (path) =>
        `flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition ${location.pathname === path
            ? "bg-orange-100 text-orange-600"
            : "text-gray-600 hover:bg-gray-100"
        }`;

    return (
        <nav className="bg-white/90 backdrop-blur-md shadow-sm px-4 md:px-6 py-3 flex justify-between items-center sticky top-0 z-50">

            {/* 🔥 Logo */}
            <div className="flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <h1 className="text-lg font-bold text-orange-600">
                    SnackSprint
                </h1>
            </div>

            {/* 🔗 Desktop Links */}
            <div className="hidden md:flex gap-3 items-center">
                <Link to="/" className={navLink("/")}>
                    <Home size={16} /> Menu
                </Link>

                <Link to="/students" className={navLink("/students")}>
                    <Users size={16} /> Students
                </Link>

                <Link to="/register" className={navLink("/register")}>
                    <UserPlus size={16} /> Register
                </Link>
            </div>

            {/* 🔥 Desktop CTA */}
            <Link
                to="/register"
                className="hidden md:block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow hover:bg-orange-600 transition"
            >
                + Register Student
            </Link>

            {/* 📱 Mobile Menu Button */}
            <button
                className="md:hidden"
                onClick={() => setOpen(!open)}
            >
                {open ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* 📱 Mobile Dropdown */}
            {open && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-3 py-4 md:hidden">

                    <Link
                        to="/"
                        onClick={() => setOpen(false)}
                        className={navLink("/")}
                    >
                        <Home size={16} /> Menu
                    </Link>

                    <Link
                        to="/students"
                        onClick={() => setOpen(false)}
                        className={navLink("/students")}
                    >
                        <Users size={16} /> Students
                    </Link>

                    <Link
                        to="/register"
                        onClick={() => setOpen(false)}
                        className={navLink("/register")}
                    >
                        <UserPlus size={16} /> Register
                    </Link>

                    <Link
                        to="/register"
                        onClick={() => setOpen(false)}
                        className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow"
                    >
                        <FaRegPlusSquare /> Register Student
                    </Link>
                </div>
            )}
        </nav>
    );
}