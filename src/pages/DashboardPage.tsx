import RequestSections from "../components/requests/RequestSections";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import type { DesignRequest } from "../types/request";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/theme.css";
import "../styles/dashboard.css";

const DashboardPage = () => {
    const { userProfile, loading, logOut } = useAuth();
    const navigate = useNavigate();

  const [requests, setRequests] = useState<DesignRequest[]>([]);
  const [requestsLoading, setRequestsLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "designRequests")
        );

        const fetchedRequests = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as DesignRequest[];

        setRequests(fetchedRequests);
      } catch (error) {
        console.error("Could not load design requests:", error);
      } finally {
        setRequestsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading || requestsLoading) {
    return <p>Loading...</p>;
  }

  if (!userProfile) {
    return <p>Unable to load user profile.</p>;
  }

  const handleLogOut = async () => {
    await logOut();
    navigate("/login");
  };
  
  return (
    <main className="dashboard">

      {/* Dashboard Header */}
      <header className="dashboard-header">

        <div>
          <h1 className="dashboard-title">
            Dashboard
          </h1>

          <p className="dashboard-subtitle">
            Manage your design requests
          </p>
        </div>

        <Link
          to="/requests/new"
          className="add-request-button"
        >
          + New Request
        </Link>
        
        <button
          onClick={handleLogOut}
          className="add-logout-button"
        >
          Log Out
        </button>

      </header>

      {/* Requests */}
      <div className="dashboard-requests">
        <RequestSections
          requests={requests}
          role={userProfile.role}
        />
      </div>

      {/* Analytics + Calendar */}
      <div className="dashboard-widgets">

        <section className="dashboard-widget">

          <h2 className="dashboard-widget-title">
            Activity & Analytics
          </h2>

          <p className="dashboard-widget-text">
            Request activity, comments, and analytics
            will appear here.
          </p>

        </section>

        <section className="dashboard-widget dashboard-calendar">

          <h2 className="dashboard-widget-title">
            Calendar
          </h2>

          <p className="dashboard-widget-text">
            Google Calendar
          </p>

        </section>

      </div>

    </main>
  );
};

export default DashboardPage;