import { ContactStatus } from "@/types/contact";

const statusStyles: Record<ContactStatus, string> = {
  新規: "bg-blue-100 text-blue-800",
  対応中: "bg-yellow-100 text-yellow-800",
  完了: "bg-green-100 text-green-800",
};

interface StatusBadgeProps {
  status: ContactStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
