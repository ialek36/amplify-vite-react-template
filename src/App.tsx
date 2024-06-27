import { useEffect, useState } from "react";
import type { Schema, Todo2 } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();


function App() {
  // const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [todos, setTodos] = useState<Array<Todo2>>([]);

  useEffect(() => {
    getList().then(res => setTodos(res.data));
    console.log(client);
  }, []);

  const getList = async () => {
    const res = await client.queries.listTodo2();
    if (res instanceof Error) {
      console.log("Error: ", res.message);
      return [];
    } else {
      return res;
    }
  }

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  const createTodo2 = async() => {
    let itemContent = window.prompt("Todo content");

    if (!itemContent) itemContent= "default";

    await client.mutations.addTodo2({ content: itemContent});
    await getList().then(res => setTodos(res.data));
  }

  async function deleteTodo2(id: string) {
    await client.mutations.deleteTodo2({ id });
    await getList().then(res => setTodos(res.data));
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo2}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li 
            onClick={() => deleteTodo2(todo._id)} 
            key={todo._id}>{todo.content}
          </li>
        ))}
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
