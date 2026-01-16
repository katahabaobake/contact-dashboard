"use client";

import { useState } from "react";
import Link from "next/link";
import { Contact, ContactStatus } from "@/types/contact";
import { StatusBadge } from "./StatusBadge";
import { StatusSelector } from "./StatusSelector";

interface ContactDetailProps {
  contact: Contact;
}

export function ContactDetail({ contact: initialContact }: ContactDetailProps) {
  const [contact, setContact] = useState(initialContact);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleStatusChange = async (newStatus: ContactStatus) => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/contacts/${contact.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedContact = await response.json();
        setContact(updatedContact);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
          >
            ← 一覧に戻る
          </Link>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{contact.subject}</h1>
            <p className="mt-1 text-sm text-gray-500">
              受付日: {formatDate(contact.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <StatusSelector
                  currentStatus={contact.status}
                  onStatusChange={handleStatusChange}
                  disabled={isSaving}
                />
                <button
                  onClick={() => setIsEditing(false)}
                  disabled={isSaving}
                  className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  キャンセル
                </button>
              </div>
            ) : (
              <>
                <StatusBadge status={contact.status} />
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  ステータス変更
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-sm font-medium text-gray-500">お名前</h3>
            <p className="mt-1 text-lg text-gray-900">{contact.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">メールアドレス</h3>
            <p className="mt-1 text-lg text-gray-900">
              <a href={`mailto:${contact.email}`} className="text-indigo-600 hover:text-indigo-900">
                {contact.email}
              </a>
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">お問い合わせ内容</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-900 whitespace-pre-wrap">{contact.message}</p>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          最終更新: {formatDate(contact.updatedAt)}
        </div>
      </div>
    </div>
  );
}
