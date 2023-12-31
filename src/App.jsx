import { useEffect, useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import axios, { isCancel, AxiosError } from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);

    let [comp, setComp] = useState(null);

  function todocomp() {
    let num = 0;
    todos.map((e) => {
      if (e.completed == true) {
        num += 1;
      }
    });
    setComp(num);
  }
  useEffect(todocomp, todos.completed);
  const pageSize = 20;

  useEffect(() => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${pageSize}`
      )
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [page]);

  const handleNextClick = () => {
    setPage(page + 1);
  };

  const handlePrevClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <div>
        <h1>Todo List</h1>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="listing">
              <input type="checkbox" checked={todo.completed} />
             <label htmlFor="checktodo"> {todo.title}</label>
            </li>
          ))}
        </ul>
        <div className="botom">
          <button onClick={handlePrevClick} disabled={page === 1}>
            Previous
          </button>
          <p>Page {page}</p>
          <button onClick={handleNextClick}>Next</button>
        </div>
         <div className="completed">
          <div className="status">
            <p>Tast Status</p>
          </div>

          <p className="green">Completed {comp}</p>
          <p className="red">Pending {20 - comp}</p>
        </div>
      </div>
    </>
  );
}

export default App;
