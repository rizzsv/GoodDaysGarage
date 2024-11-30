import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../config/prisma";
import { generateToken } from "../utils/jwt.utils";
import { error } from "console";

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password, email, phoneNumber } = req.body;

    // Periksa apakah username atau email sudah terdaftar
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email },
        ],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        error: "Username or email already registered.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        phoneNumber,
      },
    });

    res.status(201).json({
      message: `User ${user.username} created successfully`,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      error: "An error occurred during registration.",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    // Cari user berdasarkan username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    // Bandingkan password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    // Return response
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error: ", error);
    return res.status(500).json({ error: "An error occurred during login." });
  }
};