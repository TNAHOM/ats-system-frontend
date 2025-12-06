import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ApplicantPaginationProps {
  currentCount: number;
  totalCount: number;
}

export function ApplicantPagination({
  currentCount,
  totalCount,
}: ApplicantPaginationProps) {
  return (
    <div className="flex items-center justify-between px-4 py-4 border-t border-border">
      <p className="text-sm text-muted-foreground">
        Showing 1 to {currentCount} of {totalCount} applicants
      </p>
      <div className="flex gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-transparent"
          disabled
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          1
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8 bg-transparent">
          2
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8 bg-transparent">
          3
        </Button>
        <span className="flex items-center px-2 text-muted-foreground">
          ...
        </span>
        <Button variant="outline" size="sm" className="h-8 w-8 bg-transparent">
          9
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-transparent"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
