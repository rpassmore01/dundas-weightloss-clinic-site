import { cookies } from "next/headers";

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const isAuthed = cookieStore.get("auth")?.value === "true";

  if (!isAuthed) {
    return (
      <div className="p-8 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>
        <form action="/api/auth" method="POST" className="space-y-4">
          <input
            type="text"
            name="token"
            placeholder="Enter 6-digit code"
            className="w-full p-2 border rounded"
          />

          <input type="hidden" name="returnTo" value="/admin" />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return <div>{children}</div>;
}
