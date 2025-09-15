import { fetchPersonData } from '$lib/utils/apiUtil.js';
import { processPersonData } from '$lib/utils/textUtil.js';
import { processTracks } from '$lib/utils/trackUtil.js';

export async function load() {
  console.log('🚀 Starting data load...');
  try {
    console.log('📡 Fetching person data from API...');
    const response = await fetchPersonData();
    console.log('✅ API response received:', response ? 'success' : 'failed');

    const { titles, descriptions, slugs, mugshot } = processPersonData(response.data);

    // Static list of music files since serverless functions can't access static files
    // Update this list when you add new music files
    const audioFiles = [
      'johnska-cascading_emotions.mp3',
      'mastodon-blood_and_thunder.mp3'
    ];
    
    console.log('🎼 Using static audio files list:', audioFiles);
    console.log('🌍 Environment:', process.env.NODE_ENV);
    console.log('📁 Current working directory:', process.cwd());
    
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