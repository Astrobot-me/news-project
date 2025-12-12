import { ArrowRight, Loader, Lock, Mail, Newspaper } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label"; 
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { login as LoginAuth } from "@/store/authSlice";
import { BASE_URL } from "@/constant";
import axios from "axios";

function SignIn(): React.ReactNode {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

        if (!email || !password) {
            toast.error("Email and password are required");
            return;
        }

        setLoading(true);

        try {
            const payload = { email, password };


            const res = await axios.post(`${BASE_URL}/api/auth/login`, payload);

            const data = res.data;

            localStorage.setItem("userToken", data.userToken);

            dispatch(
                LoginAuth({
                    userData: {
                        email: data.email,
                        userId: data.userId,
                        userToken: data.userToken,
                    },
                })
            );

            toast.success(data.message ?? "Logged in successfully");
            navigate("/");
        } catch (err) {
            console.log(err)
            // const error = err as AxiosError; 
            toast.error("Some Error Occured");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md">
            {/* Logo */}
            <Link to="/" className="flex items-center justify-center gap-2 mb-8">
                <Newspaper className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold">ArticleHub</span>
            </Link>

            {/* Login Card */}
            <Card className="border border-border">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-2xl">Welcome Back</CardTitle>
                    <CardDescription>
                        Sign in to your account to continue reading and exploring articles
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email Address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-medium">
                                    Password
                                </Label>
                                <Link to="#" className="text-xs text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                        >
                            {loading ? <Loader className="animate-spin" /> : (
                                <div className="flex items-center gap-4">
                                    Sign In
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    <p className="text-center text-sm text-muted-foreground mt-6">
                        Don't have an account?{" "}
                        <Link to="/auth/sign-up" className="text-primary font-medium hover:underline">
                            Sign up
                        </Link>
                    </p>
                </CardContent>
            </Card>

            {/* Footer */}
            <p className="text-center text-xs text-muted-foreground mt-8">
                This Project is Made for Adya AI Project Round
            </p>
        </div>
    );
}

export default SignIn;
