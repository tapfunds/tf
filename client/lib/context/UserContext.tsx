"use client";
import { createContext, useContext } from "react";
import { User } from "../schemas";

const UserContext = createContext<Omit<User, "password"> | null>(null);

export const useUser = () => useContext(UserContext);

export default UserContext;
