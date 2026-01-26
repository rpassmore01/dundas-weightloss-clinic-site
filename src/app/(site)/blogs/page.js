import Link from "next/link";
import { listBlogs } from "../../../lib/blogs";

export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  let blogs = [];
  try {
    blogs = await listBlogs(); // already sorted newest-first in the lib
  } catch (e) {
    console.error("Failed to load blogs:", e);
    blogs = [];
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights, tips, and updates on weight management and healthy living.
          </p>
        </div>

        <div className="space-y-4">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="group border border-gray-100 bg-white rounded-2xl shadow-sm hover:shadow-md hover:border-sky-200 transition-all duration-200 p-5 md:p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 group-hover:text-sky-700 transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {blog.date ? new Date(blog.date).toLocaleDateString() : ""}
                  </p>
                  <p className="text-gray-600 line-clamp-2 text-sm md:text-base mt-2">
                    {blog.description}
                  </p>
                </div>

                <div className="shrink-0">
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 active:bg-sky-800 transition-colors"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </article>
          ))}

          {blogs.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
              <p className="text-gray-600 text-lg">No blog posts yet.</p>
              <p className="text-gray-400 text-sm mt-2">Check back soon for updates.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
