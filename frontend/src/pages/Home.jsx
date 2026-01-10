import { useState } from "react";
import Tasks from "../Tasks";
import Users from "../Users";

export function Home() {
  const [currentTab, setCurrentTab] = useState("tasks");

  function changeTab(tab) {
    if (currentTab === tab) return;
    setCurrentTab(tab);
  }

  return (
    <div className="app h-screen flex flex-col gap-3">
      <h1>📝 React Task Evaluator</h1>
      <nav>
        <ul className="flex items-center justify-center gap-10 border-b max-w-300 mx-auto *:text-lg *:cursor-pointer">
          <li
            className={
              currentTab === "tasks" ? "border-b-5 border-blue-500" : ""
            }
            onClick={() => changeTab("tasks")}
          >
            Tasks
          </li>
          <li
            className={
              currentTab === "users" ? "border-b-5 border-blue-500" : ""
            }
            onClick={() => changeTab("users")}
          >
            Users
          </li>
        </ul>
      </nav>
      {currentTab === "tasks" && <Tasks className="flex-1" />}
      {currentTab === "users" && <Users className="flex-1" />}
    </div>
  );
}
