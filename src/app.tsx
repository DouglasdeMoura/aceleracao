import { FC, useState, useEffect } from 'react'

type Task = {
  id: string
  title: string
  done: boolean
}

const countTasks = (tasks: Task[], done?: boolean) => {
  return tasks.filter((task) => task.done === done).length
}

export const App: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [completedTasks, setCompletedTasks] = useState(countTasks(tasks, true))
  const [pendingTasks, setPendingTasks] = useState(countTasks(tasks, false))

  const [counter, setCounter] = useState(0)

  useEffect(() => {
    setCompletedTasks(countTasks(tasks, true))
    setPendingTasks(countTasks(tasks, false))
  }, [tasks])

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.currentTarget)) as {
      task: string
    }
    setTasks([
      ...tasks,
      { id: tasks.length.toString(), title: formData.task, done: false },
    ])
    event.currentTarget.reset()
  }

  return (
    <main>
      <div>
        <button onClick={() => setCounter(counter + 1)} data-testid="counter">
          Contador: {counter}
        </button>
      </div>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="task">Nova tarefa:</label>
        <input type="text" name="task" id="task" />
        <button type="submit">Adicionar</button>
      </form>
      <p>Concluídas: {completedTasks}</p>
      <p>Pendentes: {pendingTasks}</p>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() =>
                setTasks(
                  tasks.map((t) =>
                    t.id === task.id ? { ...t, done: !t.done } : t,
                  ),
                )
              }
            />
            {task.done ? <del>{task.title}</del> : <span>{task.title}</span>}
          </li>
        ))}
      </ul>
    </main>
  )
}
