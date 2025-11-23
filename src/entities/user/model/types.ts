export interface User {
  id: number | string;
  firstName: string;
  lastName: string;
  birthDate: Date | string;
  gender: string;
}

export interface AddUser {
  id?: string;
  firstName: string;
  lastName: string;
  birthDate: Date | string;
  gender: string;
}
