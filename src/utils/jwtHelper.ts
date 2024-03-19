import jwt from 'jsonwebtoken';

export const generateJWT = (userId: String, email: String, userRole: String): string => {
    return jwt.sign(
        { 
            userId,
            email,
            userRole
        },
        process.env.JWT_SECRET || 'my_jwt_secret',
        { expiresIn: '1d' }
    );
};
