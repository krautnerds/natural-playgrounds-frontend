import Title from "./title";
export default function Text({ title, content, added_class }) {
  return (
    <>
      <Title title={title} />
      <div
        className={`${added_class}`}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </>
  );
}
