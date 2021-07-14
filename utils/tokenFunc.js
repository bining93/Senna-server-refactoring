import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const getAccessToken = (data) => {
    return jwt.sign(data, process.env.TOKEN_SECRET, {
        expiresIn: '1h',
    });
}

const getRefreshToken = (data) => {
    return jwt.sign(data, process.env.TOKEN_SECRET, {
        expiresIn: '1d',
    });
}

const checkToken = (token) => {
    try {
        return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch(err) {
        return null
    }
}

export {getAccessToken, getRefreshToken, checkToken}