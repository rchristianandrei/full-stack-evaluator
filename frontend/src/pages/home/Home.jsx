import { Header } from "../../components/Header";
import { TasksProvider } from "../../context/TasksProvider";
import { Tasks } from "./Tasks";

export function Home() {
  return (
    <TasksProvider>
      <div className="h-screen flex flex-col gap-3">
        <Header></Header>
        <Tasks className="flex-1" />
      </div>
    </TasksProvider>
  );
}
