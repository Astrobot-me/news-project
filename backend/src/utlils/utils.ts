import jwt from "jsonwebtoken" 



export function generateJwt(userId: string,type: "ref" | "access" ,expiresIn : string): string {
    const ref_secret = process.env.REFRESH_SECRET as string;
    const acc_secret = process.env.ACCESS_SECRET as string;
    const token = jwt.sign(
        { userId }, 
        type === "access" ? acc_secret : ref_secret , 
        { expiresIn }
    );

    return token;
}