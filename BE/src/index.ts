import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/UserRoutes'; 
import db from './config/db.config'; 
import BASE_PREFIX from './config/config'; 
import incomeTypeRoutes from './routes/IncomeTypeRoutes';
import expenseTypeRoutes from './routes/ExpenseTypeRoutes';
import savingTypeRoutes from './routes/SavingTypeRoutes';
import incomeRoutes from './routes/IncomeRoutes';
import expenseRoutes from './routes/ExpenseRoutes';
import userController from './controller/userController';
import jwt, { JwtPayload } from 'jsonwebtoken';


const app: Application = express();
const PORT = process.env.PORT || 3000;
const AUTH_TOKEN_KEY = process.env.AUTH_TOKEN_KEY || 'default_secret';

const checkAuthToken = async (req: Request, res: Response, next: NextFunction) => {
  const auth_token = req.headers["access-token"] as string;
  try {
    if (!auth_token) {
      throw new Error('Unauthorized');
    }
    console.log("1")
    const decodedUserInfo = jwt.verify(auth_token, AUTH_TOKEN_KEY) as JwtPayload;
    const user = await userController.getUserBy({ id: decodedUserInfo.username, matchField: 'username' });
    
    if (!user) {
      throw new Error('Unauthorized User');
    }
    console.log("2")

  
    return next();
  } catch (error) {
    console.error(error); 
    return res.status(403).json({ error: 'Unauthorized' });
  }
};
console.log("I DIE")
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use(BASE_PREFIX, userRoutes);
app.use(BASE_PREFIX, checkAuthToken, incomeTypeRoutes);
app.use(BASE_PREFIX, checkAuthToken, expenseTypeRoutes);
app.use(BASE_PREFIX, checkAuthToken, savingTypeRoutes);
app.use(BASE_PREFIX, checkAuthToken, incomeRoutes);
app.use(BASE_PREFIX, checkAuthToken, expenseRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Database connection and server start
db.sync({ force: false })
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default app;
