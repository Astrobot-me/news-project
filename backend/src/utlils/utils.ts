import jwt from "jsonwebtoken" 



export function generateJwt(userId: string): string {
    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign(
        { userId }, 
        secret, 
        { expiresIn: "30m" }
    );

    return token;
}