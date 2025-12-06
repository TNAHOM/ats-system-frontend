import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface ApplicantListHeaderProps {
  jobTitle: string;
  onBack: () => void;
}

export function ApplicantListHeader({
  jobTitle,
  onBack,
}: ApplicantListHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" onClick={onBack}>
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Applicants</h1>
        <p className="text-muted-foreground">{jobTitle}</p>
      </div>
    </div>
  );
}
