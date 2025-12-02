import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import ClientPage from "./[...urlSegments]/client-page";

export const revalidate = 300;
export const dynamic = 'force-dynamic';

export default async function Home() {
  let data;
  try {
    data = await client.queries.page({
      relativePath: `home.mdx`,
    });
  } catch (error) {
    console.warn('Failed to fetch home page data:', error);
    // Fallback empty data structure
    data = {
      data: {
        page: {
          id: 'dummy',
          _sys: { filename: 'home', basename: 'home', breadcrumbs: ['home'], path: 'content/pages/home.mdx', relativePath: 'home.mdx', extension: 'mdx' },
          blocks: []
        }
      },
      query: '',
      variables: { relativePath: 'home.mdx' }
    } as any;
  }

  return (
    <Layout rawPageData={data}>
      <ClientPage {...data} />
    </Layout>
  );
}
