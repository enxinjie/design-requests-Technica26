import { useState } from "react";
import type {
  DesignRequest,
  RequestStatus,
} from "../../types/request";
import "../../styles/request-card.css";

interface RequestCardProps {
  request: DesignRequest;
}

const RequestCard = ({ request }: RequestCardProps) => {
  const statusStars: Record<RequestStatus, number> = {
    new: 1,
    assigned: 1,
    "in-progress": 2,
    submitted: 3,
    approved: 4,
    accepted: 4,
    declined: 0,
  };

  const [expanded, setExpanded] = useState(false);

  const filledStars = statusStars[request.status];

  return (
    <article className="request-card">

      {/* Top Section */}
      <div className="request-card-top">

        <div className="request-card-image">
          Insert Image Here
        </div>

        <div className="request-card-info">

          <h2 className="request-card-title">
            {request.title}
          </h2>

          <div className="request-card-status-row">

            <span className="request-card-label">
              Status
            </span>

            <span className="request-card-status">
              {request.status.replace("-", " ")}
            </span>

          </div>

          <div className="request-card-deadline">

            <span className="request-card-label">
              Final Deadline
            </span>

            <p className="request-card-deadline-date">
              {request.internalFinalDeadline ?? "Not Scheduled"}
            </p>

          </div>

        </div>

        <button
          type="button"
          className="request-card-menu"
          aria-label="Request options"
        >
          ⋮
        </button>

      </div>

      {/* Timeline */}
      <div className="request-card-timeline">

        <div className="request-card-stars">
          {[1, 2, 3, 4].map((star) => (
            <span
              key={star}
              className={
                star <= filledStars
                  ? "request-card-star-filled"
                  : "request-card-star-empty"
              }
            >
              ★
            </span>
          ))}
        </div>

        <div className="request-card-timeline-labels">
          <span>Draft</span>
          <span>Feedback</span>
          <span>Finetune</span>
          <span>Approved</span>
        </div>

      </div>

      {/* Expanded Section */}
      {expanded && (
        <div className="request-card-expanded">

          <div className="request-card-expanded-content">

            <div>
              <h3 className="request-card-expanded-heading">
                Description
              </h3>

              <p>{request.description}</p>
            </div>

            <p>
              <strong>Requester:</strong>{" "}
              {request.requester.fullName}
            </p>

            <p>
              <strong>Assigned Designers:</strong>{" "}
              {request.assignedDesigners.length
                ? request.assignedDesigners
                    .map((designer) => designer.fullName)
                    .join(", ")
                : "Unassigned"}
            </p>

            <p>
              <strong>Requested Completion Date:</strong>{" "}
              {request.requestedCompletionDate}
            </p>

            <p>
              <strong>Check-In Deadline:</strong>{" "}
              {request.checkInDeadline ?? "Not Scheduled"}
            </p>

            <p>
              <strong>Final Deadline:</strong>{" "}
              {request.internalFinalDeadline ?? "Not Scheduled"}
            </p>

            <p>
              <strong>Design Types:</strong>{" "}
              {request.designTypes.join(", ")}
            </p>

            <p>
              <strong>Dimensions:</strong>{" "}
              {request.dimensions}
            </p>

            {request.writtenElements && (
              <p>
                <strong>Written Elements:</strong>{" "}
                {request.writtenElements}
              </p>
            )}

          </div>

        </div>
      )}

      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="request-card-expand-button"
      >
        {expanded ? "Collapse ▲" : "Expand ▼"}
      </button>

    </article>
  );
};

export default RequestCard;