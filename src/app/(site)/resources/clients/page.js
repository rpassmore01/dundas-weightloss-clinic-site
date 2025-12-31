export const dynamic = "force-dynamic"; // always fetch latest

async function getResources() {
  const res = await fetch("http://localhost:3000/api/resources", { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function ClientResourcesPage() {
  const all = await getResources();
  const resources = (Array.isArray(all) ? all : []).filter((r) => r.client === true);

  return (
    <main className="container mx-auto px-6 lg:px-20 py-16">
      <h1 className="text-3xl font-bold mb-2">Client Resources</h1>
      <p className="text-gray-600 mb-8">
        Handouts, guides, and links for current clients.
      </p>

      {resources.length === 0 ? (
        <p className="text-gray-700">No client resources available yet.</p>
      ) : (
        <ul className="space-y-4">
          {resources.map((r) => (
            <li key={r.id} className="border rounded-xl p-5 bg-white">
              <h2 className="text-xl font-semibold text-gray-900">{r.title}</h2>
              {r.description ? <p className="text-gray-700 mt-1">{r.description}</p> : null}

              <div className="mt-3">
                {r.file && r.path ? (
                  <a
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition"
                    href={`/api/resources?file=${encodeURIComponent(r.path)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View / Download File
                  </a>
                ) : r.link ? (
                  <a
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition"
                    href={r.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Link
                  </a>
                ) : (
                  <span className="text-sm text-gray-500">No file/link attached</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
