import { useAuth } from "../context/AuthProvider";
import Tasks from "../Tasks";

export function Home() {
  const { user } = useAuth();

  return (
    <div className="app h-screen flex flex-col gap-3">
      <header className="flex items-center justify-between p-5 border-b relative lg:static">
        <h1 className="text-lg md:text-2xl cursor-pointer">
          📝 React Task Evaluator
        </h1>
        <div className="group lg:relative cursor-pointer">
          <span>{user.email}</span>
        </div>
      </header>
      <Tasks className="flex-1" />
    </div>
  );
}
