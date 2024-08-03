import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import userController from '../controller/userController'; 

const AUTH_TOKEN_KEY = process.env.AUTH_TOKEN_KEY || 'default_secret';

const checkAuthToken = async (req: Request, res: Response, next: NextFunction) => {
  const auth_token = req.headers["access-token"] as string;
  try {
    if (!auth_token) {
      throw new Error('Unauthorized');
    }
    const decodedUserInfo = jwt.verify(auth_token, AUTH_TOKEN_KEY) as JwtPayload;
    const user = await userController.getUserBy({ id: decodedUserInfo.username, matchField: 'username' });
    
    if (!user) {
      throw new Error('Unauthorized User');
    }
  
    return next();
  } catch (error) {
    console.error(error); 
    return res.status(403).json({ error: 'Unauthorized' });
  }
};

export default checkAuthToken;
