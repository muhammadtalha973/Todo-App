import { useState, useEffect } from "react";
import "./App.css";
import todoLogo from "./assets/todolist-logo.png";
import TodoInput from "./components/TodoInput";
import TodoFilter from "./components/TodoFilters";
import TodoStats from "./components/TodoStats";
import SearchBar from "./components/SearchBar";
import TodoList from "./components/TodoList";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTodoList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  function getInputText(event) {
    setInputValue(event.target.value);
  }
  async function addTask() {
    if (inputValue.trim() !== "") {
      try {
        const url = `${import.meta.env.VITE_API_URL}api/tasks`
        console.log("POST URL" , url);
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task: inputValue.trim(),
          }),
        });
        console.log("Status", response.status)
        const newTodo = await response.json();
        setTodoList([...todoList, newTodo]);
        setInputValue("");
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function deleteTask(id) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}api/tasks/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("failed to delete task");
      }
      setTodoList((currentTodos) =>
        currentTodos.filter((task) => task._id !== id),
      );
    } catch (error) {
      console.log(error);
    }
  }
  async function completeTask(id) {
    try {
      const task = todoList.find((task) => task._id === id);
      if (!task) {
        return;
      }
      const response = await fetch(`${import.meta.env.VITE_API_URL}api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !task.completed,
        }),
      });
      if (!response.ok) {
        throw new Error("failed to update task");
      }
      const updatedTodo = await response.json();
      setTodoList((currentTodos) =>
        currentTodos.map((task) => (task._id === id ? updatedTodo : task)),
      );
    } catch (error) {
      console.log(error);
    }
  }
  async function editTask() {
    if (inputValue.trim() === "") {
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/tasks/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task: inputValue.trim(),
          }),
        },
      );
      if (!response.ok) {
        throw new Error("failed to update task");
      }
      const updatedTodo = await response.json();
      setTodoList((currentTodos) =>
        currentTodos.map((task) => (task._id === editId ? updatedTodo : task)),
      );
      setInputValue("");
      setEditId(null);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="w-full min-h-screen px-4 py-6 grid grid-cols-1 grid-rows-[auto_1fr] justify-items-center gap-y-8 font-caveat">
      <header className="w-full max-w-2xl h-60">
        <img
          src={todoLogo}
          alt="todolist-logo"
          className="max-w-full h-full object-contain"
        />
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full max-h-84 bg-[#F6F4CC] rounded-3xl p-4 ">
          <TodoInput
            getInputText={getInputText}
            addTask={addTask}
            inputValue={inputValue}
            editId={editId}
            editTask={editTask}
          />

          <TodoStats todoList={todoList} />
        </div>

        <div className="w-full bg-[#F6F4CC] rounded-3xl p-4 max-h-100 overflow-y-auto">
          <TodoFilter setFilterValue={setFilterValue} />

          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />

          <TodoList
            todoList={todoList}
            deleteTask={deleteTask}
            editTask={editTask}
            editId={editId}
            setEditId={setEditId}
            searchValue={searchValue}
            filterValue={filterValue}
            setInputValue={setInputValue}
            completeTask={completeTask}
          />
        </div>
      </main>
    </section>
  );
}

export default App;
