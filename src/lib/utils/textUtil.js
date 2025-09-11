import { calculateAge } from './ageUtil.js';

/**
 * Fix de veldnamen
 * 
 * Voorbeeld: "fav_dier" -> "Fav Dier", "mugshot" -> "Mugshot"
 */
export function normalizeFieldName(fieldName) {
  return fieldName
    .replace(/([A-Z])/g, " $1") // Voor camelCase
    .replace(/^./, (str) => str.toUpperCase()) // Eerste letter kapitaliseren
    .replace(/_/g, " ") // Underscores vervangen door spaties
}

/**
 * url friendly slug van de title
 */
function createSlug(title) {
  return title.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Omzetten van de velden en values naar titles en descriptions
 * 
 * Zet mugshot er aan het einde bij als het bestaat
 */
export function processPersonData(responseData) {
  const titles = [];
  const descriptions = [];
  const slugs = [];
  let mugshot = null;

  if (responseData) {
    // Eerst willen we alle veldnamen & waarden opslaan (behalve de mugshot)
    Object.entries(responseData).forEach(([fieldName, fieldValue]) => {
      if (fieldName !== "mugshot" && fieldValue !== null && fieldValue !== undefined && typeof fieldValue !== "object") {
        // Replace birthdate with age
        if (fieldName === "birthdate") {
          const age = calculateAge(fieldValue);
          titles.push("Age");
          descriptions.push(`${age}`);
          slugs.push(createSlug("Age"));
        } else {
          // We fixen de veldnamen
          const normalizedTitle = normalizeFieldName(fieldName);
          titles.push(normalizedTitle);
          descriptions.push(String(fieldValue));
          slugs.push(createSlug(normalizedTitle));
        }
        } else if (fieldName === "mugshot" && typeof fieldValue === "object") {
          // We slaan de mugshot data apart op voor later
          mugshot = fieldValue;
        }
    });

    // We voegen de mugshot toe aan het einde als het bestaat
    if (mugshot) {
      // Titel van de mugshot field
      titles.push("Media");
      // Placeholder die we aan de voorkant vervangen door de mugshot
      descriptions.push("mugshot");
      slugs.push(createSlug("Media"));
    }
  }

  return { titles, descriptions, slugs, mugshot };
}
