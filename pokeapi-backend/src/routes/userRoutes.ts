import { Router } from "express";
import bcrypt from "bcrypt";
import { createUser, findUser } from "../services/userService";
import jwt from "jsonwebtoken";

const userRouter = Router();

userRouter.post("/user/registration", async (req, res) => {
    const { email, password } = req.body;
    const cryptedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(email, cryptedPassword);
    return res.json(user);
});

userRouter.post("/user/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await findUser(email);
    if (user) {
        const passwordIsValid = await bcrypt.compare(password, user.passwordHash);
        if (!passwordIsValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ sub: user.id }, process.env.JWT_ACCESS_SECRET!);
        return res.json({ token });
    }
    else {
        return res.status(401).json({ message: "No user found" });
    }
});

export default userRouter;