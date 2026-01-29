import Link from "next/link";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getBlogById } from "../../../../lib/blogs";

export const dynamic = "force-dynamic";

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
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <article className="max-w-3xl mx-auto px-6 py-20">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition mb-8"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-1 h-5 w-5" />
          Back to Blogs
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
