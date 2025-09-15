import { fetchPersonData } from '$lib/utils/apiUtil.js';
import { processPersonData } from '$lib/utils/textUtil.js';
import { processTracks } from '$lib/utils/trackUtil.js';
import fs from 'fs';
import path from 'path';

export async function load() {
  try {
    const response = await fetchPersonData();

    const { titles, descriptions, slugs, mugshot } = processPersonData(response.data);

    // In production (Netlify), static files are moved to build root
    // In development, they're in the static folder
    const audioPath = process.env.NODE_ENV === 'production' 
      ? path.join(process.cwd(), 'music')
      : path.join('static', 'music');
    const audioFiles = fs.readdirSync(audioPath);
    
    const tracks = processTracks(audioFiles);
    
    return {
      titles,
      descriptions,
      slugs,
      mugshot,
      tracks
    };
  } catch (error) {
    console.error("Failed to fetch personal data:", error);
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