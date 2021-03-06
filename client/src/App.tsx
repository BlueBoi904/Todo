import React, {useState, useEffect} from 'react';
import {Input} from './components/Input'
import {TodoList} from './components/TodoList'
import axios from 'axios';
import "tailwindcss/tailwind.css"

export type TodoType = {
  id: number,
  task: string,
  completed: boolean,
}

function App() {
  const [todo, setTodo] = useState<string>('')
  const [todos, setTodos] = useState<TodoType[]>([])
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
}

  const getTodos = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:5000/todos')
            setTodos(res.data)
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        getTodos()
    }, [])

    const onSubmit = async () =>  {
      try {
        const res = await axios.post('http://127.0.0.1:5000/todos', {"task": todo, "completed": false})
        getTodos()
        setTodo('')
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className="container mx-auto">
      <div className="text-center py-6" >
        <header>
          <h1 className=" text-blue-400 font-medium text-2xl">To Do list</h1>
        </header>
      </div>
      
     <div className="px-40">
      <Input onSubmit={onSubmit} todo={todo} handleInputChange={handleInputChange} />
      <TodoList getTodos={getTodos} todos={todos}/>
     </div>
      </div>
  );
}

export default App;
