"use client";

import { useState } from "react";
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { jobFormSchema, JobFormValues } from "@/lib/schema";
import SubmittedJob from "./SubmittedJob";

export function JobForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [submittedData, setSubmittedData] = useState<JobFormValues | null>(
    null
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
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

  const onSubmit = (data: JobFormValues) => {
    setSubmittedData(data);
    // Use ID "1" for demo to link to existing mock data
    const jobId = "1";
    const link = `${window.location.origin}/apply/${jobId}`;
    setGeneratedLink(link);
    setIsSubmitted(true);
  };

  const handleCreateAnother = () => {
    reset();
    setSubmittedData(null);
    setIsSubmitted(false);
    setGeneratedLink("");
  };

  if (isSubmitted && submittedData) {
    return (
      <SubmittedJob
        submittedData={submittedData}
        generatedLink={generatedLink}
        handleCreateAnother={handleCreateAnother}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto space-y-8"
    >
      <Card className="bg-card border-border">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-foreground">Job Details</CardTitle>
          <CardDescription className="text-muted-foreground">
            Fill in the details for your new job opening.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground">
              Job Title
            </Label>
            <Input
              id="title"
              placeholder="e.g., Senior Frontend Developer"
              {...register("title")}
              className="bg-background border-border"
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="workArrangement" className="text-foreground">
                Work Arrangement
              </Label>
              <Controller
                name="workArrangement"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="bg-background border-border">
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
              <Label htmlFor="salary" className="text-foreground">
                Salary Range (Optional)
              </Label>
              <Input
                id="salary"
                placeholder="$120,000 - $150,000"
                {...register("salaryRange")}
                className="bg-background border-border"
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
              <Label htmlFor="location" className="text-foreground">
                Location
              </Label>
              <Input
                id="location"
                placeholder="e.g., San Francisco, CA"
                {...register("location")}
                className="bg-background border-border"
              />
              {errors.location && (
                <p className="text-sm text-destructive">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline" className="text-foreground">
                Application Deadline
              </Label>
              <Input
                id="deadline"
                type="date"
                {...register("deadline")}
                className="bg-background border-border"
              />
              {errors.deadline && (
                <p className="text-sm text-destructive">
                  {errors.deadline.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">
              Job Description
            </Label>
            <Textarea
              id="description"
              placeholder="Describe the role and what makes it exciting..."
              {...register("description")}
              rows={4}
              className="bg-background border-border resize-none"
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsibilities" className="text-foreground">
              Key Responsibilities
            </Label>
            <Textarea
              id="responsibilities"
              placeholder="- Build and maintain user-facing features...&#10;- Collaborate with designers and product managers..."
              {...register("responsibilities")}
              rows={4}
              className="bg-background border-border resize-none"
            />
            {errors.responsibilities && (
              <p className="text-sm text-destructive">
                {errors.responsibilities.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements" className="text-foreground">
              Requirements
            </Label>
            <Textarea
              id="requirements"
              placeholder="- 5+ years of experience with React...&#10;- Strong TypeScript skills..."
              {...register("requirements")}
              rows={4}
              className="bg-background border-border resize-none"
            />
            {errors.requirements && (
              <p className="text-sm text-destructive">
                {errors.requirements.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Save as Draft
        </Button>
        <Button type="submit" className="px-8">
          Publish Job
        </Button>
      </div>
    </form>
  );
}
