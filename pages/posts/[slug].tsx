import { useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { format } from 'date-fns';
import Layout from '@/components/Layout';
import ABTest from '@/components/ABTest';
import Callout from '@/components/Callout';
import { getPostBySlug, getPostSlugs, Post } from '@/lib/posts';
import { trackEvent } from '@/lib/tracking';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface PostPageProps {
  post: Post;
  mdxSource: MDXRemoteSerializeResult;
}

// MDX components mapping
const components = {
  ABTest,
  Callout,
  code: ({ className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';

    return language ? (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono" {...props}>
        {children}
      </code>
    );
  },
};

export default function PostPage({ post, mdxSource }: PostPageProps) {
  useEffect(() => {
    trackEvent('page-view', { post: post.slug });
  }, [post.slug]);

  return (
    <Layout>
      <article className="prose prose-lg max-w-none">
        <header className="mb-8 pb-8 border-b border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4 text-gray-600">
            <time dateTime={post.date}>
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </time>
            <span>•</span>
            <span>{post.readingTime}</span>
            {post.author && (
              <>
                <span>•</span>
                <span>By {post.author}</span>
              </>
            )}
          </div>
        </header>

        <div className="prose prose-lg prose-blue max-w-none">
          <MDXRemote {...mdxSource} components={components} />
        </div>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getPostSlugs();
  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const mdxSource = await serialize(post.content);

  return {
    props: {
      post,
      mdxSource,
    },
  };
};

