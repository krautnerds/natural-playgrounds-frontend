import Head from "next/head";
import Hero from "../components/hero";

export default function Page({ page }) {
  return (
    <div>
      <Hero title={page.title} sub_title={page.sub_title} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.API_URL}/api/pages/homepage/?format=json`
  );

  return {
    props: {
      page: await res.json(),
    },
  };
}
