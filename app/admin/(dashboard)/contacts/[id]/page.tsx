"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, Mail, User, Clock, CheckCircle, Archive } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { apiClient } from "@/lib/api/client";
import { ContactMessage } from "@/types/contact";
import { ContactStatus } from "@/lib/constants/statuses";
import { toast } from "sonner";

export default function ContactDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [contact, setContact] = useState<ContactMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await apiClient.get(`/contacts/${id}`);
        setContact(res.data.data);
      } catch (err) {
        toast.error("Failed to load message");
        router.push("/admin/contacts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContact();
  }, [id, router]);

  const updateStatus = async (status: ContactStatus) => {
    try {
      await apiClient.patch(`/contacts/${id}`, { status });
      toast.success(`Message marked as ${status}`);
      setContact((prev) => (prev ? { ...prev, status } : null));
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading message details...</div>;
  }

  if (!contact) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <Button variant="ghost" onClick={() => router.push("/admin/contacts")} className="mb-6 -ml-4 text-muted-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Messages
      </Button>

      <Card>
        <CardHeader className="border-b bg-muted/20 pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{contact.subject}</CardTitle>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider
                ${contact.status === 'unread' ? 'bg-blue-100 text-blue-800' : ''}
                ${contact.status === 'read' ? 'bg-green-100 text-green-800' : ''}
                ${contact.status === 'replied' ? 'bg-gray-100 text-gray-800' : ''}
              `}>
                {contact.status}
              </span>
            </div>
          </div>
          <CardDescription className="flex flex-col gap-2 pt-4">
            <span className="flex items-center gap-2 text-foreground">
              <User className="h-4 w-4 text-muted-foreground" />
              {contact.name}
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${contact.email}`} className="text-primary hover:underline">{contact.email}</a>
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              {format(new Date(contact.createdAt), "PPpp")}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {contact.message}
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/10 pt-6 flex justify-end gap-3">
          {contact.status !== 'read' && (
            <Button variant="outline" onClick={() => updateStatus("read")} className="gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Mark as Read
            </Button>
          )}
          {contact.status !== 'replied' && (
            <Button variant="outline" onClick={() => updateStatus("replied")} className="gap-2">
              <CheckCircle className="h-4 w-4 text-gray-600" />
              Mark as Replied
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
