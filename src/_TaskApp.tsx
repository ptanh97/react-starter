import { useReducer, useState } from 'react';

interface Task {
  id: number;
  text: string;
  done: boolean;
}

interface Action {
  type: string;
  [key: string]: any;
}

const AddTask = ({ onAddTask }) => {
  const [text, setText] = useState('');

  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText('');
          onAddTask(text);
        }}
      >
        Add
      </button>
    </>
  );
};

const TaskList = ({ tasks, onChangeTask, onDeleteTask }) => {
  return (
    <ul>
      {tasks.map((task: Task) => (
        <li key={task.id}>
          <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
        </li>
      ))}
    </ul>
  );
};

const Task = ({ task, onChange, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          onChange({
            ...task,
            done: e.target.checked,
          });
        }}
      />
      {isEditing ? (
        <>
          <input
            value={task.text}
            onChange={(e) => {
              onChange({
                ...task,
                text: e.target.value,
              });
            }}
          />
          <button onClick={() => setIsEditing(false)}>Save</button>
        </>
      ) : (
        <>
          {task.text}
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </label>
  );
};

export const TaskApp = () => {
  const initialTasks: Task[] = [
    { id: 0, text: 'Visit Kafka Museum', done: true },
    { id: 1, text: 'Watch a puppet show', done: false },
    { id: 2, text: 'Lennon Wall pic', done: false },
  ];
  let nextTaskId = 3;

  // const [tasks, setTasks] = useState(initialTasks);
  const [tasks, dispatch] = useReducer((tasks: Task[], action: Action) => {
    switch (action.type) {
      case 'added': {
        return [
          ...tasks,
          {
            id: action.id,
            text: action.text,
            done: false,
          },
        ];
      }
      case 'changed': {
        return tasks.map((task) =>
          task.id === action.task.id ? action.task : task
        );
      }
      case 'deleted': {
        return tasks.filter((task) => task.id !== action.taskId);
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }, initialTasks);

  const handleAddTask = (text: string) => {
    // setTasks([
    //   ...tasks,
    //   {
    //     id: nextTaskId++,
    //     text: text,
    //     done: false,
    //   },
    // ]);
    dispatch({
      type: 'added',
      id: nextTaskId++,
      text,
    });
  };

  const handleChangeTask = (task: Task) => {
    // setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    dispatch({
      type: 'changed',
      task,
    });
  };

  const handleDeleteTask = (taskId: number) => {
    // setTasks(tasks.filter((t) => t.id !== taskId));
    dispatch({
      type: 'deleted',
      taskId,
    });
  };

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
};
