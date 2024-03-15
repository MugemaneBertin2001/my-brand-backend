import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface UserPayload extends JwtPayload {
  userId: string;
  role: string;
}

interface UserPayload extends JwtPayload {
  userId: string;
  role: string;
}

declare module 'express' {
  interface Request  {
    user?: UserPayload;
  }
}
const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;

  if (!token) {
    return res.status(404).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'my_jwt_secret') as { userId: string, role: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

const authorizeAdmin = (req: Request<UserPayload>, res: Response, next: NextFunction) => {
  if (!(req.user && req.user.role !== 'admin')) {
    return res.status(403).json({ error: 'Forbidden: You must be an admin' });
  }
  next();
};

export { authenticateUser, authorizeAdmin };
