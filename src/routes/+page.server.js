import { fetchPersonData } from '$lib/utils/apiUtil.js';
import { processPersonData } from '$lib/utils/textUtil.js';

export async function load() {
  try {
    const response = await fetchPersonData();

    const { titles, descriptions, slugs, mugshot } = processPersonData(response.data);

    return {
      titles,
      descriptions,
      slugs,
      mugshot,
    };
  } catch (error) {
    console.error("Failed to fetch personal data:", error);
    // Return niks
    return {
      titles: [],
      descriptions: [],
      slugs: [],
      mugshot: null
    };
  }
}