import type { DesignRequest } from "../../types/request";
import RequestCard from "./RequestCard";
import "../../styles/request-section.css";

interface RequestSectionProps {
  title: string;
  requests: DesignRequest[];
}

const RequestSection = ({
  title,
  requests,
}: RequestSectionProps) => {
  return (
    <section className="request-section">

      <h2 className="request-section-title">
        {title}
      </h2>

      {requests.length > 0 ? (
        <div className="request-section-list">
          {requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
            />
          ))}
        </div>
      ) : (
        <p className="request-section-empty">
          No requests in this section.
        </p>
      )}

    </section>
  );
};

export default RequestSection;