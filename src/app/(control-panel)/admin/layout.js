import '@fortawesome/fontawesome-svg-core/styles.css';
import '../../../globals.css';
import {Roboto} from 'next/font/google';
import AdminSidebar from "../../../components/AdminSidebar";
import { isAuthenticated } from "../../../lib/auth";
import LoginForm from "../../../components/LoginForm";

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
})

export default async function AdminLayout({children}) {
  const isAuthed = await isAuthenticated();

  return (
    <html lang="en" className={roboto.className}>
      <body className="bg-gray-50">
        {isAuthed ? (
          <div className="flex h-screen overflow-hidden">
            <AdminSidebar />
            <main className="flex-1 p-6 overflow-y-auto">
              {children}
            </main>
          </div>
        ) : (
          <LoginForm />
        )}
      </body>
    </html>
  );
}
