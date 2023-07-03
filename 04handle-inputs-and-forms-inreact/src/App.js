import { useState } from 'react'

import Overview from './components/Overview'

function App() {
  let id = 1
  const [taskData, setTaskData] = useState([
    {
      id: id++,
      task: 'dummy task1',
      isDone: true,
      doubleClick: false,
    },
    {
      id: id++,
      task: 'dummy task2',
      isDone: false,
      doubleClick: false,
    },
  ])
  const [newTask, setNewTask] = useState({
    id: id++,
    task: '',
    isDone: false,
    doubleClick: false,
  })

  // STATES END

  // HANDLE NEW TASK INPUT
  const handleInputChange = (event) => {
    return setNewTask((prevNewTask) => ({
      ...prevNewTask,
      task: event.target.value,
    }))
  }

  // ADD NEW TASK
  const onsubmitNewTask = (event) => {
    event.preventDefault()

    setTaskData((prevTaskData) => {
      return [...prevTaskData, newTask]
    })

    setNewTask({
      id: id++,
      task: '',
      isDone: false,
      doubleClick: false,
    })
  }

  // REMOVE TASK
  const removeTask = (id) => {
    setTaskData((prevTaskData) => {
      return prevTaskData.filter((task) => task.id !== id)
    })
  }

  // EDIT TASK DOUBLE CLICK --- COME BACK TO THIS LATER, YOU DO NOT HAVE TIME ---
  // const editTask = (id) => {
  //   console.log(`Task ID: ${id}`)
  //   setTaskData((prevTaskData) => {
  //     return prevTaskData.map((task) => {
  //       if (task.id === id) {
  //         console.log(task.doubleClick)
  //         return { ...task, doubleClick: !task.doubleClick }
  //       }
  //       return task
  //     })
  //   })
  // }

  // TOGGLE ISDONE
  const handleClick = (id) => {
    setTaskData((prevTaskData) => {
      return prevTaskData.map((task) => {
        if (task.id === id) {
          return { ...task, isDone: !task.isDone }
        }
        return task
      })
    })
  }
  return (
    <div>
      <div className="add-task">
        <form>
          <input
            type="text"
            name="task"
            value={newTask.task}
            onChange={handleInputChange}
          />
          <button onClick={onsubmitNewTask}>ADD NEW TASK</button>
        </form>
      </div>

      <Overview
        taskData={taskData}
        handleClick={handleClick}
        removeTask={removeTask}
        // editTask={editTask}
        key={taskData.map((task) => task.doubleClick).join(',')}
      />
    </div>
  )
}

export default App
