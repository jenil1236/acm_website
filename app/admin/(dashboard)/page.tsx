"use client";

import { useEffect, useState } from "react";
import { 
  FileText, 
  Calendar, 
  Briefcase, 
  Users, 
  MessageSquare,
  Activity
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { PageHeader } from "@/components/admin/shared/page-header";
import { apiClient } from "@/lib/api/client";
import { toast } from "sonner";

interface Metrics {
  blogs: number;
  events: number;
  projects: number;
  team: number;
  contacts: number;
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics>({
    blogs: 0,
    events: 0,
    projects: 0,
    team: 0,
    contacts: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Fetch the first page of each collection with limit=1 just to get the total count
        const [blogsRes, eventsRes, projectsRes, teamRes, contactsRes] = await Promise.all([
          apiClient.get("/blogs?limit=1"),
          apiClient.get("/events?limit=1"),
          apiClient.get("/projects?limit=1"),
          apiClient.get("/team?limit=1"),
          apiClient.get("/contacts?limit=1&status=unread"),
        ]);

        setMetrics({
          blogs: blogsRes.data.data.pagination.total || 0,
          events: eventsRes.data.data.pagination.total || 0,
          projects: projectsRes.data.data.pagination.total || 0,
          team: teamRes.data.data.pagination.total || 0,
          contacts: contactsRes.data.data.pagination.total || 0,
        });
      } catch (err) {
        toast.error("Failed to load dashboard metrics");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const statCards = [
    { title: "Total Blogs", value: metrics.blogs, icon: FileText },
    { title: "Total Events", value: metrics.events, icon: Calendar },
    { title: "Total Projects", value: metrics.projects, icon: Briefcase },
    { title: "Team Members", value: metrics.team, icon: Users },
    { title: "Unread Messages", value: metrics.contacts, icon: MessageSquare, highlight: true },
  ];

  return (
    <div>
      <PageHeader 
        title="Dashboard Overview" 
        description="Welcome back to the ACM Admin Portal." 
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat, index) => (
          <Card key={index} className={stat.highlight && stat.value > 0 ? "border-destructive/50 bg-destructive/5" : ""}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.highlight && stat.value > 0 ? "text-destructive" : "text-muted-foreground"}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? (
                  <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
                ) : (
                  stat.value
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              All backend services are fully operational. Connected to Firebase Firestore.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
