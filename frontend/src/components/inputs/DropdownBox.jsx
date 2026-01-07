export function DropdownBox(props) {
  return (
    <>
      <select
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className="w-full rounded border px-3 py-2 focus:border-blue-500 focus:outline-none *:bg-black"
        required={props.required}
      >
        {props.children}
      </select>
    </>
  );
}
