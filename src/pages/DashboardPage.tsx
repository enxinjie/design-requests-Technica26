import RequestSections from "../components/requests/RequestSections";
import { mockRequests } from "../data/mockRequests";
import type { UserRole } from "../types/request";

interface DashboardPageProps {
  role: UserRole;
}

const DashboardPage = ({ role }: DashboardPageProps) => {
  return (
    <main className="space-y-8">
      <h1>Dashboard</h1>

      <RequestSections
        requests={mockRequests}
        role={role}
      />
    </main>
  );
};

export default DashboardPage;