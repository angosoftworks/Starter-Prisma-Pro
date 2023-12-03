import Link from 'next/link';

export default function PostPreview({ meta, slug }) {
  return (
    <div className="py-2">
      <Link href={'/blog/' + slug} passHref key={slug}>
        <div className="py-2 flex justify-between align-middle gap-2">
          <div>
            <h3 className="text-lg font-bold">{meta.title}</h3>
            <p className="text-gray-400">{meta.description}</p>
          </div>
          <div className="my-auto text-gray-400">
            <p>{meta.date}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
