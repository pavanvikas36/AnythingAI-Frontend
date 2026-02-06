import { useState } from "react";
import API from "../services/api";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const handleLogin = async () => {

    // validation popup
    if (!email || !password) {
      return Swal.fire({
        title: "Missing Fields",
        text: "Please enter email & password",
        icon: "warning",
        confirmButtonColor: "#0ea5e9"
      });
    }

    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);

      // success popup
      Swal.fire({
        title: "Login Successful 🎉",
        text: "Welcome back!",
        icon: "success",
        confirmButtonColor: "#0ea5e9",
        timer: 2000,
        showConfirmButton: false
      });

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);

    } catch (err) {

      // error popup
      Swal.fire({
        title: "Login Failed ❌",
        text: err.response?.data?.message || "Invalid credentials",
        icon: "error",
        confirmButtonColor: "#ef4444"
      });

    }
  };

  const handleMouseMove = (e) => {
    setCursor({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 flex items-center justify-center px-4 overflow-hidden"
    >
      {/* Cursor glow */}
      <div
        className="pointer-events-none fixed w-40 h-40 rounded-full bg-white/30 blur-3xl transition duration-75"
        style={{
          left: cursor.x - 80,
          top: cursor.y - 80
        }}
      ></div>

      {/* Login Card */}
      <div className="backdrop-blur-lg bg-white/90 shadow-2xl rounded-3xl p-10 w-full max-w-md transition hover:scale-[1.01]">
        
        <h2 className="text-3xl font-bold text-black text-center mb-2 tracking-wide">
          Welcome Back
        </h2>

        <p className="text-gray-500 text-center mb-8">
          Login to continue your dashboard
        </p>

        <input
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-6 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-sky-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-sky-600 hover:scale-[1.02] transition"
        >
          Login
        </button>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?
        </p>

        <button
          onClick={() => (window.location.href = "/register")}
          className="w-full mt-3 border border-sky-500 text-sky-600 py-2 rounded-xl font-medium hover:bg-sky-50 transition"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
