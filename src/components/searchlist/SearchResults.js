import TrackList from '../tracklist/TrackList'

export default function SearchResults(props) {
  return (
    <div className="SearchResults">
      <h2 className='text-lg font-semibold dark:text-gray-100'>Results</h2>
      <TrackList tracks={props.searchResults} onAdd={props.onAdd} />
    </div>
  )
}
