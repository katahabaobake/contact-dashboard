"use client";

import { ContactStatus } from "@/types/contact";

const statuses: (ContactStatus | "すべて")[] = ["すべて", "新規", "対応中", "完了"];

interface StatusFilterProps {
  currentStatus: ContactStatus | "すべて";
  onStatusChange: (status: ContactStatus | "すべて") => void;
}

export function StatusFilter({ currentStatus, onStatusChange }: StatusFilterProps) {
  return (
    <div className="flex gap-2">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onStatusChange(status)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            currentStatus === status
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
}
