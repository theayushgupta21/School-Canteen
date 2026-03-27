import { create } from "zustand";

const BASE_URL = "http://localhost:3000";

export const useStore = create((set, get) => ({
    // 🔥 STATE
    snacks: [],
    students: [],
    orders: [],
    selectedSnack: null,

    // ✅ FETCH SNACKS
    fetchSnacks: async () => {
        const res = await fetch(`${BASE_URL}/snacks`);
        const data = await res.json();
        set({ snacks: data });
    },

    // ✅ FETCH STUDENTS
    fetchStudents: async () => {
        const res = await fetch(`${BASE_URL}/students`);
        const data = await res.json();
        set({ students: data });
    },

    // ✅ FETCH ORDERS (🔥 ADD THIS)
    fetchOrders: async () => {
        const res = await fetch(`${BASE_URL}/orders`);
        const data = await res.json();
        set({ orders: data });
    },

    // ✅ SELECT SNACK
    setSelectedSnack: (snack) => set({ selectedSnack: snack }),

    // ✅ CREATE ORDER (🔥 IMPROVED)
    createOrder: async (order) => {
        const res = await fetch(`${BASE_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });

        const newOrder = await res.json();

        // 🔥 UI instant update (no reload)
        set({
            orders: [...get().orders, newOrder],
        });

        // 🔥 OPTIONAL: update totalSpent of student
        const updatedStudents = get().students.map((s) => {
            if (s.id === order.studentId) {
                return {
                    ...s,
                    totalSpent: (s.totalSpent || 0) + order.totalPrice,
                };
            }
            return s;
        });

        set({ students: updatedStudents });
    },
}));