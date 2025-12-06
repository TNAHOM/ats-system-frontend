"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  ArrowUpDown,
  Users,
  Plus,
  MoreHorizontal,
  Eye,
  Copy,
  Pencil,
  Trash2,
  Pause,
} from "lucide-react";
import type { Job } from "@/lib/types";
import { mockJobs } from "@/lib/mock-data";
import { statusConfig } from "@/lib/utils";
import { EditJobModal } from "./EditJobModal";
import type { JobFormValues } from "@/lib/schema";

export function JobList() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleSaveJob = (jobId: string, data: JobFormValues) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === jobId ? { ...job, ...data } : job))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex gap-3">
          {/* <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filter
          </Button> */}
          <Button variant="outline" className="gap-2 bg-transparent">
            <ArrowUpDown className="h-4 w-4" />
            Sort
          </Button>
          <Button
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => router.push("/jobs/create")}
          >
            <Plus className="h-4 w-4" />
            Create New Job
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium">
                JOB TITLE
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                DATE CREATED
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                STATUS
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                APPLICANTS
              </TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">
                ACTIONS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow
                key={job.id}
                className="border-border hover:bg-muted/50"
              >
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{job.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {job.company}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(job.createdAt)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={statusConfig[job.status].className}
                  >
                    {job.status === "active" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-success mr-1.5" />
                    )}
                    {job.status === "on-hold" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-warning mr-1.5" />
                    )}
                    {job.status === "closed" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-1.5" />
                    )}
                    {statusConfig[job.status].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {job.applicantCount} Candidates
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary hover:bg-primary/10"
                      onClick={() => router.push(`/jobs/${job.id}/applicants`)}
                    >
                      View
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2 hover:text-primary" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            const url = `${window.location.origin}/apply/${job.id}`;
                            navigator.clipboard.writeText(url);
                            // You might want to add a toast notification here
                            // alert(`Copied to clipboard: ${url}`);
                          }}
                        >
                          <Copy className="h-4 w-4 mr-2 hover:text-primary" />
                          Copy Apply Link
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditingJob(job)}>
                          <Pencil className="h-4 w-4 mr-2 hover:text-primary" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          {/* icon */}
                          <Pause className="h-4 w-4 mr-2 hover:text-primary" />
                          Close Application
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2 hover:text-primary" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between px-4 py-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing 1 to {filteredJobs.length} of {jobs.length} results
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>

      <EditJobModal
        job={editingJob}
        isOpen={!!editingJob}
        onClose={() => setEditingJob(null)}
        onSave={handleSaveJob}
      />
    </div>
  );
}
