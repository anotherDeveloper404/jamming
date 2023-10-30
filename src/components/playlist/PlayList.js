import TrackList from "../tracklist/TrackList";
import { useCallback } from "react";

export default function PlayList(props) {
    const { onNameChange, onSave, playlistName, playlistTracks, onRemove } = props;
    const handleNameChange = useCallback((event) => {
          onNameChange(event.target.value);
        }, [onNameChange]);

    const save = () => {
        onSave(playlistName, playlistTracks);
    }
    return (
        <div className="Playlist">
            <input className="border-none text-lg font-semibold dark:text-gray-100 dark:bg-slate-700" 
            onChange={handleNameChange} 
            defaultValue={"New Playlist"} 
            />
            <TrackList
                tracks={playlistTracks}
                isRemoval={true}
                onRemove={onRemove}
            />
            <button 
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mt-6" 
                onClick={save}
            >
                SAVE TO SPOTIFY
            </button>
        </div>
    )
}