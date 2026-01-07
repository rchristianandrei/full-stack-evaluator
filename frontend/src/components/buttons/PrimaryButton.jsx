export function PrimaryButton(props){
    return(<>
    <button
            className="border bg-white text-black"
            onClick={props.onClick}
          >
            {props.children}
          </button>
    </>)
}