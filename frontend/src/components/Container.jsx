export function Container(props) {
  return (
    <>
      <div className={`${props.className} flex flex-col gap-2`}>
        {props.children}
      </div>
    </>
  );
}
