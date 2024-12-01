import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.jwt;
    if(!token) return res.status(401).json({message: "Invalid token"});
    jwt.verify(token,process.env.JWT_KEY,async (err,payload) => {
        if(err) return res.status(403).json({message: "Token expired"});
        req.id = payload.id;
        req.email = payload.email;
        next();
    })
}