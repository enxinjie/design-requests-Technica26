import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

 
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { logIn } = useAuth();
 
  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Please fill out both fields before logging in.");
      return;
    }
    setError("");

    try {
      await logIn(email, password);
      navigate("/");
    } catch (error: any) {
      alert(error.message);
    }
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#16161d]">
      <div className="flex flex-col justify-center items-center w-xl h-100 px-6 py-12 lg:px-8 max-w-lg border-solid border-5 border-[#B6A1C4] rounded-lg bg-brand-50">
        <h1 className="flex flex-col justify-center items-center top-25 left-98 font-mono font-bold text-3xl bg-gradient-to-r from-pink-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
          GraphixHub 
          </h1>
          
        {error && (
          <p className="text-red-600 text-sm mt-2">{error}</p>
        )}
        <input
          className="px-3 py-2 w-3/4 mt-5 border border-brand-51 rounded text-ink-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="px-3 py-2 w-3/4 my-3 border border-brand-51 rounded text-ink-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-brand-500 hover:bg-[#2A7EC7] text-white font-bold py-2 px-4 rounded-md cursor-pointer"
          onClick={handleAuth}
        >
          Log In
        </button>
        <Link
          to="/signup"
          className="mt-3 text-brand-600 underline cursor-pointer hover:text-brand-700 select-none"
        >
          Need to sign up?
        </Link>
        <Link
          to="/forgot-password"
          className="text-brand-600 underline cursor-pointer hover:text-brand-700"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
}