import { Request, Response } from "express";

import { User } from "../model/User";
import jwt from 'jsonwebtoken';


class UserController {
    async signUp(req: Request, res: Response) {
        try {
            const user = req.body;

            const { username, email, password, firstName, lastName, dateOfBirth, phoneNumber } = user;

            const isUserNameAllReadyExist = await User.findOne({ where: { username: username } });

            if (isUserNameAllReadyExist) {
                res.status(400).json({
                    status: 400,
                    message: "user name all ready in use",
                });
                return;
            }

            const newUser = await User.create({
                username,
                email,
                password,
                firstName,
                lastName,
                dateOfBirth,
                phoneNumber,
            });

            res.status(200).json({
                status: 201,
                success: true,
                message: " User created Successfully",
                user: newUser,
            });
        } catch (error: any) {
            console.log(error);

            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }

    }

    async login(req: Request, res: Response) {

        try {
            const user = req.body;

            const { username, password } = user;

            const isUserExist = await User.findOne({ where: { username: username } });

            if (!isUserExist) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: "User not found",
                });
                return;
            }

            const isPasswordMatched = await isUserExist?.checkPassword(password);


            if (!isPasswordMatched) {
                res.status(400).json({
                    status: 400,
                    success: false,
                    message: "wrong password " + isPasswordMatched,
                });
                return;
            }

            const token = jwt.sign(
                { _id: isUserExist?.id, email: isUserExist?.email },
                "YOUR_SECRET",
                {
                    expiresIn: "1d",
                }
            );

            res.status(200).json({
                status: 200,
                success: true,
                message: "login success",
                token: token,
            });
        } catch (error: any) {
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }
}

export default new UserController();