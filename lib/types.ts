export type WorkArrangement = "remote" | "onsite" | "hybrid";

export type JobStatus = "active" | "on-hold" | "closed" | "draft";

export type ApplicantStatus =
  | "applied"
  | "shortlisted"
  | "interviewing"
  | "hired"
  | "rejected";

export type SeniorityLevel = "intern" | "junior" | "mid" | "senior";

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  responsibilities: string;
  requirements: string;
  workArrangement: WorkArrangement;
  salaryRange?: string;
  deadline: string;
  location?: string;
  status: JobStatus;
  createdAt: string;
  applicantCount: number;
}

export interface Applicant {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  resumeUrl?: string;
  resumeName?: string;
  coverLetter?: string;
  seniorityLevel?: SeniorityLevel;
  aiScore: number;
  aiScoreTrend: "up" | "down" | "stable";
  status: ApplicantStatus;
  statusUpdate: string;
  appliedAt: string;
  strengths: string[];
  weaknesses: string[];
}

export interface JobApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  seniorityLevel: SeniorityLevel;
  coverLetter: string;
  resume: File | null;
}
