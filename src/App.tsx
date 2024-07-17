import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from '@aws-amplify/ui-react';

const client = generateClient<Schema>();

function App() {
  type Todo = Schema["getTodo"]['returnType'];
  const [todos, setTodos] = useState<Todo[]>([]);

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
    const itemContent = window.prompt("Todo content");
    if (!itemContent) return;

    await client.mutations.addTodo({ content: itemContent});
    fetchTodos()
  }

  const updateTodo = async(todo: Todo) => {
    if (!todo) return;

    const itemContent = window.prompt("Todo content", todo?.content);
    if (!itemContent) return;
    
    const updatedTodo:Todo = {...todo, content: itemContent };

    await client.mutations.updateTodo({...updatedTodo});
    fetchTodos()
  }

  async function deleteTodo(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) {
    e.stopPropagation();
    await client.mutations.deleteTodo({ id });
    fetchTodos()
  }

  return (
    <Authenticator>
    {({ signOut, user }) => (
      <main>
        <h1>Hello {user?.username}</h1>
        <button onClick={signOut}>Sign out</button>
        <h1>My todos</h1>
        <button onClick={createTodo}>+ new</button>
        <ul>
          {todos.map((todo) => {
            if (!todo) return null;
            return (
              <li onClick={() => updateTodo(todo)} key={todo._id}> 
                <button onClick={(event) => deleteTodo(event, todo._id)}>x</button> {todo.content}
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
    )}
  </Authenticator>
  );
}

export default App;
