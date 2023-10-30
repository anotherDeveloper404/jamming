

export default function Track(props) {
    const handleAddTrack = () => {
        props.onAdd(props.track)
    };
    const handleRemoveTrack = () => {
        props.onRemove(props.track)
    };
    const renderAction = () => {
        if (props.isRemoval) {
           return (
                <button
                    onClick={handleRemoveTrack}
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    Remove Track<span className="sr-only">, {props.track.name}</span>
                </button>
            );
        } else {
            return (
                <button
                    onClick={handleAddTrack}
                    className="rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    Add Track<span className="sr-only">, {props.track.name}</span>
                </button>
            )
        }
    };

    return (
        <li key={props.track.id} className="flex items-center justify-between gap-x-6 py-5 px-3.5">
        <div className="min-w-0">
          <div className="flex items-start gap-x-3">
            <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">{props.track.name}</p>
          </div>
          <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500 dark:text-gray-300">
            <p className="whitespace-nowrap">
              Artists: {props.track.artists.map((artist) => artist.name).join(', ')}
            </p>
            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
              <circle cx={1} cy={1} r={1} />
            </svg>
            <p className="truncate">Album: {props.track.album}</p>
          </div>
        </div>
        <div className="flex flex-none items-center gap-x-4">
            {renderAction()}
        </div>
      </li>
    )
}