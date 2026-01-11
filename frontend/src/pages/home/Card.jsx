import { DeleteButton } from "../../components/buttons/DeleteButton";

export function Card({ task, OnDelete, OnMarkAsDone }) {
  return (
    <li className="flex flex-col gap-2 border p-4 h-75 rounded">
      <div className="flex items-center justify-between">
        <p className="overflow-clip text-2xl" title={task.title}>
          {task.title}
        </p>
        <div className="text-center">{task.isDone ? "✅" : "❌"}</div>
      </div>
      <p className="flex-1 overflow-hidden">
        Details...Details...Details...Details...Details...Details
        ...Details...Details...Details...Details...Details...Details
        ...Details...Details...Details...Details...Deta
        ils...Details...Details...Details...Details...Details...Det
        ails...Details...Details...Details...Details...Details...Details...Details...Details...Details...Details...
        Details...Details...Details...Details...Details...Details..
        .Details...Details...Details...Details...Details...Details...Details...Details...Details...Details...D
        etails...Details...Details...Details...Details...Detail
        s...Details...Details...Details...Details...Details...Det
        ails...Details...Details...Details...Details...Details...Details...De
        tails...Details...Details...Details...
      </p>
      <div className="flex flex-wrap gap-1 justify-end">
        <button
          className="border border-white bg-green-700 disabled:opacity-25 disabled:cursor-help"
          onClick={() => OnMarkAsDone(task.id, task.title)}
          disabled={task.isDone}
        >
          Done
        </button>
        <DeleteButton onClick={() => OnDelete(task.id, task.title)}>
          Delete
        </DeleteButton>
      </div>
    </li>
  );
}
