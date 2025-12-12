import { ArrowRight, Loader, Lock, Mail, Newspaper } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { useDispatch } from "react-redux"
import { login as LoginAuth } from '@/store/authSlice'
import toast from 'react-hot-toast'
import { BASE_URL } from '@/constant'
import axios from 'axios'

function SignUp(): React.ReactNode {



  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [interestTagsInput, setInterestTagsInput] = useState<string>("");
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();


    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }
    const interest_tags = interestTagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    setLoading(true);
    try {
      const payload = { email, password, interest_tags };


      const res = await axios.post(`${BASE_URL}/api/auth/register`, payload);

      // Expected response:
      // {
      //   message: "User is Successfully Registered",
      //   email: newUser.email,
      //   userId: newUser._id,
      //   userToken: token,
      // }

      const data = res.data;

      // Dispatch LoginAuth with the shape your reducer expects:
      dispatch(
        LoginAuth({
          userData: {
            email: data.email,
            userId: data.userId,
            userToken: data.userToken,
          },
        })
      );

      toast.success(data.message || "Registered successfully");

      navigate("/");

    } catch (err) {
      const message =
        err?.response?.data?.message ?? err?.message ?? "Failed to register";
      toast.error(message);
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

      {/* Signup Card */}
      <Card className="border border-border">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>Join ArticleHub to start reading and sharing quality articles</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">

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
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
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
              {loading ? <Loader className='animate-spin'/> :  (
                <div className='flex items-center gap-4'>
                  Create Account
                  <ArrowRight className="w-4 h-4 " />
                </div>
              )}
            </Button>
          </form>


          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/auth/sign-in" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>

      {/* Footer */}
      <p className="text-center text-xs text-muted-foreground mt-8">
        This Project is Built for Adya AI Project Round{" "}

      </p>
    </div>
  )
}

export default SignUp