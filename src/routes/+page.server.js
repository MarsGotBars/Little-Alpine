import { fetchPersonData } from '$lib/utils/apiUtil.js';
import { processPersonData } from '$lib/utils/textUtil.js';

export async function load() {
  try {
    const response = await fetchPersonData();
    console.log("API Response:", response);

    const { titles, descriptions, mugshot } = processPersonData(response.data);

    return {
      titles,
      descriptions,
      mugshot,
    };
  } catch (error) {
    console.error("Failed to fetch personal data:", error);
    // Return niks
    return {
      titles: [],
      descriptions: [],
      mugshot: null
    };
  }
}