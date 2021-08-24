export default function Text({ obj }) {
  return (
    <>
      <h2>{obj.title}</h2>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: obj.content }}
      ></div>
    </>
  );
}
