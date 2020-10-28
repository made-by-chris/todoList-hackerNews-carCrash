import React, { useState, useEffect } from "react";
import "./App.css";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

function App() {
  const [todos, setTodos] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    console.log("todolist changed!");
  }, [todos]);

  useEffect(() => {
    fetch("https://hn.algolia.com/api/v1/search?query=penguins")
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        const newTodos = response.hits
          .map((result) => ({
            text: result.title,
            url: result.url,
            num_comments: result.num_comments,
            isCompleted: false,
          }))
          .sort((a, b) => (a.num_comments > b.num_comments ? -1 : 1));
        setTodos(newTodos);
        setQuery(response.query);
      });
  }, []);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        <h1>{query}</h1>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
