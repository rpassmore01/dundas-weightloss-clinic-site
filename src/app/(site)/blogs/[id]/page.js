import Link from "next/link";
import {headers} from "next/headers";

async function getBlog(id) {

  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;
  const res = await fetch(
    `${baseUrl}/api/blogs/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function BlogPostPage({ params }) {
  let slug = await params
  const blog = await getBlog(slug.id);

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

        <h1 className="text-4xl font-bold mb-4">
          {blog.title}
        </h1>

        <p className="text-sm text-gray-500 mb-10">
          {new Date(blog.date).toLocaleDateString()}
        </p>

        <div
          className="prose prose-sky max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.body }}
        />
      </article>
    </main>
  );
}
