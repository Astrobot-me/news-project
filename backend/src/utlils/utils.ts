import jwt from "jsonwebtoken" 



export function generateJwt(userId: string): string {
    const secret = process.env.JWT_SECRET || "default_secret";
    const token = jwt.sign(
        { userId }, 
        secret, 
        { expiresIn: "24h" }
    );

    return token;
}