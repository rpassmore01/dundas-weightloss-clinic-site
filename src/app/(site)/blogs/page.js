import Link from "next/link";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { listBlogs } from "../../../../lib/blogs";

export default async function BlogsPage() {
  let blogs = [];
  try {
    blogs = await listBlogs(); // already sorted newest-first in the lib
  } catch (e) {
    console.error("Failed to load blogs:", e);
    blogs = [];
  }

  return (
    <main className="bg-white min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-10 text-sky-700">Blogs</h1>

        <div className="space-y-6">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="border border-gray-200 bg-gray-50 rounded-2xl p-6 transition flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                  {blog.title}
                </h2>

                <p className="text-sm text-gray-500 mb-3">
                  {blog.date ? new Date(blog.date).toLocaleDateString() : ""}
                </p>

                <p className="text-gray-600 mb-4 md:mb-0">
                  {blog.description}
                </p>
              </div>

              <Link
                href={`/blogs/${blog.id}`}
                className="inline-block text-sky-600 font-medium hover:underline"
              >
                Read more →
              </Link>
            </article>
          ))}

          {blogs.length === 0 && <p className="text-gray-500">No blog posts yet.</p>}
        </div>
      </section>
    </main>
  );
}
