import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PostPreview from './_PageSections/PostPreview';
import Link from 'next/link';
import Image from 'next/image';

export default function Blog() {
  const blogDir = 'posts';
  const files = fs.readdirSync(path.join(blogDir));

  const posts = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(blogDir, filename), 'utf-8');
    const { data: frontMatter } = matter(fileContent);

    return {
      meta: frontMatter,
      slug: filename.replace('.mdx', '')
    };
  });

  return (
    <main className="mx-8">
      <h1 className="text-3xl font-extrabold text-center">My Blogging Site</h1>
      <h2 className="text-xl font-bold text-center">
        Tutorials, Guides and Updates for building your SaaS
      </h2>
      <div className="space-y-10 py-6 md:py-10">
        <section>
          <h2 className="text-center md:text-left mb-4 font-heading text-3xl">Featured Posts</h2>
          <div className="grid gap-6 justify-center md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div>
                {post.meta.featured && (
                  <article key={post.meta.id} className="group relative flex flex-col space-y-2">
                    <Image
                      alt={post.meta.title}
                      src={post.meta.image}
                      width={384}
                      height={224}
                      className="rounded-md border bg-muted transition-colors w-96 h-56"
                    />

                    <h2 className="line-clamp-1 font-heading text-2xl">{post.meta.title}</h2>

                    <p className="line-clamp-1 text-muted-foreground">{post.meta.description}</p>

                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">{post.meta.date}</p>
                      <div> .</div>
                      <p className="text-sm text-muted-foreground">{post.meta.reading_time}</p>
                    </div>

                    <Link href={`/blog/${post.slug}`} className="absolute inset-0">
                      <span className="sr-only">View Article</span>
                    </Link>
                  </article>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-center md:text-left mb-4 font-heading text-3xl">Latest Posts</h2>
          <div className="grid gap-6 justify-center md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.meta.id} className="group relative flex flex-col space-y-2">
                <Image
                  alt={post.meta.title}
                  src={post.meta.image}
                  width={384}
                  height={224}
                  className="rounded-md border bg-muted transition-colors w-96 h-56"
                />

                <h2 className="line-clamp-1 font-heading text-2xl">{post.meta.title}</h2>

                <p className="line-clamp-1 text-muted-foreground">{post.meta.description}</p>

                <div className="flex justify-between">
                  <p className="text-sm text-muted-foreground">{post.meta.date}</p>
                  <p className="text-sm text-muted-foreground">{post.meta.reading_time}</p>
                </div>
                <Link href={`/blog/${post.slug}`} className="absolute inset-0">
                  <span className="sr-only">View Article</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
