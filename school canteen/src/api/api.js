const BASE_URL = "http://localhost:3000";

// 🔥 common error handler
const handleResponse = async (res) => {
    if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
    }
    return res.json();
};

// ✅ GET snacks
export const getSnacks = async () => {
    const res = await fetch(`${BASE_URL}/snacks`);
    return handleResponse(res);
};

// ✅ GET students
export const getStudents = async () => {
    const res = await fetch(`${BASE_URL}/students`);
    return handleResponse(res);
};

// ✅ GET student by ID
export const getStudentById = async (id) => {
    if (!id) throw new Error("Student ID is required");

    const res = await fetch(`${BASE_URL}/students/${id}`);
    return handleResponse(res);
};

// ✅ ADD student
export const addStudent = async (student) => {
    // 🔥 validation
    if (!student.name || !student.class) {
        throw new Error("Name and Class are required");
    }

    const res = await fetch(`${BASE_URL}/students`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
    });

    return handleResponse(res);
};

// ✅ CREATE order
export const createOrder = async (order) => {
    // 🔥 validation
    if (!order.studentId || !order.snackId) {
        throw new Error("Student & Snack required");
    }

    if (order.quantity < 1 || order.quantity > 5) {
        throw new Error("Quantity must be between 1-5");
    }

    const res = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    });

    return handleResponse(res);
};