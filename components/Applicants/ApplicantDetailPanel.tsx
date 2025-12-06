"use client";

import {
  X,
  ThumbsUp,
  ThumbsDown,
  Download,
  TrendingUp,
  TrendingDown,
  Minus,
  FileText,
  Briefcase,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Applicant } from "@/lib/types";

interface ApplicantDetailPanelProps {
  applicant: Applicant | null;
  onClose: () => void;
  onStatusChange: (id: string, status: Applicant["status"]) => void;
}

const seniorityLabels = {
  intern: "Intern",
  junior: "Junior",
  mid: "Mid-level",
  senior: "Senior",
};

const seniorityColors = {
  intern: "bg-chart-5/10 text-chart-5 border-chart-5/20",
  junior: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  mid: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  senior: "bg-chart-1/10 text-chart-1 border-chart-1/20",
};

export function ApplicantDetailPanel({
  applicant,
  onClose,
  onStatusChange,
}: ApplicantDetailPanelProps) {
  if (!applicant) return null;

  const getTrendIcon = () => {
    switch (applicant.aiScoreTrend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-success" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[400px] lg:w-[450px] bg-card border-l border-border shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between p-6 border-b border-border">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={applicant.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-lg">
              {applicant.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {applicant.name}
            </h2>
            <p className="text-sm text-muted-foreground">{applicant.email}</p>
            {applicant.seniorityLevel && (
              <Badge
                variant="outline"
                className={`mt-1.5 ${
                  seniorityColors[applicant.seniorityLevel]
                }`}
              >
                <Briefcase className="w-3 h-3 mr-1" />
                {seniorityLabels[applicant.seniorityLevel]}
              </Badge>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 p-6 border-b border-border">
        <Button
          className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
          onClick={() => onStatusChange(applicant.id, "shortlisted")}
        >
          <ThumbsUp className="w-4 h-4 mr-2" />
          Shortlist
        </Button>
        <Button
          variant="outline"
          className="flex-1 bg-transparent"
          onClick={() => onStatusChange(applicant.id, "rejected")}
        >
          <ThumbsDown className="w-4 h-4 mr-2" />
          Reject
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* AI Analysis */}
        <Card className="bg-muted/50 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              AI Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Overall AI Score
              </span>
              <div className="flex items-center gap-2">
                {getTrendIcon()}
                <span
                  className={`text-xl font-bold ${getScoreColor(
                    applicant.aiScore
                  )}`}
                >
                  {applicant.aiScore}%
                </span>
              </div>
            </div>

            <Separator className="bg-border" />

            <div>
              <h4 className="text-sm font-medium text-success mb-2">
                Strengths
              </h4>
              <ul className="space-y-1.5">
                {applicant.strengths.map((strength, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-foreground"
                  >
                    <span className="text-success mt-1">•</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-destructive mb-2">
                Weaknesses
              </h4>
              <ul className="space-y-1.5">
                {applicant.weaknesses.map((weakness, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-foreground"
                  >
                    <span className="text-destructive mt-1">•</span>
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Resume */}
        <Card className="bg-muted/50 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Resume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-destructive" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {applicant.resumeName}
                </span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cover Letter */}
        <Card className="bg-muted/50 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Cover Letter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground leading-relaxed">
              {applicant.coverLetter}
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-muted/50 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Email</span>
              <span className="text-sm text-foreground">{applicant.email}</span>
            </div>
            {applicant.phone && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Phone</span>
                <span className="text-sm text-foreground">
                  {applicant.phone}
                </span>
              </div>
            )}
            {applicant.seniorityLevel && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Seniority</span>
                <span className="text-sm text-foreground">
                  {seniorityLabels[applicant.seniorityLevel]}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Applied</span>
              <span className="text-sm text-foreground">
                {new Date(applicant.appliedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
