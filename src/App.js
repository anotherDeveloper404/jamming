import SearchBar from "./components/searchbar/SearchBar";
import SearchResults from "./components/searchlist/SearchResults";
import PlayList from "./components/playlist/PlayList";
import UserProfile from "./components/user-profile/UserProfile";
import { useState, useCallback, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import Spotify from "./util/Spotify";
import { useUser } from "./components/user/UserContext";

export default function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const { user, setUser } = useUser();

  const search = useCallback((term) => {
    Spotify.search(term).then(setSearchResults);
  }, []);

  const handleNameChange = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  const handleAddTrack = useCallback((track) => {
    if (playlistTracks.some((savedTrack) => savedTrack.id === track.id))
      return;

    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
  },  [playlistTracks]);

  const handleRemoveTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);

  const handleSave = useCallback(() => {
    const trackUris = playlistTracks.map((track) => track.uri);
    if(!playlistName || !trackUris.length) return;
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }, [playlistName, playlistTracks]);

  const handleSignIn = () => {
    Spotify.getUserInfo().then((user) => {
      setUser(user);
    });
  };


  return (
    <div className="min-h-full">
      <div className="bg-gray-800 pb-32">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="border-b border-gray-700">
              <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                <div className="flex items-center">
                </div>
                <div className="block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <UserProfile user={user} onSignIn={handleSignIn} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Disclosure>
        <header className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">Jamming!</h1>
          </div>
        </header>
      </div>

      <main className="-mt-32">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white dark:bg-slate-700 px-5 py-6 shadow sm:px-6">
            <div className="mt-6">
              <div className="mt-1">
                <SearchBar onSearch={search} signIn={handleSignIn} />
                <div className="grid grid-cols-1 gap-14 md:grid-cols-2 mt-6">
                  <SearchResults searchResults={searchResults} onAdd={handleAddTrack} />
                  <PlayList 
                    playlistName={playlistName} 
                    onNameChange={handleNameChange}
                    playlistTracks={playlistTracks}
                    onRemove={handleRemoveTrack}
                    onSave={handleSave}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
