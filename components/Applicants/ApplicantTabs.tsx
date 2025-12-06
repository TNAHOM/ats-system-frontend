import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Tab, TabStatus } from "@/hooks/useApplicantList";

interface ApplicantTabsProps {
  tabs: Tab[];
  activeTab: TabStatus;
  onTabChange: (tab: TabStatus) => void;
}

export function ApplicantTabs({
  tabs,
  activeTab,
  onTabChange,
}: ApplicantTabsProps) {
  return (
    <div className="flex items-center gap-1 border-b border-border overflow-x-auto pb-px">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
            activeTab === tab.value
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          {tab.label}
          <Badge
            variant="secondary"
            className={cn(
              "h-5 min-w-5 px-1.5 text-xs",
              activeTab === tab.value && "bg-primary/20 text-primary"
            )}
          >
            {tab.count}
          </Badge>
        </button>
      ))}
    </div>
  );
}
