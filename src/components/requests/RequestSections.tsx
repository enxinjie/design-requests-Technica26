import type {
  DesignRequest,
  UserRole,
} from "../../types/request";
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

    const requestsAwaitingAssignment =
      requests.filter(
        (request) =>
          request.assignedDesigners.length === 0
      );

    const assignedRequests =
      requests.filter(
        (request) =>
          request.assignedDesigners.length > 0
      );

    return (
      <div>
        <RequestSection
          title="Requests Awaiting Assignment"
          requests={requestsAwaitingAssignment}
        />

        <RequestSection
          title="Assigned Requests"
          requests={assignedRequests}
        />
      </div>
    );
  }

  if (role === "organizer") {

    return (
      <RequestSection
        title="My Requests"
        requests={requests}
      />
    );
  }

  if (role === "designer") {

    return (
      <RequestSection
        title="Assigned Requests"
        requests={requests}
      />
    );
  }

  return null;
};

export default RequestSections;