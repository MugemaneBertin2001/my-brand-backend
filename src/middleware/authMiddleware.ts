import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface UserPayload extends JwtPayload {
  userId: string;
  role: string;
}

declare module 'express' {
  interface Request {
    user?: UserPayload;
  }
}

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
 
  let token;
  try{
    token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
  } catch(error){
    return res.status(401).json({ error: `Unauthorized:${error}` });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'my_jwt_secret') as UserPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

const authorize = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.userRole !== role) {
      return res.status(403).json({ error: `Forbidden: You must be a ${role}` });
    }
    next();
  };
};

export { authenticateUser, authorize };
