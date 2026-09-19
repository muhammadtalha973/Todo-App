import { useState } from "react";
import "./App.css";
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
  function getInputText(event) {
    setInputValue(event.target.value);
  }
  function addTask() {
    if (inputValue.trim() !== "") {
      setTodoList([
        ...todoList,
        {
          id: Date.now(),
          task: inputValue.trim(),
          completed: false,
        },
      ]);

      setInputValue("");
    }
  }

  function deleteTask(id) {
    let newArray = todoList.filter((task) => task.id !== id);
    setTodoList(newArray);
  }
  function completeTask(id) {
    const newArray = todoList.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });

    setTodoList(newArray);
  }
  function editTask() {
    const editArray = todoList.map((task) => {
      if (task.id === editId) {
        return {
          ...task,
          task: inputValue.trim(),
        };
      }
      return task;
    });

    setTodoList(editArray);
    setInputValue("");
    setEditId(null);
  }

  return (
 <section className="w-full min-h-screen px-4 py-6 grid grid-cols-1 grid-rows-[auto_1fr] justify-items-center gap-y-8 font-caveat">

  <header className="w-full max-w-2xl h-60">
    <img
      src=".\src\assets\todolist-logo.png"
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
