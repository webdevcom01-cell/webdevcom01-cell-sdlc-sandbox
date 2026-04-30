import { describe, it, expect } from 'vitest';
import { parseRealEstateListing } from '../parseRealEstateListing';

describe('parseRealEstateListing', () => {
  it('parses full listing with all fields', () => {
    const html = '<ul><li>Cena: 250.000 €</li><li>Površina: 65 m²</li><li>Sobe: 3</li><li>Sprat: 4/7</li><li>Lokacija: Novi Sad</li></ul>';
    const result = parseRealEstateListing(html);
    expect(result).toEqual({
      price: 250000,
      area: 65,
      rooms: 3,
      floor: 4,
      totalFloors: 7,
      location: 'Novi Sad',
    });
  });

  it('parses garsonjera with prizemlje', () => {
    const html = '<div>Cena: 120.000 €</div><div>garsonjera</div><div>Prizemlje</div><div>50m2</div>';
    const result = parseRealEstateListing(html);
    expect(result).toEqual({
      price: 120000,
      area: 50,
      rooms: 1,
      floor: 0,
      totalFloors: null,
      location: null,
    });
  });

  it('parses with alternative price, area, rooms, floor/totalFloors', () => {
    const html = '<span>85 000 €</span><span>45 m²</span><span>2 sobe</span><span>1. od 5</span>';
    const result = parseRealEstateListing(html);
    expect(result).toEqual({
      price: 85000,
      area: 45,
      rooms: 2,
      floor: 1,
      totalFloors: 5,
      location: null,
    });
  });

  it('returns all nulls when no data found', () => {
    const html = '<p>Kontaktirajte nas za cenu</p>';
    const result = parseRealEstateListing(html);
    expect(result).toEqual({
      price: null,
      area: null,
      rooms: null,
      floor: null,
      totalFloors: null,
      location: null,
    });
  });
});
