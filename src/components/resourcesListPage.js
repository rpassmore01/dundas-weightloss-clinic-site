import CopyButton from "./copybutton";
export const dynamic = "force-dynamic"; // always fetch latest
import { headers } from "next/headers";


async function getResources() {
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const baseUrl = `${protocol}://${host}`;
    const res = await fetch(`${baseUrl}/api/resources`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
}

export default async function ResourcesListPage({
    audience = "client", // "client" | "professional"
    title,
    subtitle,
}) {
    const all = await getResources();
    const isClient = audience === "client";

    const resources = (Array.isArray(all) ? all : []).filter((r) => r.client === isClient);

    return (
        <main className="container mx-auto px-6 lg:px-20 py-16">
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            {subtitle ? <p className="text-gray-600 mb-8">{subtitle}</p> : null}

            {resources.length === 0 ? (
                <p className="text-gray-700">
                    No {isClient ? "client" : "professional"} resources available yet.
                </p>
            ) : (
                <ul className="space-y-4">
                    {resources.map((r) => (
                        <li
                            key={r.id}
                            className="border rounded-xl p-5 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                        >
                            {/* Left: text */}
                            <div className="min-w-0">
                                <h2 className="text-xl font-semibold text-gray-900">{r.title}</h2>
                                {r.description ? (
                                    <p className="text-gray-700 mt-1">{r.description}</p>
                                ) : null}
                            </div>

                            {/* Right: actions */}
                            <div className="shrink-0">
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
                                    <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                                        <a
                                            className="inline-flex items-center px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition"
                                            href={r.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Open Link
                                        </a>
                                        <CopyButton
                                            className="inline-flex items-center px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition"
                                            text={r.link}
                                            label="Copy Link"
                                        />
                                    </div>
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
