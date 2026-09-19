export default function SearchBar({searchValue,setSearchValue}) {
  return (
    <div>
      <input
        className="px-8 py-1 rounded-full   bg-[#FFFC57]   text-3xl mt-5 border-4 border-black "
        type="text"
        name="search-input"
        id="search-input"
        placeholder="search task here ..."
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
    </div>
  )
}