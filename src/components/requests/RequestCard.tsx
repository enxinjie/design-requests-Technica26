import type { DesignRequest } from "../../types/request";
import React, { useState } from "react";

interface RequestCardProps {
  request: DesignRequest;
}

const RequestCard = ({ request }: RequestCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="rounded-3xl bg-[#1C2028] text-white p-6 shadow-lg border border-[#2D3340]">

      {/*Top Section*/}
      <div className="flex gap-6">

        {/* Image Placeholder */}
        <div className="w-48 h-36 bg-white text-black flex items-center justify-center rounded-md font-medium text-center">
          Insert Image Here
        </div>

        {/* Project Info */}
        <div className="flex-1">

          <h2 className="text-2xl font-semibold tracking-wide">
            {request.title}
          </h2>

          <div className="mt-5 flex items-center gap-4">

            <span className="bg-[#303648] px-5 py-2 rounded">
              Status
            </span>

            <span className="rounded-full bg-orange-400 text-black font-semibold px-5 py-2 uppercase text-sm">
              {request.status.replace("-", " ")}
            </span>

          </div>

          <div className="mt-4">
            <span className="bg-[#303648] px-5 py-2 rounded inline-block">
              Final Deadline
            </span>

            <p className="mt-2 text-gray-300">
              {request.internalFinalDeadline ?? "Not Scheduled"}
            </p>
          </div>

        </div>

        {/* Menu */}
        <button className="text-3xl self-start hover:text-gray-300">
          ⋮
        </button>

      </div>

      {/* Timeline*/}

      <div className="mt-8">

        <div className="flex justify-between text-4xl text-yellow-400">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>

        <div className="flex justify-between text-xs uppercase tracking-wider text-gray-300 mt-2">
          <span>Draft</span>
          <span>Feedback</span>
          <span>Finetune</span>
          <span>Approved</span>
        </div>

      </div>

      {/* Expandable Section  */}

      {expanded && (

        <div className="mt-8 border-t border-gray-700 pt-6 space-y-3">

          <div>
            <h3 className="font-semibold uppercase text-sm text-gray-400">
              Description
            </h3>

            <p className="mt-1">
              {request.description}
            </p>
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
            <strong>Check-In Deadline:</strong>{" "}
            {request.checkInDeadline ?? "Not Scheduled"}
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

      )}

      {/*Expand Button*/}

      <div className="mt-6 text-center">

        <button
          onClick={() => setExpanded(!expanded)}
          className="rounded-lg bg-[#303648] px-5 py-2 hover:bg-[#3A4254] transition"
        >
          {expanded ? "Collapse ▲" : "Expand ▼"}
        </button>

      </div>

    </article>
  );
};

export default RequestCard;