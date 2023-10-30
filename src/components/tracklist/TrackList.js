import Track from '../track/Track'

export default function TrackList(props) {
  return (
    <ul className="divide-y divide-gray-100 max-h-96 overflow-auto">
      {props.tracks.map((track) => (
        <Track 
        track={track} 
        key={track.id}
        onAdd={props.onAdd}
        isRemoval={props.isRemoval}
        onRemove={props.onRemove} 
        />
      ))}
    </ul>
  )
}
