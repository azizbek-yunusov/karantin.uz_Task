import { create } from "zustand";
import type { User } from "@/shared/types/User";

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;

  addUser: (user: Omit<User, "id">) => void;
  updateUser: (id: number, data: Partial<User>) => void;
  deleteUser: (id: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  isLoading: false,
  error: null,

  addUser: (user) =>
    set((state) => ({
      users: [...state.users, { id: Date.now(), ...user }],
      isLoading: false,
      error: null,
    })),

  updateUser: (id, data) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, ...data } : u)),
      isLoading: false,
      error: null,
    })),

  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
      isLoading: false,
      error: null,
    })),
}));
