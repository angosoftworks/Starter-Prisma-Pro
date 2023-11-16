import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { mdxComponents } from '../_PageSections/MdxComponents';
import { MDXRemote } from 'next-mdx-remote/rsc';

import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
interface UrlParamsI {
  params: { slug: string };
}

interface GetPostI {
  slug: string;
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join('posts'));

  const paths = files.map((filename) => ({
    slug: filename.replace('.mdx', '')
  }));

  return paths;
}

export async function generateMetadata({ params }: UrlParamsI) {
  const blog = getPost(params);

  return {
    title: blog.frontMatter.title,
    description: blog.frontMatter.description
  };
}

function getPost({ slug }: GetPostI) {
  const markdownFile = fs.readFileSync(path.join('posts', slug + '.mdx'), 'utf-8');

  const { data: frontMatter, content } = matter(markdownFile);

  return {
    frontMatter,
    slug,
    content
  };
}

export default function Post({ params }: UrlParamsI) {
  const post = getPost(params);

  return (
    <article>
      <h1>{post.frontMatter.title}</h1>
      <MDXRemote
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
          }
        }}
        components={mdxComponents}
        source={post.content}
      />
    </article>
  );
}
