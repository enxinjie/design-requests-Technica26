export type UserRole = "organizer" | "co-director" | "designer";

export type TechnicaTeam =
  | "breach"
  | "inclusive-communities"
  | "events"
  | "experience"
  | "operations"
  | "sponsorship"
  | "finance"
  | "tech";

export type DesignType =
  | "social-media-graphic"
  | "physical-marketing-material"
  | "illustration"
  | "ui-ux"
  | "swag"
  | "animation"
  | "other";

export type DeliveryFileType = "svg" | "pdf" | "png-jpg-mp4" | "other";

export type RequestStatus =
  | "new"
  | "assigned"
  | "in-progress"
  | "submitted"
  | "approved"
  | "accepted"
  | "declined";

export type EmergencyReviewStatus =
  | "not-required"
  | "awaiting-review"
  | "approved"
  | "declined";

export interface PersonSummary {
  id: string;
  fullName: string;
  email: string;
}

// These are the fields an organizer supplies through RequestForm (matching the google form)
export interface CreateDesignRequestInput {
  title: string;
  description: string;
  teams: TechnicaTeam[];
  requestedCompletionDate: string;
  emergencyRequested: boolean;
  designTypes: DesignType[];
  otherDesignType: string | null;
  desiredFileTypes: DeliveryFileType[];
  otherFileType: string | null;
  dimensions: string;
  writtenElements: string | null;
  referenceAssetUrls: string[];
  inspirationLinks: string[];
}

// These fields are added or managed after the request enters the workflow.
// e.g., organizer requestors do not set checkin deadline - co-dirs do
export interface DesignRequest extends CreateDesignRequestInput {
  id: string;
  requester: PersonSummary;
  createdAt: string;
  assignedDesigners: PersonSummary[];
  checkInDeadline: string | null;
  internalFinalDeadline: string | null;
  emergencyReviewStatus: EmergencyReviewStatus;
  status: RequestStatus;
}
