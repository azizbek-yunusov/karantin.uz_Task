import { loadUsersFromDB, saveUsersToDB, type User } from "@/entities/user";
import { create } from "zustand";

interface UsersState {
  users: User[];
  loading: boolean;

  init: () => Promise<void>;
  addUser: (user: User) => Promise<void>;
  removeUser: (id: number | string) => Promise<void>;
  updateUser: (id: number | string, payload: User) => Promise<void>;
}
export const useUsers = create<UsersState>((set, get) => ({
  users: [],
  loading: true,

  init: async () => {
    const data = await loadUsersFromDB();
    set({ users: data || [], loading: false });
  },

  addUser: async (user: User) => {
    const newUsers = [...get().users, user];
    set({ users: newUsers });
    await saveUsersToDB(newUsers);
  },

  removeUser: async (id: number | string) => {
    const newUsers = get().users.filter((u) => u.id !== id);
    set({ users: newUsers });
    await saveUsersToDB(newUsers);
  },

  updateUser: async (id: number | string, payload: User) => {
    const newUsers = get().users.map((u) =>
      u.id.toString() === id.toString() ? { ...u, ...payload } : u
    );
    set({ users: newUsers });
    await saveUsersToDB(newUsers);
  },
}));
