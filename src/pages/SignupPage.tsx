import { useState } from "react";
import type { TechnicaTeam } from "../types/request";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const TEAMS: TechnicaTeam[] = [
  "breach",
  "inclusive-communities",
  "design",
  "events",
  "experience",
  "operations",
  "sponsorship",
  "finance",
  "tech",
];


export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [team, setTeam] = useState<TechnicaTeam>(TEAMS[0]);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { signUp } = useAuth();
 
  const handleAuth = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError("Please fill out all fields before signing up.");
      return;
    }
    setError(""); 

    try {
      await signUp(fullName, email, password, team);
      navigate("/");
    } catch (error: any) {
      alert(error.message);
    }
  };
 
  return (
   <div className="min-h-screen flex items-center justify-center bg-[#16161d]">
      <div className="flex flex-col justify-center items-center w-xl h-100 px-6 py-12 lg:px-8 max-w-lg border-solid border-5 border-[#B6A1C4] rounded-lg bg-brand-50">
        <h1 className="flex flex-col justify-center items-center top-25 left-98 font-mono font-bold text-3xl bg-gradient-to-r from-pink-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent"> 
          Sign Up
          </h1>
          
        {error && (
          <p className="text-red-600 text-sm mt-2">{error}</p>
        )}
         <input
          className="px-3 py-2 w-3/4 mt-5 border border-brand-51 rounded text-ink-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
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
         <select
          className="px-3 py-2 w-3/4 mb-3 border border-brand-51 rounded text-ink-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
          value={team}
          onChange={(e) => setTeam(e.target.value as TechnicaTeam)}
        >
          {TEAMS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <button
          className="bg-brand-500 hover:bg-[#2A7EC7] text-white font-bold py-2 px-4 rounded-md cursor-pointer"
          onClick={handleAuth} 
        >
          Sign Up
        </button>
        <Link
          to="/login"
          className="mt-3 text-brand-600 underline cursor-pointer hover:text-brand-700 select-none"
        >
          Already have an account?
        </Link>
      </div>
    </div>
  );
}