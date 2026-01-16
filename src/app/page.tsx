import { ContactList } from "@/components/ContactList";
import { Contact } from "@/types/contact";
import contactsData from "@/data/contacts.json";

export default function Home() {
  const contacts: Contact[] = contactsData as Contact[];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            お問い合わせ管理ダッシュボード
          </h1>
          <p className="mt-2 text-gray-600">
            お問い合わせの一覧と対応状況を管理します
          </p>
        </div>

        <ContactList contacts={contacts} />
      </div>
    </div>
  );
}
