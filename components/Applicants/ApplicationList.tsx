"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ApplicantDetailPanel } from "./ApplicantDetailPanel";
import { useApplicantList } from "@/hooks/useApplicantList";
import { ApplicantListHeader } from "./ApplicantListHeader";
import { ApplicantTabs } from "./ApplicantTabs";
import { ApplicantFilters } from "./ApplicantFilters";
import { ApplicantTable } from "./ApplicantTable";
import { ApplicantPagination } from "./ApplicantPagination";

interface ApplicantListProps {
  jobId: string;
  jobTitle: string;
}

export function ApplicantList({ jobId, jobTitle }: ApplicantListProps) {
  const router = useRouter();
  const {
    applicants,
    filteredAndSortedApplicants,
    tabs,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    activeTab,
    setActiveTab,
    selectedApplicant,
    setSelectedApplicant,
    handleStatusChange,
  } = useApplicantList(jobId);

  return (
    <>
      <div
        className={cn(
          "space-y-6 transition-all duration-300",
          selectedApplicant && "mr-[450px]"
        )}
      >
        <ApplicantListHeader
          jobTitle={jobTitle}
          onBack={() => router.push("/jobs")}
        />

        <ApplicantTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <ApplicantFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <ApplicantTable
            applicants={filteredAndSortedApplicants}
            selectedId={selectedApplicant?.id}
            onSelect={setSelectedApplicant}
          />
          <ApplicantPagination
            currentCount={filteredAndSortedApplicants.length}
            totalCount={applicants.length}
          />
        </div>
      </div>

      {selectedApplicant && (
        <>
          <div
            className="fixed inset-0 bg-background/80 z-40 sm:hidden"
            onClick={() => setSelectedApplicant(null)}
          />
          <ApplicantDetailPanel
            applicant={selectedApplicant}
            onClose={() => setSelectedApplicant(null)}
            onStatusChange={handleStatusChange}
          />
        </>
      )}
    </>
  );
}
