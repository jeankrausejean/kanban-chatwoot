export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  assignee?: string;
  labels: string[];
  color?: string;
  // Novos campos de contato
  contactName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
}