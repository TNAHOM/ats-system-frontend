import { Label } from "@radix-ui/react-dropdown-menu";
import { Check, Link2, Copy, Share2, Link, ExternalLink } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { JobFormValues } from "@/lib/schema";

type SubmittedProps = {
  submittedData: JobFormValues;
  generatedLink: string;
  handleCreateAnother: () => void;
};

const SubmittedJob = ({
  submittedData,
  generatedLink,
  handleCreateAnother,
}: SubmittedProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(generatedLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Card className="max-w-2xl mx-auto bg-card border-border">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mb-4">
          <Check className="w-8 h-8 text-success" />
        </div>
        <CardTitle className="text-2xl text-foreground">
          Job Posted Successfully!
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Your job posting for{" "}
          <span className="text-foreground font-medium">
            {submittedData.title}
          </span>{" "}
          is now live.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm text-muted-foreground">
            Share Application Link
          </Label>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-muted rounded-lg border border-border">
              <Link2 className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-sm text-foreground truncate">
                {generatedLink}
              </span>
            </div>
            <Button
              onClick={handleCopyLink}
              variant="secondary"
              className="shrink-0"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            className="flex-1 bg-transparent"
            onClick={() =>
              window.open(
                `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  generatedLink
                )}`,
                "_blank"
              )
            }
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share on LinkedIn
          </Button>
          <Button
            variant="outline"
            className="flex-1 bg-transparent"
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  generatedLink
                )}&text=${encodeURIComponent(
                  `We're hiring! ${submittedData.title}`
                )}`,
                "_blank"
              )
            }
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share on X
          </Button>
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            className="flex-1 bg-transparent"
            onClick={handleCreateAnother}
          >
            Create Another Job
          </Button>
          <Button className="flex-1" asChild>
            <Link
              href={generatedLink.replace(window.location.origin, "")}
              target="_blank"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Job Posting
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubmittedJob;
