"use client";

import { ContactStatus } from "@/types/contact";

const statuses: ContactStatus[] = ["新規", "対応中", "完了"];

interface StatusSelectorProps {
  currentStatus: ContactStatus;
  onStatusChange: (status: ContactStatus) => void;
  disabled?: boolean;
}

export function StatusSelector({ currentStatus, onStatusChange, disabled }: StatusSelectorProps) {
  return (
    <select
      value={currentStatus}
      onChange={(e) => onStatusChange(e.target.value as ContactStatus)}
      disabled={disabled}
      className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
    >
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}
