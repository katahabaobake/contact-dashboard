import { NextResponse } from "next/server";
import { getAllContacts } from "@/lib/contacts";

export async function GET() {
  const contacts = getAllContacts();
  return NextResponse.json(contacts);
}
