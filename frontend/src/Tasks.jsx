import { useEffect, useState } from 'react';
import api from "./api/axios"

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get('tasks').then(res => res.json())
    .then(data => setTasks(data))
    .catch(err => console.log())
  }, []);

  useEffect(() => {
    api.get('/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className='text-red-300'>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} {task.isDone ? '✅' : '❌'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
