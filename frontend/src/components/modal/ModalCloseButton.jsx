export function ModalCloseButton(props) {
  return (
    <>
      <button
        onClick={props.onClick}
        type="button"
        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>
    </>
  );
}
