import Layout from '@/components/layout/layout';
import client from '@/tina/__generated__/client';
import PostsClientPage from './client-page';

export const revalidate = 3600; // Cache for 1 hour

export default async function PostsPage() {
  let allPosts;

  try {
    let posts = await client.queries.postConnection({
      sort: 'date',
      last: 1
    });
    allPosts = posts;

    if (allPosts.data.postConnection.edges) {
      while (posts.data?.postConnection.pageInfo.hasPreviousPage) {
        posts = await client.queries.postConnection({
          sort: 'date',
          before: posts.data.postConnection.pageInfo.endCursor,
        });

        if (!posts.data.postConnection.edges) {
          break;
        }

        allPosts.data.postConnection.edges.push(...posts.data.postConnection.edges.reverse());
      }
    }
  } catch (error) {
    console.warn('Failed to fetch posts:', error);
    // Fallback empty data structure
    allPosts = {
      data: {
        postConnection: {
          edges: [],
          pageInfo: { hasPreviousPage: false, hasNextPage: false }
        }
      },
      query: '',
      variables: {}
    } as any;
  }

  return (
    <Layout rawPageData={allPosts.data}>
      <PostsClientPage {...allPosts} />
    </Layout>
  );
}
