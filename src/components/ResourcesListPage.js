import CopyButton from "./CopyButton";
import { listResources } from "../lib/resources";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faLink, faDownload, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export default async function ResourcesListPage({
    audience = "patient", // "patient" | "professional"
    title,
    subtitle,
}) {
    let all = [];
    try {
        all = await listResources();
    } catch (e) {
        console.error("Failed to load resources:", e);
        all = [];
    }

    const isPatient = audience === "patient";
    const resources = (Array.isArray(all) ? all : []).filter((r) => r.client === isPatient);

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-6 lg:px-20 py-16">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">{title}</h1>
                    {subtitle && (
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                    )}
                </div>

                {resources.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                            <FontAwesomeIcon icon={faFile} className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-gray-600 text-lg">
                            No {isPatient ? "patient" : "professional"} resources available yet.
                        </p>
                        <p className="text-gray-400 text-sm mt-2">Check back soon for updates.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {resources.map((r) => (
                            <div
                                key={r.id}
                                className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-sky-200 transition-all duration-200 overflow-hidden p-5 md:p-6"
                            >
                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                    {/* Icon - larger, only on desktop */}
                                    <div className={`hidden md:flex shrink-0 w-10 h-10 rounded-lg items-center justify-center ${
                                        r.file ? "bg-emerald-100 text-emerald-600" : "bg-sky-100 text-sky-600"
                                    }`}>
                                        <FontAwesomeIcon
                                            icon={r.file ? faFile : faLink}
                                            className="w-5 h-5"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            {/* Icon - smaller, only on mobile */}
                                            <div className={`md:hidden shrink-0 w-7 h-7 rounded-md flex items-center justify-center ${
                                                r.file ? "bg-emerald-100 text-emerald-600" : "bg-sky-100 text-sky-600"
                                            }`}>
                                                <FontAwesomeIcon
                                                    icon={r.file ? faFile : faLink}
                                                    className="w-3 h-3"
                                                />
                                            </div>
                                            <h2 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-sky-700 transition-colors">
                                                {r.title}
                                            </h2>
                                            <span className={`hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                                r.file 
                                                    ? "bg-emerald-50 text-emerald-700" 
                                                    : "bg-sky-50 text-sky-700"
                                            }`}>
                                                {r.file ? "File" : "Link"}
                                            </span>
                                        </div>
                                        {r.description && (
                                            <p className="text-gray-600 text-sm md:text-base line-clamp-2 mt-1">{r.description}</p>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="shrink-0 flex flex-wrap items-center gap-2">
                                        {r.file && r.path ? (
                                            <a
                                                className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 active:bg-emerald-800 transition-colors"
                                                href={`/api/resources?file=${encodeURIComponent(r.path)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
                                                Download
                                            </a>
                                        ) : r.link ? (
                                            <>
                                                <a
                                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 active:bg-sky-800 transition-colors"
                                                    href={r.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-4 h-4" />
                                                    Open
                                                </a>
                                                <CopyButton
                                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 active:bg-gray-300 transition-colors"
                                                    text={r.link}
                                                    label="Copy"
                                                />
                                            </>
                                        ) : (
                                            <span className="text-sm text-gray-400 italic">No attachment</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Resource count footer */}
                {resources.length > 0 && (
                    <p className="text-center text-gray-400 text-sm mt-8">
                        {resources.length} resource{resources.length !== 1 ? "s" : ""} available
                    </p>
                )}
            </div>
        </main>
    );
}
