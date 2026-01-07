export function TableHeader(props) {
  return (
    <>
      <div className={`grid grid-cols-4 *:text-xl ${props.className}`}>
        {props.children}
      </div>
    </>
  );
}
