export default function Title({ title, added_class }) {
  return (
    <>
      {title && (
        <h2
          className={`widget-title ${added_class}`}
          dangerouslySetInnerHTML={{ __html: title }}
        ></h2>
      )}
    </>
  );
}
