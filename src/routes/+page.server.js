import { fetchPersonData } from '$lib/utils/apiUtil.js';
import { processPersonData } from '$lib/utils/textUtil.js';
import { processTracks } from '$lib/utils/trackUtil.js';
import fs from 'fs';
import path from 'path';

export async function load() {
  console.log('🚀 Starting data load...');
  try {
    console.log('📡 Fetching person data from API...');
    const response = await fetchPersonData();
    console.log('✅ API response received:', response ? 'success' : 'failed');

    const { titles, descriptions, slugs, mugshot } = processPersonData(response.data);

    // In production (Netlify), static files are moved to build root
    // In development, they're in the static folder
    // Check for Netlify environment or if static directory doesn't exist
    const isProduction = process.env.NODE_ENV === 'production' || !fs.existsSync('static');
    const audioPath = isProduction
      ? path.join(process.cwd(), 'music')
      : path.join('static', 'music');
    
    console.log('🎵 Looking for audio files at:', audioPath);
    console.log('🌍 Environment:', process.env.NODE_ENV);
    console.log('📁 Current working directory:', process.cwd());
    
    const audioFiles = fs.readdirSync(audioPath);
    console.log('🎼 Found audio files:', audioFiles);
    
    const tracks = processTracks(audioFiles);
    console.log('✨ Processed tracks:', tracks);
    
    return {
      titles,
      descriptions,
      slugs,
      mugshot,
      tracks
    };
  } catch (error) {
    console.error("❌ ERROR: Failed to load data");
    console.error("🔍 Error type:", error.constructor.name);
    console.error("💬 Error message:", error.message);
    console.error("📍 Error stack:", error.stack);
    console.error("🌍 Environment:", process.env.NODE_ENV);
    console.error("📁 Current working directory:", process.cwd());
    
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