import { updateStudent } from "../api/api";
import { create } from "zustand";
import {
    getSnacks,
    getStudents,
    getOrders,
    createOrderApi,
} from "../api/api";

// 🔥 2. STORE START
export const useStore = create((set, get) => ({

    // ✅ STATE
    snacks: [],
    students: [],
    orders: [],
    selectedSnack: null,
    loading: false,
    error: null,

    // ✅ FETCH SNACKS
    fetchSnacks: async () => {
        set({ loading: true, error: null });

        try {
            const data = await getSnacks(); // 🔥 api call
            set({ snacks: data });
        } catch (err) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    // ✅ FETCH STUDENTS
    fetchStudents: async () => {
        set({ loading: true, error: null });

        try {
            const data = await getStudents();
            set({ students: data });
        } catch (err) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    // ✅ FETCH ORDERS
    fetchOrders: async () => {
        set({ loading: true, error: null });

        try {
            const data = await getOrders();
            set({ orders: data });
        } catch (err) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    // ✅ SELECT SNACK
    setSelectedSnack: (snack) => set({ selectedSnack: snack }),

    // ✅ CREATE ORDER
    createOrder: async (order) => {
        try {
            const newOrder = await createOrderApi(order);

            const { students } = get();

            const student = students.find(
                (s) => Number(s.id) === Number(order.studentId)
            );

            const updatedTotal =
                (student.totalSpent || 0) + order.totalPrice;

            // 🔥 DB UPDATE
            await updateStudent(student.id, {
                totalSpent: updatedTotal,
            });

            // 🔥 LOCAL UPDATE
            const updatedStudents = students.map((s) =>
                Number(s.id) === Number(order.studentId)
                    ? { ...s, totalSpent: updatedTotal }
                    : s
            );

            set({
                orders: [...get().orders, newOrder],
                students: updatedStudents,
            });

        } catch (err) {
            set({ error: err.message });
            throw err;
        }
    },
}));