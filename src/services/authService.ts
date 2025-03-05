import prisma from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUser } from "../types/userTypes";

dotenv.config();

const signupUser = async ({
  name,
  email,
  password,
  confirmPassword,
}: IUser) => {
  if (!name || !email || !password || !confirmPassword) {
    throw new Error("All fields are required");
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("Email already in use");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
  const token = jwt.sign(
    { userId: newUser.id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );
  return { message: "Signup successful", token };
};

const loginUser = async ({ email, password }: IUser) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // Find user in the database
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Invalid email");
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );

  return { message: "Login successful", token };
};

export { signupUser, loginUser };
