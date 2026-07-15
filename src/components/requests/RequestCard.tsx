import type { DesignRequest } from "../../types/request";

interface RequestCardProps {
  request: DesignRequest;
}

const RequestCard = ({ request }: RequestCardProps) => {
  return (
    <article className="rounded-2xl border border-dashed border-brand-500 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
        Request card placeholder
      </p>
      <h2 className="mt-2 text-lg font-semibold">{request.title}</h2>
      <p className="mt-1 text-sm text-slate-600">
        Idiakosa will add the full card information and expand/collapse behavior.
      </p>
    </article>
  );
};

export default RequestCard;
