import { useState } from "react";
import API from "../services/api";
import Swal from "sweetalert2";

export default function Register() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const [cursor,setCursor]=useState({x:0,y:0});

  const handleRegister=async()=>{
    try{
      await API.post("/auth/register",{name,email,password});

      // SUCCESS POPUP
      Swal.fire({
        title: "Welcome 🎉",
        text: "Account created successfully!",
        icon: "success",
        confirmButtonColor: "#0ea5e9",
        background: "#ffffff",
        timer: 2000,
        showConfirmButton: false
      });

      setTimeout(()=>{
        window.location.href="/";
      },2000);

    }catch(err){

      // ERROR POPUP
      Swal.fire({
        title: "Registration Failed ❌",
        text: err.response?.data?.message || "Something went wrong",
        icon: "error",
        confirmButtonColor: "#ef4444"
      });

    }
  };

  const handleMouseMove=(e)=>{
    setCursor({x:e.clientX,y:e.clientY});
  };

  return(
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

      {/* Signup Card */}
      <div className="backdrop-blur-lg bg-white/90 shadow-2xl rounded-3xl p-10 w-full max-w-md transition hover:scale-[1.01]">
        
        <h2 className="text-3xl font-bold text-black text-center mb-2 tracking-wide">
          Create Account ✨
        </h2>

        <p className="text-gray-500 text-center mb-8">
          Start your journey with us
        </p>

        <input
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
          placeholder="Full Name"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
          placeholder="Email Address"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          className="w-full mb-6 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
          placeholder="Password"
          type="password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-sky-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-sky-600 hover:scale-[1.02] transition"
        >
          Sign Up
        </button>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?
        </p>

        <button
          onClick={()=>window.location.href="/"}
          className="w-full mt-3 border border-sky-500 text-sky-600 py-2 rounded-xl font-medium hover:bg-sky-50 transition"
        >
          Login
        </button>

      </div>
    </div>
  );
}
