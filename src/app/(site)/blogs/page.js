import Link from "next/link";
import {headers} from "next/headers";

async function getBlogs() {
  const res = await fetch(`${process.env.BASEURL}/api/blogs`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <main className="bg-white min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-10 text-sky-700">
          Blogs
        </h1>

        <div className="space-y-8">
          {blogs.map(blog => (
            <article
              key={blog.id}
              className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition"
            >
              <h2 className="text-2xl font-semibold mb-2">
                {blog.title}
              </h2>

              <p className="text-sm text-gray-500 mb-4">
                {new Date(blog.date).toLocaleDateString()}
              </p>

              <Link
                href={`/blogs/${blog.id}`}
                className="inline-block text-sky-600 font-medium hover:underline"
              >
                Read more →
              </Link>
            </article>
          ))}

          {blogs.length === 0 && (
            <p className="text-gray-500">No blog posts yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
