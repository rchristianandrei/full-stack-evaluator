export function TableEntry(props) {
  return (
    <>
      <li className={`grid ${props.className}`}>{props.children}</li>
    </>
  );
}
