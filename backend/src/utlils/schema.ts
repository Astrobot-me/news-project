export interface JwtPayload {
    userId: string;
    iat?: number;
    exp?: number;
}

export interface ErrorResponse {
  message: string;
}