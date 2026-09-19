export default function TodoInput({getInputText , addTask , inputValue}) {
  return (
    <div>
      <input className="px-8 py-1 rounded-full   bg-[#FFFC57]   text-3xl  border-4 border-black" type="text" value={inputValue} onChange={getInputText} placeholder="Enter Task Here"/>
      <button  className="px-8 py-2 m-4 rounded-full bg-[#FFFC57]  text-3xl ml-20 mb-10 border-4 border-black " onClick={addTask}>Add task</button>
    </div>
  );
}
