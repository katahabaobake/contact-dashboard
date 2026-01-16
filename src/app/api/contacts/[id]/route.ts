import { NextRequest, NextResponse } from "next/server";
import { getContactById, updateContactStatus } from "@/lib/contacts";
import { ContactStatus } from "@/types/contact";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const contact = getContactById(id);

  if (!contact) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }

  return NextResponse.json(contact);
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();
  const { status } = body as { status: ContactStatus };

  if (!status || !["新規", "対応中", "完了"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const updatedContact = updateContactStatus(id, status);

  if (!updatedContact) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }

  return NextResponse.json(updatedContact);
}
