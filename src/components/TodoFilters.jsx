export default function TodoFilter({setFilterValue}) {
  return (
    <div>
      <button className=" px-8 py-1 m-0.5 rounded-3xl bg-[#FFFC57]  text-2xl border-4 border-black" onClick={() => setFilterValue("all")}>All</button>
      <button className="px-8 py-1 m-0.5 rounded-3xl bg-[#FFFC57]  text-2xl border-4 border-black" onClick={() => setFilterValue("completed")}>Completed</button>
      <button className="px-8 py-1 m-0.5 rounded-3xl bg-[#FFFC57]  text-2xl border-4 border-black " onClick={() => setFilterValue("pending")}>Pending</button>
    </div>
  );
}
