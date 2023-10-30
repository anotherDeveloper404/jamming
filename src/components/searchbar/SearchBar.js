import { useState } from "react";
import { useUser } from "../user/UserContext";

export default function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUser();

  const renderActions = () => {
    if(!user.hasOwnProperty('id')) {
      return (
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={signIn}
        >
          Sign in to Spotify
        </button>
      )
    } else {
      return (
        <button
          type="button"
          className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={search}
        >
            Search
        </button>
      )
    }
  }

  const handleTermChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const signIn = () => {
    props.signIn();
  }

  const search = () => {
    props.onSearch(searchTerm);
  }

  return (
    <div className="max-w-md mx-auto flex gap-4 flex-col justify-center items-center">
      <label htmlFor="searchbar" className="sr-only">
        Search
      </label>
      <input
        onChange={handleTermChange}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-100 dark:placeholder-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-offset-gray-800"
        placeholder="Search for a song"
      />
      {renderActions()}
    </div>
  )
  }