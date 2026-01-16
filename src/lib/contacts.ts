import { Contact, ContactStatus } from "@/types/contact";
import initialData from "@/data/contacts.json";

// In-memory store (resets on server restart)
let contacts: Contact[] = [...(initialData as Contact[])];

export function getAllContacts(): Contact[] {
  return contacts;
}

export function getContactById(id: string): Contact | undefined {
  return contacts.find((c) => c.id === id);
}

export function updateContactStatus(id: string, status: ContactStatus): Contact | undefined {
  const index = contacts.findIndex((c) => c.id === id);
  if (index === -1) return undefined;

  contacts[index] = {
    ...contacts[index],
    status,
    updatedAt: new Date().toISOString(),
  };

  return contacts[index];
}
