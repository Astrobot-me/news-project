import jwt, { type SignOptions } from "jsonwebtoken" 

interface JwtPayload { 
    userId: string
}


export function generateJwt(userId: string,type: "ref" | "access" ,expiresIn : SignOptions['expiresIn']): string {
    const ref_secret = process.env.REFRESH_SECRET as string; 
    const acc_secret = process.env.ACCESS_SECRET as string;

    // @ts-ignore 
    const token = jwt.sign(
        { userId } as JwtPayload, 
        type === "access" ? acc_secret : ref_secret, 
        { expiresIn }
    );

    return token;
}