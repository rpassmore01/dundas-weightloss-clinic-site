import '../../../globals.css';
import {cookies} from "next/headers";
import {Roboto} from 'next/font/google';
import AdminSidebar from "../../../components/adminSidebar";

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
})

export default async function AdminLayout({children}) {
  const cookieStore = await cookies();
  const isAuthed = cookieStore.get("auth")?.value === "true";

  return (
    <html lang="en" className={roboto.className}>
    <body className="bg-gray-50">

    { isAuthed ? (
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    ) : (
      <div className="p-8 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>
        <form action="/api/auth" method="POST" className="space-y-4">
          <input
            type="text"
            name="token"
            placeholder="Enter 6-digit code"
            className="w-full p-2 border rounded"
          />

          <input type="hidden" name="returnTo" value="/admin"/>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    )}

    </body>
    </html>
  );
}
