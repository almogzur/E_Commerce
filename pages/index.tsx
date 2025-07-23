import Head from "next/head";
import NavigationBar from "@/components/navigation";
import MainSection from "@/markup/main_section";
import BestSelling from "@/markup/best_sellers";
import Carousel from "@/components/carousel";
import Footer from "@/components/footer";

import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { StoreItem } from "@/util/zod/types";

export const getStaticProps: GetStaticProps<{ items: StoreItem[] }> = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/all_items`);
  const items: StoreItem[] = await res.json();

  return {
    props: { items },
    revalidate: 300, // 🔁 ISR: rebuild the page every 60 seconds (background)
  };
};

export default function Home({ items }: InferGetStaticPropsType<typeof getStaticProps>) {
  const BestSellingItems = items.slice(0, 5);
  const CarouselItems = [...items];

  return (
    <>
      <Head>
        <title>E Commerce</title>
        <meta name="description" content="E Commerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <NavigationBar />
      <MainSection />
      <BestSelling items={BestSellingItems} />
      <Carousel items={CarouselItems} />
      <Footer />
    </>
  );
}
