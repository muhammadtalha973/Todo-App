export default function SearchBar({searchValue,setSearchValue}) {
  return (
    <div>
      <input
        className="w-full rounded-full   bg-[#FFFC57]  p-2  placeholder:pl-5 text-3xl mt-5 border-4 border-black "
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