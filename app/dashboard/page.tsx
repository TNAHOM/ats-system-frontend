import { StatsCard } from "@/components/Cards/Card";
import { PipelineOverview } from "@/components/Dashboard/PipelineOverview";
import { RecentApplicants } from "@/components/Dashboard/RecentApplicants";
import { Briefcase, Users, UserCheck, Calendar } from "lucide-react";
import { mockJobs, mockApplicants } from "@/lib/mock-data";
import { UpcomingInterviews } from "@/components/Dashboard/UpcomingInterviews";

const stats = [
  {
    title: "Active Jobs",
    value: 12,
    icon: Briefcase,
    change: "+2 from last month",
    changeType: "positive" as const,
  },
  {
    title: "Total Applicants",
    value: 842,
    icon: Users,
    change: "+124 from last month",
    changeType: "positive" as const,
  },
  {
    title: "Hired This Month",
    value: 8,
    icon: UserCheck,
    change: "+3 from last month",
    changeType: "positive" as const,
  },
  {
    title: "Interviews Scheduled",
    value: 24,
    icon: Calendar,
    change: "5 this week",
    changeType: "neutral" as const,
  },
];

const pipelineStages = [
  { name: "Applied", count: 342, color: "bg-secondary" },
  { name: "Shortlisted", count: 156, color: "bg-primary" },
  { name: "Interviewing", count: 48, color: "bg-chart-5" },
  { name: "Offered", count: 12, color: "bg-warning" },
  { name: "Hired", count: 8, color: "bg-success" },
];

export default function Dashboard() {
  const cleanedStatCardContents = stats.map(({ title, value, icon }) => {
    let changeType: "positive" | "neutral" | "negative";
    if (value > 0) {
      changeType = "positive";
    } else if (value < 0) {
      changeType = "negative";
    } else {
      changeType = "neutral";
    }
    return {
      title,
      value,
      icon,
      change: `${value > 0 ? `+${value}` : value} Since last month`,
      changeType,
    };
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cleanedStatCardContents.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
            changeType={stat.changeType}
          />
        ))}
      </div>

      {/* Pipeline Overview */}
      <PipelineOverview stages={pipelineStages} />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applicants */}
        <RecentApplicants applicants={mockApplicants} />

        {/* Upcoming Interviews */}
        <UpcomingInterviews />
      </div>
    </div>
  );
}
