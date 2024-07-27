import { Request, Response } from "express";

import { User } from "../model/User";
import jwt from 'jsonwebtoken';
const AUTH_TOKEN_KEY = process.env.AUTH_TOKEN_KEY || 'default_secret';

interface GetUserByOptions {
    id: string;
    matchField: 'id' | 'email' | 'username'; 
  }

class UserController {
    async signUp(req: Request, res: Response) {
        try {
            const user = req.body;

            if (!user.username || typeof user.username !== 'string') {
                return res.status(400).json({ status: 400, message: "Username is required and must be a string." });
            }
            if (!user.email || typeof user.email !== 'string') {
                return res.status(400).json({ status: 400, message: "Email is required and must be a string." });
            }
            if (!user.password || typeof user.password !== 'string') {
                return res.status(400).json({ status: 400, message: "Password is required and must be a string." });
            }
            if (!user.firstName || typeof user.firstName !== 'string') {
                return res.status(400).json({ status: 400, message: "First name is required and must be a string." });
            }
            if (!user.lastName || typeof user.lastName !== 'string') {
                return res.status(400).json({ status: 400, message: "Last name is required and must be a string." });
            }
            if (user.dateOfBirth && isNaN(Date.parse(user.dateOfBirth))) {
                return res.status(400).json({ status: 400, message: "Date of birth must be a valid date." });
            }
            if (user.phoneNumber && typeof user.phoneNumber !== 'string') {
                return res.status(400).json({ status: 400, message: "Phone number must be a string." });
            }

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

            if (!user.username || typeof user.username !== 'string') {
                return res.status(400).json({ status: 400, message: "Username is required and must be a string." });
            }
            if (!user.password || typeof user.password !== 'string') {
                return res.status(400).json({ status: 400, message: "Password is required and must be a string." });
            }
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
                { _id: isUserExist?.id, email: isUserExist?.email , username: isUserExist?.username},
                AUTH_TOKEN_KEY,
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

    async getUserBy(options: GetUserByOptions) {
        const { id, matchField } = options;
        if (!id || typeof id !== 'string') {
            throw new Error('ID is required and must be a string.');
        }
        if (!['id', 'email', 'username'].includes(matchField)) {
            throw new Error('MatchField must be one of "id", "email", or "username".');
        }

        try {
          const user = await User.findOne({
            where: {
              [matchField]: id
            }
          });
    
          if (!user) {
            return null; 
          }
    
          return user;
        } catch (error) {
          console.error('Error retrieving user:', error);
          throw new Error('Error retrieving user');
        }
      }
}

export default new UserController();