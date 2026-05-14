export const dynamic = "force-dynamic";

import { requireSession } from "@/lib/auth/guards";
import { updateContactStatusSchema } from "@/lib/validators/contact";
import * as contactService from "@/services/contact.service";
import { handleRouteError } from "@/lib/utils/errors";
import { ok } from "@/lib/utils/response";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireSession();
    const { id } = await params;
    return ok(await contactService.getContactMessageById(id));
  } catch (err) {
    return handleRouteError(err);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireSession();
    const { id } = await params;
    const input = updateContactStatusSchema.parse(await request.json());
    return ok(
      await contactService.updateContactStatus(id, input),
      "Contact status updated.",
    );
  } catch (err) {
    return handleRouteError(err);
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireSession();
    const { id } = await params;
    await contactService.deleteContactMessage(id);
    return ok(null, "Contact message deleted.");
  } catch (err) {
    return handleRouteError(err);
  }
}
