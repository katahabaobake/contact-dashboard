import { notFound } from "next/navigation";
import { ContactDetail } from "@/components/ContactDetail";
import { getContactById } from "@/lib/contacts";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ContactPage({ params }: PageProps) {
  const { id } = await params;
  const contact = getContactById(id);

  if (!contact) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <ContactDetail contact={contact} />
      </div>
    </div>
  );
}
