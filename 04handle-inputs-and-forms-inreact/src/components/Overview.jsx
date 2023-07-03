export default function Overview({
  taskData,
  handleClick,
  removeTask,
  // editTask,
}) {
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Tasks</h2>
      <hr />
      <div>
        {taskData.map(({ id, task, isDone }) => {
          return (
            <div
              key={id}
              style={{ display: 'flex', justifyContent: 'space-evenly' }}
            >
              <p
                // onDoubleClick={() => editTask(id)}
                style={{
                  backgroundColor: 'lightgray',
                  borderRadius: '.5rem',
                  padding: '.3rem',
                }}
              >
                {task}
              </p>
              <p
                onClick={() => handleClick(id)}
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  borderRadius: '1rem',
                  padding: '.5rem',
                  cursor: 'pointer',
                }}
              >
                {isDone ? 'DONE' : 'NOT DONE'}
              </p>
              <p onClick={() => removeTask(id)} style={{ cursor: 'pointer' }}>
                REMOVE TASK
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
