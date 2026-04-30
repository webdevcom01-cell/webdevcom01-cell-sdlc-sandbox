export interface RealEstateListing {
  price: number | null;
  area: number | null;
  rooms: number | null;
  floor: number | null;
  totalFloors: number | null;
  location: string | null;
}

export function parseRealEstateListing(html: string): RealEstateListing {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  let price: number | null = null;
  let area: number | null = null;
  let rooms: number | null = null;
  let floor: number | null = null;
  let totalFloors: number | null = null;
  let location: string | null = null;

  // Price (e.g., '250.000 €', '85 000 €', '120.000 €')
  // Accept dots or spaces as thousand separators
  const priceMatch = text.match(/(?:Cena:|^|\s)(\d{1,3}(?:[ .]\d{3})*|\d+)(?:[.,](\d{1,2}))? ?€/i) || text.match(/(\d{1,3}(?:[ .]\d{3})*|\d+) ?€/i);
  if (priceMatch) {
    // Remove spaces and dots, handle decimals if exist (ignore decimals for price)
    let main = priceMatch[1].replace(/[ .]/g, '');
    price = parseInt(main, 10);
  }

  // Area (e.g. '65 m²', '50m2', '45 m²')
  const areaMatch = text.match(/(\d+(?:[.,]\d+)?) ?m(?:2|²)/i);
  if (areaMatch) {
    area = Math.round(parseFloat(areaMatch[1].replace(',', '.')));
  }

  // Rooms (as per snippets)
  const lm = text.match(/sobe?:\s*(\d+(?:\.\d+)?)/i);
  const vm = text.match(/(\d+(?:\.\d+)?)\s*sobe?/i);
  const m = lm || vm;
  if (m) rooms = Math.round(parseFloat(m[1]));
  // Special case: 'garsonjera' or 'studio' = 1 room
  if (!rooms && /garsonjera|studio/i.test(text)) {
    rooms = 1;
  }

  // Floor and Total Floors (as per snippet)
  const fm = /(\d+)\.?\s*(?:od|\/)\s*(\d+)/i.exec(text);
  if (fm) {
    floor = parseInt(fm[1], 10);
    totalFloors = parseInt(fm[2], 10);
  } else {
    // If 'Prizemlje' (ground floor, Serbian), set floor = 0
    if (/prizemlje/i.test(text)) {
      floor = 0;
    }
    // Handle 'Sprat: 4/7' or 'Sprat: 4 od 7' (already handled above), fallback if 'Sprat: broj'
    const singleFloor = text.match(/Sprat:\s*(\d+)/i);
    if (singleFloor && floor === null) {
      floor = parseInt(singleFloor[1], 10);
    }
  }

  // Location (e.g. 'Lokacija: Novi Sad')
  const locMatch = text.match(/Lokacija:\s*([^<\n\r]+)/i);
  if (locMatch) {
    location = locMatch[1].trim();
  }

  // If no price, area, rooms, floor, totalFloors, location found, return all null
  if (
    price === null &&
    area === null &&
    rooms === null &&
    floor === null &&
    totalFloors === null &&
    location === null
  ) {
    return {
      price: null,
      area: null,
      rooms: null,
      floor: null,
      totalFloors: null,
      location: null,
    };
  }
  return { price, area, rooms, floor, totalFloors, location };
}
