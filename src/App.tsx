import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Schema["getTodo"]['returnType'][]>([]);

  const fetchTodos = async () => {
    const { data: todos, errors} = await client.queries.listTodo();
    if (errors) {
      console.log("Error: ", errors);
      return [];
    } else {
      setTodos(todos ?? [])
    }
  }

  useEffect(() => { fetchTodos() }, []);


  const createTodo = async() => {
    const itemContent = window.prompt("Todo content") ?? "default";

    await client.mutations.addTodo({ content: itemContent});
    fetchTodos()
  }

  async function deleteTodo(id: string) {
    await client.mutations.deleteTodo({ id });
    fetchTodos()
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => {
          if (!todo) return null;
          return (
            <li 
              onClick={() => deleteTodo(todo._id)} 
              key={todo._id}>{todo.content}
            </li>
          )
        })}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  );
}

export default App;
