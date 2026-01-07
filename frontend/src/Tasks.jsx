import { useEffect, useState } from 'react';
import api from "./api/axios"
import taskRepo from './api/taskRepo';

function Tasks(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    
    taskRepo.getAllTasks(controller)
    .then(res => setTasks(res.data))
    .catch(err => {
      if (err.name !== 'CanceledError') {
        console.error(err);
      }
    });

    return () => {
      controller.abort();
    };
  }, []);

  function OnDelete(taskId){
    const confirm = window.confirm(`Are you sure you want to delete task Id: ${taskId}?`)

    if(!confirm) return;

    taskRepo.deleteById(taskId)
    .then(() => {
      taskRepo.getAllTasks()
        .then(res => setTasks(res.data))
        .catch(err => console.error(err));
    })
    .catch(err => console.log(err))
  }

  return (
    <div className={`${props.className} flex flex-col gap-2`}>
      <div className='flex items-center justify-around'>
        <h2 className='text-2xl'>Tasks</h2>
        <button className='border bg-white text-black'>Add</button>
      </div >
      <div className='flex justify-center'>
        <ul className='flex-1 max-w-150 flex flex-col gap-2 px-4'>
          {tasks.map(task => (
            <li className='flex items-center justify-between' key={task.id}>
              <div>{task.title} {task.isDone ? '✅' : '❌'}</div>
              <div className='flex gap-1'>
                <button className='border border-white'>Edit</button>
                <button className='border bg-red-500' onClick={() => OnDelete(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Tasks;
