export function Modal(props) {
  return (
    <>
      <div className="relative z-10 w-full max-w-md rounded-lg border p-6 shadow-lg bg-black">
        {props.children}
      </div>
    </>
  );
}
