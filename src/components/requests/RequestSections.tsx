import type { DesignRequest, UserRole } from "../../types/request";
import RequestSection from "./RequestSection";

interface RequestSectionsProps {
  requests: DesignRequest[];
  role: UserRole;
}

const RequestSections = ({
  requests,
  role,
}: RequestSectionsProps) => {
  if (role === "co-director") {
    const requestsAwaitingAssignment = requests.filter(
      (request) => request.assignedDesigners.length === 0
    );

    const assignedRequests = requests.filter(
      (request) => request.assignedDesigners.length > 0
    );

    return (
      <div className="space-y-10">
        <RequestSection
          title="Requests Awaiting Assignment"
          requests={requestsAwaitingAssignment}
          role={role}
        />

        <RequestSection
          title="Assigned Requests"
          requests={assignedRequests}
          role={role}
        />
      </div>
    );
  }

  if (role === "organizer") {
    const myRequests = requests;

    return (
      <div className="space-y-10">
        <RequestSection
          title="My Requests"
          requests={myRequests}
          role={role}
        />
      </div>
    );
  }

  if (role === "designer") {
    const assignedRequests = requests.filter(
      (request) => request.assignedDesigners.length > 0
    );

    return (
      <div className="space-y-10">
        <RequestSection
          title="Assigned to Me"
          requests={assignedRequests}
          role={role}
        />
      </div>
    );
  }

  return null;
};

export default RequestSections;