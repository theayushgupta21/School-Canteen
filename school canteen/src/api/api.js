const BASE_URL = "http://localhost:3000";

// 🔥 Common handler
const handleResponse = async (res) => {
    if (!res.ok) {
        throw new Error("Something went wrong ❌");
    }
    return res.json();
};

// ✅ GET SNACKS
export const getSnacks = async () => {
    try {
        const res = await fetch(`${BASE_URL}/snacks`);
        return await handleResponse(res);
    } catch (err) {
        throw new Error("Failed to fetch snacks");
    }
};

// ✅ GET STUDENTS
export const getStudents = async () => {
    try {
        const res = await fetch(`${BASE_URL}/students`);
        // Use your handleResponse function
        return await handleResponse(res);
    } catch (err) {
        // err is usually a TypeError when fetch fails (network/server)
        // We can add a pseudo-status code 0 to indicate network failure
        const networkError = new Error(err.message || "Failed to fetch students");
        networkError.status = 0; // 0 = network/server unreachable
        throw networkError;
    }
};

// ✅ GET STUDENT BY ID
export const getStudentById = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/students/${id}`);
        return await handleResponse(res);
    } catch (err) {
        throw new Error("Failed to fetch student");
    }
};

// ✅ ADD STUDENT
export const addStudent = async (student) => {
    try {
        const res = await fetch(`${BASE_URL}/students`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(student),
        });

        return await handleResponse(res);
    } catch (err) {
        throw new Error("Failed to add student");
    }
};

// ✅ CREATE ORDER
export const createOrderApi = async (order) => {
    try {
        const res = await fetch(`${BASE_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });

        return await handleResponse(res);
    } catch (err) {
        throw new Error("Failed to create order");
    }
};

// ✅ GET ORDERS
export const getOrders = async () => {
    try {
        const res = await fetch(`${BASE_URL}/orders`);
        return await handleResponse(res);
    } catch (err) {
        throw new Error("Failed to fetch orders");
    }
};
export const updateStudent = async (id, updatedData) => {
    try {
        const res = await fetch(`http://localhost:3000/students/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });

        if (!res.ok) throw new Error("Failed to update student");

        return await res.json();
    } catch (err) {
        throw err;
    }
};