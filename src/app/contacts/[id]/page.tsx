import { notFound } from "next/navigation";
import { ContactDetail } from "@/components/ContactDetail";
import { Contact } from "@/types/contact";
import contactsData from "@/data/contacts.json";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ContactPage({ params }: PageProps) {
  const { id } = await params;
  const contacts: Contact[] = contactsData as Contact[];
  const contact = contacts.find((c) => c.id === id);

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

export async function generateStaticParams() {
  const contacts: Contact[] = contactsData as Contact[];
  return contacts.map((contact) => ({
    id: contact.id,
  }));
}
