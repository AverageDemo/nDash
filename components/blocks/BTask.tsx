import { FormEvent, useState } from 'react';

import BCard from '@/blocks/BCard';
import type { TaskInterface } from '@/interfaces/task.interface';
import moment from 'moment';

export default function BTask() {
  const storedTasksArray = localStorage.getItem('tasks');
  const storedTasks: TaskInterface[] = storedTasksArray ? JSON.parse(storedTasksArray) : ([] as TaskInterface[]);

  const [tasks, setTasks] = useState(storedTasks);
  const [taskData, setTaskData] = useState({
    id: 0,
    name: '',
    date: Date.now(),
  });

  const handleInputChange = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(taskData).some((element) => element === '');
    if (hasEmptyFields) return;

    taskData.id = storedTasks.length + 1;

    storedTasks.push(taskData);
    setTasks(storedTasks.reverse());
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
  };

  return (
    <div className="my-1 px-1 w-full overflow-hidden">
      <BCard>
        <form onSubmit={handleSubmit}>
          <div className="mt-1 pb-6">
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
              className="bg-gray-200 dark:bg-gray-900 bg-opacity-20 shadow-sm focus:ring-indigo-500 focus:border-indigo-200 block w-full sm:text-sm border-gray-700 rounded-md"
              placeholder="Add a task"
            />
          </div>
        </form>
        <ul className="divide-y divide-gray-700 max-h-96 overflow-y-auto no-scrollbar">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li key={task.id} className="py-4">
                <div className="flex space-x-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">{task.name}</h3>
                      <p className="text-sm text-gray-500">{moment(task.date).fromNow()}</p>
                    </div>
                    <p className="text-sm text-gray-500">Test</p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="pt-4">
              <div className="flex space-x-3">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-center">
                    <h3 className="text-sm font-medium">No tasks yet</h3>
                  </div>
                </div>
              </div>
            </li>
          )}
        </ul>
      </BCard>
    </div>
  );
}
