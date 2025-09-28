'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";



export default function Testimonial({ numStars, message, date, name }) {

    function getTime() {
        const postTime = new Date(date)
        const numMonths = Math.floor((postTime.getTime() - Date.now()) * -1 / 2628000000)
        if (numMonths >= 12) {
            const years = Math.floor(numMonths / 12)
            return years == 1 ? "1 year ago" : String(years) + " years ago"
        }
        else {
            return String(numMonths) + " months ago"
        }
    }

    return (
        <section className="w-full flex items-center justify-center px-4">
            <figure className="max-w-3xl w-full rounded-2xl shadow-lg border border-gray-300 p-6 sm:p-8 mb-5 bg-gray-100">
                <div className="flex items-start gap-4">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-200">
                        <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-gray-600">{name[0]}</div>
                    </div>


                    <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                            <figcaption className="text-base font-semibold text-gray-900">
                                {name}
                            </figcaption>
                        </div>


                        <div className="mt-1 flex items-center gap-2">
                            <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                                {Array.from({ length: numStars }).map((_, i) => (
                                    <FontAwesomeIcon
                                        key={i}
                                        icon={faStar}
                                        size="sm"
                                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">{String(getTime())}</span>
                        </div>
                    </div>
                </div>


                <blockquote className="mt-5 text-gray-800 leading-7">
                    {message}
                </blockquote>
            </figure>
        </section>
    )
} 