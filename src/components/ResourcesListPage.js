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
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                            <FontAwesomeIcon icon={faFile} className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-600 text-lg">
                            No {isPatient ? "patient" : "professional"} resources available yet.
                        </p>
                        <p className="text-gray-400 text-sm mt-2">Check back soon for updates.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:gap-6">
                        {resources.map((r) => (
                            <div
                                key={r.id}
                                className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-sky-200 transition-all duration-200 overflow-hidden"
                            >
                                <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-5">
                                    {/* Icon indicator */}
                                    <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                                        r.file ? "bg-emerald-100 text-emerald-600" : "bg-sky-100 text-sky-600"
                                    }`}>
                                        {r.file ? (
                                            <FontAwesomeIcon icon={faFile} className="w-6 h-6" />
                                        ) : (
                                            <FontAwesomeIcon icon={faLink} className="w-6 h-6" />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-sky-700 transition-colors">
                                            {r.title}
                                        </h2>
                                        {r.description && (
                                            <p className="text-gray-600 mt-1 line-clamp-2">{r.description}</p>
                                        )}
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                r.file 
                                                    ? "bg-emerald-50 text-emerald-700" 
                                                    : "bg-sky-50 text-sky-700"
                                            }`}>
                                                {r.file ? "Downloadable File" : "External Link"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="shrink-0 flex flex-wrap items-center gap-3">
                                        {r.file && r.path ? (
                                            <a
                                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 active:bg-emerald-800 transition-colors shadow-sm hover:shadow"
                                                href={`/api/resources?file=${encodeURIComponent(r.path)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <FontAwesomeIcon icon={faDownload} className="w-5 h-5" />
                                                Download
                                            </a>
                                        ) : r.link ? (
                                            <>
                                                <a
                                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 text-white font-medium hover:bg-sky-700 active:bg-sky-800 transition-colors shadow-sm hover:shadow"
                                                    href={r.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-5 h-5" />
                                                    Open Link
                                                </a>
                                                <CopyButton
                                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 active:bg-gray-300 transition-colors"
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
