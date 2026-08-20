export interface AdoptionRequest {
  id: number;
  petTag: string;
  petName: string;
  applicantEmail: string;
  applicantName: string;
  status: string;
  requestedAt: string;
  updatedAt: string;
}