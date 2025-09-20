import { Router } from "express";
import bcrypt from "bcrypt";
import { createUser, findUser } from "../services/userService";

const userRouter = Router();

userRouter.get("/user/register", async (req, res) => {
    const { email, password } = req.body;
    const cryptedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(email, cryptedPassword);
    return res.json(user);
});

userRouter.post("/user/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await findUser(email);
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    return res.json(user);
});

export default userRouter;