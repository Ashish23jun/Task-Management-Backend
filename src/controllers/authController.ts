import { Request, Response } from "express";
import { loginUser, signupUser } from "../services/authService";

const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await signupUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await loginUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export { signup, login };
