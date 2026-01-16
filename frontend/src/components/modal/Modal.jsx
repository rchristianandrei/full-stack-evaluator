export function Modal(props) {
  return (
    <>
      <div className="relative w-full max-w-md rounded-lg mx-2 border p-6 shadow-lg bg-black">
        {props.children}
      </div>
    </>
  );
}
