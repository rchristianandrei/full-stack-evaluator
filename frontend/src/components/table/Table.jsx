export function Table(props) {
  return (
    <>
      <ul className="flex-1 w-full max-w-150 mx-auto flex flex-col gap-2 px-4 border">
        {props.children}
      </ul>
    </>
  );
}
