"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const CHARACTER_LIMIT = 200;

export default function Testimonial({ stars, message, date, name, onInteraction }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const shouldTruncate = message.length > CHARACTER_LIMIT;

    function getTimeAgo() {
        const postTime = new Date(date);
        const msPerMonth = 2628000000;
        const numMonths = Math.floor((Date.now() - postTime.getTime()) / msPerMonth);

        if (numMonths >= 12) {
            const years = Math.floor(numMonths / 12);
            return years === 1 ? "1 year ago" : `${years} years ago`;
        }

        return `${numMonths} months ago`;
    }

    const displayMessage = shouldTruncate && !isExpanded
        ? message.slice(0, CHARACTER_LIMIT).trimEnd() + "..."
        : message;

    const handleReadMoreClick = () => {
        setIsExpanded(!isExpanded);
        if (onInteraction) onInteraction();
    };

    return (
        <section className="w-full flex items-center justify-center px-4">
            <figure className="max-w-3xl w-full rounded-2xl shadow-lg border border-gray-300 p-6 sm:p-8 mb-5 bg-gray-100">
                <div className="flex items-start gap-4">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-200">
                        <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-gray-600">
                            {name[0]}
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                            <figcaption className="text-base font-semibold text-gray-900">
                                {name}
                            </figcaption>
                        </div>

                        <div className="mt-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <div className="flex items-center gap-1" aria-label={`${stars} out of 5 stars`}>
                                {Array.from({ length: stars }).map((_, i) => (
                                    <FontAwesomeIcon
                                        key={i}
                                        icon={faStar}
                                        size="sm"
                                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">{getTimeAgo()}</span>
                        </div>
                    </div>
                </div>

                <blockquote className="mt-5 text-gray-800 leading-7">
                    {displayMessage}
                    {shouldTruncate && (
                        <button
                            onClick={handleReadMoreClick}
                            className="ml-1 text-sky-500 hover:text-sky-600 font-medium hover:underline focus:outline-none focus:underline"
                        >
                            {isExpanded ? "Read less" : "Read more"}
                        </button>
                    )}
                </blockquote>
            </figure>
        </section>
    );
}