import { useRef, useState, useEffect } from "react";
import MenuIcon from "../../assets/menu-vertical.svg?react";

export function Card({ task, OnDelete, OnMarkAsDone }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <li className="flex flex-col gap-2 border h-75 rounded">
      <div
        className={`flex items-center justify-between px-2 py-1 rounded-t ${
          task.isDone ? "bg-green-900" : "bg-red-900"
        }`}
      >
        <p className="overflow-clip text-2xl" title={task.title}>
          {task.title}
        </p>

        <div
          className="relative cursor-pointer"
          ref={dropdownRef}
          onClick={() => setOpen((prev) => !prev)}
        >
          <div>
            <MenuIcon className="w-6 text-white"></MenuIcon>{" "}
          </div>
          {open && (
            <div className="absolute right-0 mt-2 w-25 border rounded bg-[#242424] shadow-lg">
              <ul className="py-1 text-sm flex flex-col gap-2 *:hover:opacity-50">
                <li>
                  <button
                    className="w-full bg-green-700 disabled:opacity-25 disabled:cursor-help"
                    onClick={() => OnMarkAsDone(task.id, task.title)}
                    disabled={task.isDone}
                  >
                    Done
                  </button>
                </li>
                {/* <li>
                  <button
                    className="w-full bg-blue-700 disabled:opacity-25 disabled:cursor-help"
                    onClick={() => OnMarkAsDone(task.id, task.title)}
                  >
                    Edit
                  </button>
                </li> */}
                <li>
                  <button
                    className="w-full bg-red-500"
                    onClick={() => OnDelete(task.id, task.title)}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <p className="flex-1 overflow-hidden px-4">{task.details}</p>
    </li>
  );
}
