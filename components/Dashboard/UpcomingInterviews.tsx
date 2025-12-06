import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, MapPin } from "lucide-react";

interface Interview {
  id: string;
  candidateName: string;
  candidateEmail: string;
  candidateAvatar: string;
  jobTitle: string;
  date: string;
  time: string;
  type: "video" | "onsite";
}

const mockInterviews: Interview[] = [
  {
    id: "1",
    candidateName: "Liam Johnson",
    candidateEmail: "liam.j@example.com",
    candidateAvatar: "/placeholder.svg?height=40&width=40",
    jobTitle: "Senior Frontend Engineer",
    date: "Today",
    time: "2:00 PM",
    type: "video",
  },
  {
    id: "2",
    candidateName: "Emma Watson",
    candidateEmail: "emma.w@example.com",
    candidateAvatar: "/placeholder.svg?height=40&width=40",
    jobTitle: "Senior Frontend Engineer",
    date: "Tomorrow",
    time: "10:30 AM",
    type: "video",
  },
  {
    id: "3",
    candidateName: "Michael Brown",
    candidateEmail: "michael.b@example.com",
    candidateAvatar: "/placeholder.svg?height=40&width=40",
    jobTitle: "Product Designer",
    date: "Dec 5",
    time: "3:00 PM",
    type: "onsite",
  },
];

export function UpcomingInterviews() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">
          Upcoming Interviews
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-primary/80"
        >
          View Calendar
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockInterviews.map((interview) => (
          <div
            key={interview.id}
            className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={interview.candidateAvatar || "/placeholder.svg"}
                />
                <AvatarFallback>
                  {interview.candidateName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">
                  {interview.candidateName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {interview.jobTitle}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center gap-1.5 text-sm text-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {interview.date}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {interview.time}
                </div>
              </div>
              <Badge
                variant="outline"
                className={
                  interview.type === "video"
                    ? "bg-chart-5/10 text-chart-5 border-chart-5/20"
                    : "bg-warning/10 text-warning border-warning/20"
                }
              >
                {interview.type === "video" ? (
                  <>
                    <Video className="h-3 w-3 mr-1" />
                    Video
                  </>
                ) : (
                  <>
                    <MapPin className="h-3 w-3 mr-1" />
                    Onsite
                  </>
                )}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
