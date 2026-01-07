export function SubmitButton(props) {
  return (
    <>
      <button
        type="submit"
        className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
      >
        {props.children}
      </button>
    </>
  );
}
