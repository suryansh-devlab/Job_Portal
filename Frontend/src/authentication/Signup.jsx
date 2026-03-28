
import React, { useState, useEffect } from "react";
import Navbar from "@/Layout/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import USER_API_END_POINT from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/public/authslice";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
    profilePhoto: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, profilePhoto: file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }

    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-100 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border"
        >
          {/* Title */}
          <h2 className="text-3xl font-semibold text-center text-gray-900">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 text-center mt-2">
            Start solving problems and apply for jobs
          </p>

        

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t"></div>
            <span className="mx-3 text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t"></div>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                placeholder="John Doe"
                className="h-11 rounded-lg"
                required
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="you@example.com"
                className="h-11 rounded-lg"
                required
              />
            </div>
{/* 
            <div>
              <Label>Phone Number</Label>
              <Input
                type="tel"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                placeholder="9876543210"
                className="h-11 rounded-lg"
                required
              />
            </div> */}

            <div>
              <Label>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  placeholder="Enter password"
                  className="h-11 rounded-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-sm text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <Label>Role</Label>
              <select
                name="role"
                value={input.role}
                onChange={changeEventHandler}
                className="w-full h-11 rounded-lg border px-3"
              >
                <option value="student">Student</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>

            <div>
              <Label>Profile Photo</Label>
              <Input type="file" accept="image/*" onChange={fileHandler} />
            </div>

            {loading ? (
              <Button disabled className="w-full h-11">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Create Account
              </Button>
            )}
              {/* Social Login */}
          <div className="mt-6 space-y-3">
            <Button
              type="button"
              className="w-full flex items-center justify-center gap-2 border bg-white text-gray-700 hover:bg-gray-50"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5 h-5"
              />
              Continue with Google
            </Button>

            <Button
              type="button"
              className="w-full flex items-center justify-center gap-2 border bg-white text-gray-700 hover:bg-gray-50"
            >
              <img
                src="https://www.svgrepo.com/show/512317/github-142.svg"
                className="w-5 h-5"
              />
              Continue with GitHub
            </Button>
          </div>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </motion.div>
      </div>
    </>
  );
}

export default Signup;

