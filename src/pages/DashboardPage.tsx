import RequestCard from "../components/requests/RequestCard";
import { mockRequests } from "../data/mockRequests";

const DashboardPage = () => {
  return (
    <main>
      <h1>Dashboard</h1>
      <div>
        {mockRequests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>
    </main>
  );
};

export default DashboardPage;
