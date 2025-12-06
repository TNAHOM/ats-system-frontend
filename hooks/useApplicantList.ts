import { useState, useMemo } from "react";
import type { Applicant, ApplicantStatus } from "@/lib/types";
import { mockApplicants } from "@/lib/mock-data";

export type TabStatus = "all" | ApplicantStatus;

export interface Tab {
  value: TabStatus;
  label: string;
  count: number;
}

export type SortOption = "newest" | "oldest" | "score-high" | "score-low";

export function useApplicantList(jobId: string) {
  const [applicants, setApplicants] = useState<Applicant[]>(
    mockApplicants.filter((a) => a.jobId === jobId)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [activeTab, setActiveTab] = useState<TabStatus>("all");
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    null
  );

  const tabs: Tab[] = useMemo(() => {
    const counts = applicants.reduce((acc, a) => {
      acc[a.status] = (acc[a.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      {
        value: "all",
        label: "All Applicants",
        count: applicants.length,
      },
      {
        value: "applied",
        label: "Applied",
        count: counts.applied || 0,
      },
      {
        value: "shortlisted",
        label: "Shortlisted",
        count: counts.shortlisted || 0,
      },
      {
        value: "interviewing",
        label: "Interviewing",
        count: counts.interviewing || 0,
      },
      {
        value: "rejected",
        label: "Rejected",
        count: counts.rejected || 0,
      },
      { value: "hired", label: "Hired", count: counts.hired || 0 },
    ];
  }, [applicants]);

  const filteredAndSortedApplicants = useMemo(() => {
    let result = [...applicants];

    // Filter by tab
    if (activeTab !== "all") {
      result = result.filter((a) => a.status === activeTab);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(query) ||
          a.email.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.appliedAt).getTime() - new Date(b.appliedAt).getTime()
          );
        case "score-high":
          return b.aiScore - a.aiScore;
        case "score-low":
          return a.aiScore - b.aiScore;
        default:
          return 0;
      }
    });

    return result;
  }, [applicants, activeTab, searchQuery, sortBy]);

  const handleStatusChange = (id: string, newStatus: ApplicantStatus) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    if (selectedApplicant?.id === id) {
      setSelectedApplicant((prev) =>
        prev ? { ...prev, status: newStatus } : null
      );
    }
  };

  return {
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
  };
}
