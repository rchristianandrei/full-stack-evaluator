export function Heading(props) {
  return (
    <>
      <div
        className={`flex items-center justify-between w-full max-w-150 mx-auto ${props.className}`}
      >
        {props.children}
      </div>
    </>
  );
}
