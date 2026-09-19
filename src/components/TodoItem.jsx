export default function TodoItem({
  task,
  deleteTask,
  editTask,
  setInputValue,
  editId,
  setEditId,
  completeTask,
}) {
  return (
    <div key={task.id} className="grid grid-cols-[minmax(0,1fr)_auto_auto_auto]  gap-5 mt-4  ">
      <div className="wrap-break-word">
        <p
          className="text-3xl"
          style={{
            textDecoration: task.completed ? "line-through" : "none", 
          }}
        >
          {task.task}
        </p>
      </div>
      <div className="flex items-center gap-2 ">
        <input
          className="w-10 h-8  rounded-full accent-white
           border border-black checked:bg-white 
          "
          type="checkbox"
          name="checkbox"
          checked={task.completed}
          onChange={() => completeTask(task.id)}
        />
        <button
          className="w-10 h-8 bg-white text-md  rounded-2xl border border-black text-[#D21111] font-bold"
          onClick={() => deleteTask(task.id)}
        >
          ✗ 
        </button>
        {editId === task.id ? (
          <button className="w-10 h-8 bg-white  rounded-2xl border border-black" onClick={editTask}>Save</button>
        ) : (
          <button
            className="w-10 h-8 bg-white  rounded-2xl border border-black"
            onClick={() => {
              setEditId(task.id);
              setInputValue(task.task);
            }}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
