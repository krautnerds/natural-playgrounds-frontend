import Head from "next/head";
import Hero from "../components/hero";
import WidgetChooser from "../components/widgetChooser";

export default function Page({ page }) {
  return (
    <main>
      <Hero title={page.title} sub_title={page.sub_title} />
      <div className="flex flex-col space-y-16 relative">
        {page.widgets &&
          page.widgets.map((object, i) => (
            <WidgetChooser obj={object} key={i} />
          ))}
      </div>
    </main>
  );
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/pages/homepage/?format=json`
  );

  return {
    props: {
      page: await res.json(),
    },
  };
}
