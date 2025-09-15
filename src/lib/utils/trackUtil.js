export function processTracks(tracks) {
  return {
    path: tracks.map((track) => `music/${track}`),
    name: tracks.map((track) =>
      track
        .replace(/-/g, " - ")
        .replace(/_/g, " ")
        .replace(/\.mp3$/, "")
        .replace(/\b\w/g, (char) => char.toUpperCase())
    ),
  };
}
