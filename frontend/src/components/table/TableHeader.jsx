export function TableHeader(props) {
  return (
    <>
      <div className={`grid *:text-xl ${props.className}`}>
        {props.children}
      </div>
    </>
  );
}
