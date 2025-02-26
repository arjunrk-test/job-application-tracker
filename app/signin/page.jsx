"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    
    // Stop submission if errors exist
    if (Object.keys(newErrors).length > 0) return;

    console.log("Sign-in data:", formData);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-[#E0EBFD] text-black">
      {/* Left Side - Image and Branding */}
      <div className="relative hidden md:flex flex-col items-center justify-between bg-blue-400 p-10">
        <div className="absolute top-6 left-6 text-xl font-bold">J A T</div>
      </div>

      {/* Right Side - Sign-in Form */}
      <div className="flex flex-col items-center justify-center px-10">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold">Sign in to your account</h2>
          <p className="mt-2 text-black">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500">
              Sign up
            </a>
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="bg-white border-none"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="password">
                Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="bg-white border-none"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className="flex justify-between items-center">
              <a href="/forgot-password" className="text-blue-500 text-sm">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-800">
              Sign In
            </Button>
          </form>

          <div className="flex items-center my-6">
            <div className="w-full border-t border-gray-600"></div>
            <span className="mx-2 text-sm text-black">Or sign in with</span>
            <div className="w-full border-t border-gray-600"></div>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center space-x-2"
              onClick={() => signIn("google")}
            >
              <FcGoogle className="text-xl" />
              <span>Google</span>
            </Button>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center space-x-2"
              onClick={() => signIn("github")}
            >
              <FaGithub className="text-xl" />
              <span>GitHub</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
