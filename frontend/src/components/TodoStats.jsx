export default function TodoStats({todoList}) {
  return (
    <div>
      <h3 className="text-3xl mb-2">Total Task: {todoList.length}</h3>
      <h3 className="text-3xl mb-2">
        Completed Task: {todoList.filter((task) => task.completed).length}
      </h3 >
      <h3 className="text-3xl mb-2"> Pending Task: {todoList.filter((task) => !task.completed).length}</h3>
    </div>
  )
}