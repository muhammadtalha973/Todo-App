import TodoItem from "./TodoItem";
export default function TodoList({
  todoList,
  deleteTask,
  editTask,
  setInputValue,
  editId,
  setEditId,
  completeTask,
  searchValue,
  filterValue,
}) {
  return todoList
    .filter((task) =>
      task.task.toLowerCase().includes(searchValue.toLowerCase()),
    )
    .filter((task) => {
      if (filterValue === "all") {
        return true;
      }
      if (filterValue === "completed") {
        return task.completed;
      }
      if (filterValue === "pending") {
        return !task.completed;
      }
    })
    .map((task) => (
      <TodoItem key={task.id}
        task={task}
        deleteTask={deleteTask}
        editTask={editTask}
        editId={editId}
        setEditId={setEditId}
        setInputValue={setInputValue}
        completeTask={completeTask}
      />
    ));
}
