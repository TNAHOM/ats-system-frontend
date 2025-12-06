import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
import Link from "next/link";
import type { Applicant, ApplicantStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const statusConfig: Record<
  ApplicantStatus,
  { label: string; className: string }
> = {
  applied: {
    label: "Applied",
    className: "bg-secondary text-secondary-foreground border-border",
  },
  shortlisted: {
    label: "Shortlisted",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  interviewing: {
    label: "Interviewing",
    className: "bg-chart-5/10 text-chart-5 border-chart-5/20",
  },
  hired: {
    label: "Hired",
    className: "bg-success/10 text-success border-success/20",
  },
  rejected: {
    label: "Declined",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

interface RecentApplicantsProps {
  applicants: Applicant[];
}

export function RecentApplicants({ applicants }: RecentApplicantsProps) {
  const getTrendIcon = (trend: Applicant["aiScoreTrend"]) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-3 h-3 text-success" />;
      case "down":
        return <TrendingDown className="w-3 h-3 text-destructive" />;
      default:
        return <Minus className="w-3 h-3 text-muted-foreground" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">
          Recent Applicants
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-primary/80"
          asChild
        >
          <Link href="/jobs/1/applicants">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {applicants.slice(0, 5).map((applicant) => (
          <div
            key={applicant.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={applicant.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {applicant.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">{applicant.name}</p>
                <p className="text-sm text-muted-foreground">
                  {applicant.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                {getTrendIcon(applicant.aiScoreTrend)}
                <span
                  className={cn(
                    "font-semibold text-sm",
                    getScoreColor(applicant.aiScore)
                  )}
                >
                  {applicant.aiScore}%
                </span>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "text-xs",
                  statusConfig[applicant.status].className
                )}
              >
                {statusConfig[applicant.status].label}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
