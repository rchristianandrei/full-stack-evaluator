export function ModalHeader(props) {
  return (
    <>
      <h2 className={`mb-4 text-xl font-semibold ${props.className}`}>
        {props.children}
      </h2>
    </>
  );
}
