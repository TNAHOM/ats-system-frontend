import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { Applicant } from "@/lib/types";
import { applicationStatusConfig, cn } from "@/lib/utils";

interface ApplicantTableProps {
  applicants: Applicant[];
  selectedId?: string;
  onSelect: (applicant: Applicant) => void;
}

export function ApplicantTable({
  applicants,
  selectedId,
  onSelect,
}: ApplicantTableProps) {
  const getTrendIcon = (trend: Applicant["aiScoreTrend"]) => {
    switch (trend) {
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
    <Table>
      <TableHeader>
        <TableRow className="border-border hover:bg-transparent">
          <TableHead className="text-muted-foreground font-medium">
            NAME
          </TableHead>
          <TableHead className="text-muted-foreground font-medium">
            AI SCORE
          </TableHead>
          <TableHead className="text-muted-foreground font-medium">
            STATUS UPDATE
          </TableHead>
          <TableHead className="text-muted-foreground font-medium">
            PROGRESS
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applicants.map((applicant) => (
          <TableRow
            key={applicant.id}
            className={cn(
              "border-border cursor-pointer transition-colors",
              selectedId === applicant.id
                ? "bg-primary/10"
                : "hover:bg-muted/50"
            )}
            onClick={() => onSelect(applicant)}
          >
            <TableCell>
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
                  <p className="font-medium text-foreground">
                    {applicant.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {applicant.email}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {getTrendIcon(applicant.aiScoreTrend)}
                <span
                  className={cn(
                    "font-semibold",
                    getScoreColor(applicant.aiScore)
                  )}
                >
                  {applicant.aiScore}%
                </span>
              </div>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {applicant.statusUpdate}
            </TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={applicationStatusConfig[applicant.status].className}
              >
                {applicationStatusConfig[applicant.status].label}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
