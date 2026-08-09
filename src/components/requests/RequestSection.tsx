import type { DesignRequest, UserRole } from "../../types/request";
import RequestCard from "./RequestCard";

interface RequestSectionProps {
  title: string;
  requests: DesignRequest[];
  role: UserRole;
}

const RequestSection = ({
  title,
  requests,
}: RequestSectionProps) => {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-white">
        {title}
      </h2>

      {requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400">
          No requests in this section.
        </p>
      )}
    </section>
  );
};

export default RequestSection;