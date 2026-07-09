const SearchForm = ({ email, setEmail, handleSearchUser }) => {
  return (
    <form onSubmit={handleSearchUser} className="mb-6 flex gap-2">
      <input
        type="email"
        placeholder="Search user by email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;