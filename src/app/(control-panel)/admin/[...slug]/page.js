import { notFound } from 'next/navigation';

// Route any other slug to not found
export default function AdminCatchAll() {
  notFound();
}