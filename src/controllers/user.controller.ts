/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '@models/user.model';

const userController = {
    register: async (req: Request, res: Response) => {
        try {
            const { username, password, role } = req.body as any;

            if (username === "" || password === "")
                throw { status: 400, message: "Empty fields" };

            const existingUser = await User.findOne({ username });

            if (existingUser)
                throw { status: 400, message: "Username already taken" };

            const newUser = new User({
                username,
                password,
                role
            });

            await newUser.save();

            return res.status(201).json({ message: "Done", content: newUser });

        } catch(err: any) {
            return res
                .status(err.status as number ?? 400)
                .json({ message: err.message ?? JSON.stringify(err) });
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body as any;

            const user = await User.findOne({ username });

            if (!user)
                throw { status: 404, message: "Username not found" };

            if (password !== user.password)
                throw { status: 401, message: "Wrong credentials"};

            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY as string);

            return res.status(200).json({ message: "Done", content: token });

        } catch(err: any) {
            return res
                .status(err.status as number ?? 400)
                .json({ message: err.message ?? JSON.stringify(err) });
        }
    },

    whoami: async (req: Request, res: Response) => {
        try {
            const auth = req.headers['authorization'];

            if (!auth)
                throw { status: 403, message: "Empty token" };
            
            const [bearer, token] = auth.split(' ');

            if (bearer !== "Bearer" || token === "")
                throw { status: 401, message: "Invalid token" };

            const payload: JwtPayload =
                jwt.verify(token, process.env.TOKEN_KEY as string) as JwtPayload;

            const user = await User.findOne({ _id: payload._id });

            return res.status(200).json({ message: "Success", content: user });

        } catch(err: any) {
            return res
                .status(err.status as number ?? 400)
                .json({ message: err.message ?? JSON.stringify(err) });
        }
    },

    getAll: async (req: Request, res: Response) => {
        return res.status(200).json(await User.find());
    }
};

export default userController;