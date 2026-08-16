import type {
  DesignRequest,
  UserRole,
} from "../../types/request";
import RequestSection from "./RequestSection";
import { useAuth } from "../../context/AuthContext";

interface RequestSectionsProps {
  requests: DesignRequest[];
  role: UserRole;
}

const RequestSections = ({
  requests,
  role,
}: RequestSectionsProps) => {
  const { userProfile } = useAuth();

  // CO-DIRECTOR
  if (role === "co-director") {
    const requestsAwaitingAssignment = requests.filter(
      (request) =>
        request.assignedDesigners.length === 0
    );

    const assignedRequests = requests.filter(
      (request) =>
        request.assignedDesigners.length > 0
    );

    return (
      <div className="space-y-8">
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

  // ORGANIZER
  if (role === "organizer") {
   return (
      <RequestSection
        title="My Requests"
        requests={requests}
      />
    );
  }

  // DESIGNER + filtering
  if (role === "designer") {
    const assignedRequests = userProfile
      ? requests.filter((request) =>
          request.assignedDesigners.some(
            (designer) =>
              designer.id === userProfile.id
          )
        )
      : [];

    const otherRequests = userProfile
      ? requests.filter(
          (request) =>
            !request.assignedDesigners.some(
              (designer) =>
                designer.id === userProfile.id
            )
        )
      : [];

    return (
      <div className="space-y-8">
        <RequestSection
          title="My Assigned Requests"
          requests={assignedRequests}
        />

        <RequestSection
          title="Other Requests"
          requests={otherRequests}
        />
      </div>
    );
  }

  return null;
};

export default RequestSections;