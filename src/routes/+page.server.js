import { fetchPersonData } from '$lib/utils/apiUtil.js';
import { processPersonData } from '$lib/utils/textUtil.js';
import { processTracks } from '$lib/utils/trackUtil.js';

export async function load() {
  try {
    const response = await fetchPersonData();

    const { titles, descriptions, slugs, mugshot } = processPersonData(response.data);

    const audioFiles = [
      'johnska-cascading_emotions.mp3',
      'mastodon-blood_and_thunder.mp3',
      'Last_Dinosaurs-Zoom.mp3',
      'bullet_for_my_valentine-hand_of_blood.mp3',
    ];
    
    const tracks = processTracks(audioFiles);
    
    return {
      titles,
      descriptions,
      slugs,
      mugshot,
      tracks
    };
  } catch (error) {
    
    // Return niks
    return {
      titles: [],
      descriptions: [],
      slugs: [],
      mugshot: null,
      tracks: { path: [], name: [] }
    };
  }
}