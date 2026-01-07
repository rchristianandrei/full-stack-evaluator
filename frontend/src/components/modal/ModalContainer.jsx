export function ModalContainer(props) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {props.children}
      </div>
    </>
  );
}
