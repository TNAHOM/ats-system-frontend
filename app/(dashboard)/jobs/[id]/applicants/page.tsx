import { ApplicantList } from "@/components/Applicants/ApplicationList";
import { mockJobs } from "@/lib/mock-data";

interface ApplicantsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ApplicantsPage({ params }: ApplicantsPageProps) {
  const { id } = await params;
  const job = mockJobs.find((j) => j.id === id);
  const jobTitle = job?.title || "Job Position";

  return <ApplicantList jobId={id} jobTitle={jobTitle} />;
}
