import RequestSections from "../components/requests/RequestSections";
import { mockRequests } from "../data/mockRequests";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

import "../styles/theme.css";
import "../styles/dashboard.css";

const DashboardPage = () => {
    const { userProfile, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userProfile) {
    return <p>Unable to load user profile.</p>;
  }
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

      </header>

      {/* Requests */}
      <div className="dashboard-requests">
        <RequestSections
          requests={mockRequests}
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