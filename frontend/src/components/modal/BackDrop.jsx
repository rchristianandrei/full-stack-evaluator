export function BackDrop(props) {
  return (
    <>
      <div className="absolute inset-0 bg-black/50" onClick={props.onClick} />
    </>
  );
}
