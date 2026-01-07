import { useState } from "react";
import "./App.css";
import Tasks from "./Tasks";

function App() {
  const [currentTab, setCurrentTab] = useState("tasks");

  function changeTab(tab) {
    if(currentTab === tab) return
    setCurrentTab(tab);
  }

  return (
    <div className="app h-screen flex flex-col gap-3">
      <h1>📝 React Task Evaluator</h1>
      <nav>
        <ul className="flex items-center justify-center gap-10 border-b max-w-150 mx-auto *:text-lg *:cursor-pointer">
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
    </div>
  );
}

export default App;
