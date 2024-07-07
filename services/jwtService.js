require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

class JWTService{
    static async generateToken(email, id){
        return jwt.sign({ email, id }, JWT_SECRET, { expiresIn: '1h' });
    }

    static async verifyToken(token){
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            return decoded;
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}

module.exports = JWTService