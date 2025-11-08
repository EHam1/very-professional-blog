import { useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { getAllPosts, PostMetadata } from '@/lib/posts';
import { trackEvent } from '@/lib/tracking';
import { format } from 'date-fns';

interface HomeProps {
  posts: PostMetadata[];
}

export default function Home({ posts }: HomeProps) {
  useEffect(() => {
    trackEvent('page-view');
  }, []);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to My Blog
          </h1>
          <p className="text-xl text-gray-600">
            Exploring code, data science, and vibe coding projects
          </p>
        </div>

        <div className="space-y-6 mt-12">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No posts yet. Check back soon!
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <Link href={`/posts/${post.slug}`}>
                  <h2 className="text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <time dateTime={post.date}>
                    {format(new Date(post.date), 'MMMM d, yyyy')}
                  </time>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                  {post.author && (
                    <>
                      <span>•</span>
                      <span>{post.author}</span>
                    </>
                  )}
                </div>

                {post.excerpt && (
                  <p className="mt-4 text-gray-600 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}

                <Link
                  href={`/posts/${post.slug}`}
                  className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read more →
                </Link>
              </article>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
}

