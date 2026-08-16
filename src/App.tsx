import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignupPage";
import { useAuth } from "./context/AuthContext";
import "./index.css";
import DashboardPage from "./pages/DashboardPage";
import WorkInProgressPage from "./pages/WorkInProgress";
import RequestForm from "./components/requests/RequestForm";
import PageLayout from "./layouts/PageLayout";

function App() {
  // from the AuthContextType object
  const { currentUser } = useAuth();
  // Note we moved the useEffect to AuthContext.tsx

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/requests/new" element={<RequestForm />} />

        <Route element={<PageLayout/>}>
          <Route
            path="/"
            element={
              currentUser ? <DashboardPage /> : <Navigate to="login" replace />
            }
          />
          <Route
            path="/team"
            element={<WorkInProgressPage/>}
          />

          <Route
            path="/assets"
            element={<WorkInProgressPage/>}
          />
          
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
