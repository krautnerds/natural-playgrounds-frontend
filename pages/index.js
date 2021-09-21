import Head from "next/head";
import Hero from "../components/hero";
import WidgetChooser from "../components/widgetChooser";

export default function Page({ page, results, selected, category }) {
  return (
    <main>
      <Hero title={page.title} sub_title={page.sub_title} />
      <Head>
        <title>Natural Playgrounds</title>
      </Head>
      <div className="flex flex-col space-y-16 relative">
        {page.widgets &&
          page.widgets.map((object, i) => (
            <WidgetChooser
              obj={object}
              key={i}
              category={category}
              results={results}
              selected={selected}
            />
          ))}
      </div>
    </main>
  );
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/pages/homepage/?format=json`
  );
  const results = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/search/home/?format=json`
  );
  const selected = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/search/selected/?format=json`
  );
  const category = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/search/category/?format=json`
  );

  return {
    props: {
      page: await res.json(),
      results: await results.json(),
      selected: await selected.json(),
      category: await category.json(),
    },
  };
}
