export type ContactStatus = "新規" | "対応中" | "完了";

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
  updatedAt: string;
}
