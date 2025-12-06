"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { jobFormSchema, JobFormValues } from "@/lib/schema";
import type { Job } from "@/lib/types";

interface EditJobModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (jobId: string, data: JobFormValues) => void;
}

export function EditJobModal({
  job,
  isOpen,
  onClose,
  onSave,
}: EditJobModalProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      description: "",
      responsibilities: "",
      requirements: "",
      workArrangement: "remote",
      salaryRange: "",
      deadline: "",
      location: "",
    },
  });

  useEffect(() => {
    if (job) {
      reset({
        title: job.title,
        description: job.description,
        responsibilities: job.responsibilities,
        requirements: job.requirements,
        workArrangement: job.workArrangement,
        salaryRange: job.salaryRange || "",
        deadline: job.deadline,
        location: job.location || "",
      });
    }
  }, [job, reset]);

  const onSubmit = (data: JobFormValues) => {
    if (job) {
      onSave(job.id, data);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Job Posting</DialogTitle>
          <DialogDescription>
            Make changes to the job details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Job Title</Label>
            <Input
              id="edit-title"
              placeholder="e.g., Senior Frontend Developer"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="edit-workArrangement">Work Arrangement</Label>
              <Controller
                name="workArrangement"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select arrangement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.workArrangement && (
                <p className="text-sm text-destructive">
                  {errors.workArrangement.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-salary">Salary Range (Optional)</Label>
              <Input
                id="edit-salary"
                placeholder="$120,000 - $150,000"
                {...register("salaryRange")}
              />
              {errors.salaryRange && (
                <p className="text-sm text-destructive">
                  {errors.salaryRange.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                placeholder="e.g., San Francisco, CA"
                {...register("location")}
              />
              {errors.location && (
                <p className="text-sm text-destructive">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-deadline">Application Deadline</Label>
              <Input id="edit-deadline" type="date" {...register("deadline")} />
              {errors.deadline && (
                <p className="text-sm text-destructive">
                  {errors.deadline.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Job Description</Label>
            <Textarea
              id="edit-description"
              placeholder="Describe the role..."
              {...register("description")}
              rows={4}
              className="resize-none"
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-responsibilities">Key Responsibilities</Label>
            <Textarea
              id="edit-responsibilities"
              placeholder="- Build and maintain..."
              {...register("responsibilities")}
              rows={4}
              className="resize-none"
            />
            {errors.responsibilities && (
              <p className="text-sm text-destructive">
                {errors.responsibilities.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-requirements">Requirements</Label>
            <Textarea
              id="edit-requirements"
              placeholder="- 5+ years of experience..."
              {...register("requirements")}
              rows={4}
              className="resize-none"
            />
            {errors.requirements && (
              <p className="text-sm text-destructive">
                {errors.requirements.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
