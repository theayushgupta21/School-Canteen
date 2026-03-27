import { create } from "zustand";

const BASE_URL = "http://localhost:3000";

export const useStore = create((set) => ({
    // 🔥 state
    snacks: [],
    students: [],
    selectedSnack: null,

    // ✅ fetch snacks
    fetchSnacks: async () => {
        const res = await fetch(`${BASE_URL}/snacks`);
        const data = await res.json();
        set({ snacks: data });
    },

    // ✅ fetch students
    fetchStudents: async () => {
        const res = await fetch(`${BASE_URL}/students`);
        const data = await res.json();
        set({ students: data });
    },

    // ✅ set selected snack
    setSelectedSnack: (snack) => set({ selectedSnack: snack }),

    // ✅ create order
    createOrder: async (order) => {
        await fetch(`${BASE_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });
    },
}));