export function DeleteButton(props) {
  return (
    <>
      <button className="border bg-red-500" onClick={props.onClick}>
        {props.children}
      </button>
    </>
  );
}
