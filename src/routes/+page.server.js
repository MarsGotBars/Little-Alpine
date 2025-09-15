import { fetchPersonData } from '$lib/utils/apiUtil.js';
import { processPersonData } from '$lib/utils/textUtil.js';
import fs from 'fs';
import path from 'path';

export async function load() {
  try {
    const response = await fetchPersonData();

    const { titles, descriptions, slugs, mugshot } = processPersonData(response.data);

    const audioPath = path.join('static', 'music');
    const audioFiles = fs.readdirSync(audioPath);
    // console.log(audioFiles, 'audio');
    
    const tracks = audioFiles.map(file => `music/${file}`);
    // console.log(allAudio)
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
    };
  }
}