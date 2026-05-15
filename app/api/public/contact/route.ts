export const dynamic = "force-dynamic";

import { type NextRequest } from "next/server";
import { createContactSchema } from "@/lib/validators/contact";
import * as contactService from "@/services/contact.service";
import { handleRouteError } from "@/lib/utils/errors";
import { created } from "@/lib/utils/response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = createContactSchema.parse(body);
    const data = await contactService.createContactMessage(input);
    return created(data, "Message sent successfully.");
  } catch (err) {
    return handleRouteError(err);
  }
}
