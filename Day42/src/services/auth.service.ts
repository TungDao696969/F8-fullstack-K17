import { User } from "../types/user.type";

const users: User[] = [];

interface RegisterPayload {
  fullname: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const registerUser = (payload: RegisterPayload) => {
  const { fullname, email, password } = payload;

  const findUser = users.find((user) => user.email === email);

  if (findUser) {
    const error: any = new Error("Email already exists");
    error.status = 409;
    throw error;
  }

  const newUser: User = {
    id: users.length + 1,
    fullname,
    email,
    password,
  };

  users.push(newUser);

  const { password: _, ...userWithoutPassword } = newUser;

  return userWithoutPassword;
};

export const loginUser = (payload: LoginPayload) => {
  const { email, password } = payload;

  const user = users.find((u) => u.email === email);

  if (!user) {
    const error: any = new Error("Email hoặc mật khẩu không đúng");
    error.status = 401;
    throw error;
  }

  if (user.password !== password) {
    const error: any = new Error("Email hoặc mật khẩu không đúng");
    error.status = 401;
    throw error;
  }

  const { password: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
};
