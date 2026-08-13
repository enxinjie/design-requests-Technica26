import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignupPage";
import { useAuth } from "./context/AuthContext";
import "./index.css";
import DashboardPage from "./pages/DashboardPage";
import { Navigate } from "react-router-dom";

function App() {
  // from the AuthContextType object
  const { currentUser } = useAuth();
  // Note we moved the useEffect to AuthContext.tsx

  return (
      <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            currentUser ? <DashboardPage /> : <Navigate to="login" replace />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
