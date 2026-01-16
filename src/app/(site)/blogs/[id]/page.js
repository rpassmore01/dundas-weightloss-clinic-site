import Link from "next/link";
import { getBlogById } from "../../../../../lib/blogs";

export default async function BlogPostPage({ params }) {
  const { id } = await params;

  let blog = null;
  try {
    blog = await getBlogById(id);
  } catch (e) {
    // getBlogById throws on not found (status 404)
    console.error("Failed to load blog:", e);
    blog = null;
  }

  if (!blog) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Blog post not found.</p>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <article className="max-w-3xl mx-auto px-6 py-20">
        <Link
          href="/blogs"
          className="text-sky-600 hover:underline mb-8 inline-block"
        >
          ← Back to blogs
        </Link>

        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

        <p className="text-sm text-gray-500 mb-10">
          {blog.date ? new Date(blog.date).toLocaleDateString() : ""}
        </p>

        <div
          className="prose prose-sky max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.body }}
        />
      </article>
    </main>
  );
}
