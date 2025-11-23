import { set, get } from "idb-keyval"
import type { User } from "../model/types"

export async function saveUsersToDB(users: User[]) {
  return await set("users", users)
}

export async function loadUsersFromDB() {
  return await get("users")
}
