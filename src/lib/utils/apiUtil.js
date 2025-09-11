/**
 * Fetches person data from the Directus API
 */
export async function fetchPersonData() {
  const response = await fetch(
    "https://fdnd.directus.app/items/person/160?fields=name,profilecard,birthdate,mugshot.height,mugshot.width,mugshot.id"
  );
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }
  
  return await response.json();
}
