import './App.css'
import Tasks from "./Tasks"

function App() {
  return (
    <div className="app h-screen flex flex-col gap-3">
      <h1>📝 React Task Evaluator</h1>
      <Tasks className="flex-1" />
    </div>
  );
}

export default App
