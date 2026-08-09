import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import type { UserData } from "../types/types";
import { Link, useNavigate } from "react-router";
 
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
 
  const handleAuth = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const defaultData: UserData = {
        email: email,
        notes: "Use the textbox above to change me!",
      };
      await setDoc(doc(db, "users", userCred.user.uid), defaultData);
      navigate("/");
    } catch (error: any) {
      alert(error.message);
    }
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-50">
      <div className="flex flex-col justify-center items-center w-xl h-100 px-6 py-12 lg:px-8 max-w-lg border-solid border-2 border-brand-100 rounded-lg bg-white">
        <h1 className="text-ink-900">Sign Up</h1>
        <input
          className="px-3 py-2 w-3/4 mt-5 border border-brand-100 rounded text-ink-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="px-3 py-2 w-3/4 my-3 border border-brand-100 rounded text-ink-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-2 px-4 rounded-md cursor-pointer"
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