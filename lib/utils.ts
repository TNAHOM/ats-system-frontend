import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ApplicantStatus, JobStatus } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const statusConfig: Record<
  JobStatus,
  { label: string; className: string }
> = {
  active: {
    label: "Active",
    className: "bg-success/20 text-success border-success/30",
  },
  "on-hold": {
    label: "On Hold",
    className: "bg-warning/20 text-warning border-warning/30",
  },
  closed: {
    label: "Closed",
    className: "bg-muted text-muted-foreground border-border",
  },
  draft: {
    label: "Draft",
    className: "bg-secondary text-secondary-foreground border-border",
  },
};

export const applicationStatusConfig: Record<
  ApplicantStatus,
  { label: string; className: string }
> = {
  applied: {
    label: "Applied",
    className: "bg-secondary text-secondary-foreground border-border",
  },
  shortlisted: {
    label: "Shortlisted",
    className: "bg-primary/20 text-primary border-primary/30",
  },
  interviewing: {
    label: "Interviewing",
    className: "bg-chart-5/20 text-chart-5 border-chart-5/30",
  },
  hired: {
    label: "Hired",
    className: "bg-success/20 text-success border-success/30",
  },
  rejected: {
    label: "Declined",
    className: "bg-destructive/20 text-destructive border-destructive/30",
  },
};
