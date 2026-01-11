export function Card({ task, OnDelete, OnMarkAsDone }) {
  return (
    <li className="flex flex-col gap-2 border h-75 rounded">
      <div
        className={`flex items-center justify-between px-4 py-1 ${
          task.isDone ? "bg-green-900" : "bg-red-900"
        }`}
      >
        <p className="overflow-clip text-2xl" title={task.title}>
          {task.title}
        </p>
      </div>
      <p className="flex-1 overflow-hidden px-4">{task.details}</p>
      <div className="flex flex-wrap gap-1 justify-end px-4 pb-4">
        <button
          className="border border-white bg-green-700 disabled:opacity-25 disabled:cursor-help"
          onClick={() => OnMarkAsDone(task.id, task.title)}
          disabled={task.isDone}
        >
          Done
        </button>
        <button
          className="border bg-red-500"
          onClick={() => OnDelete(task.id, task.title)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
