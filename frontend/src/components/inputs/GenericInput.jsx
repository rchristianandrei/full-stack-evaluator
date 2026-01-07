export function GenericInput(props) {
  return (
    <>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className="w-full rounded border px-3 py-2 focus:border-blue-500 focus:outline-none"
        required={props.required}
      />
    </>
  );
}
