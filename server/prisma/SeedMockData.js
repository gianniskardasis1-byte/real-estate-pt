// Seed mock data for development - properties for rent and sale
const baseProperties = [
  // FOR SALE
  {
    id: '1',
    title: 'Luxury Villa in Santorini',
    description: 'Stunning white-washed villa with caldera views, perfect for a vacation home or investment',
    price: 1500000,
    address: 'Oia Road 123',
    city: 'Santorini',
    region: 'South Aegean',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077189670-ba3e7458af70?w=800',
    listingType: 'sale',
    propertyType: 'villa',
    area: 350,
    bedrooms: 4,
    bathrooms: 3,
    yearBuilt: 2018,
  },
  {
    id: '2',
    title: 'Modern Apartment in Mykonos',
    description: 'Contemporary apartment in the heart of Mykonos town, ideal for living or seasonal rental',
    price: 850000,
    address: 'Main Street 456',
    city: 'Mykonos',
    region: 'South Aegean',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1567971502209-56b08ee278d7?w=800',
    listingType: 'sale',
    propertyType: 'apartment',
    area: 120,
    bedrooms: 2,
    bathrooms: 2,
    yearBuilt: 2020,
  },
  {
    id: '3',
    title: 'Traditional House in Crete',
    description: 'Charming traditional stone house in the Cretan countryside with olive grove',
    price: 450000,
    address: 'Village Road 789',
    city: 'Chania',
    region: 'Crete',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570129477492-45ec003aafea?w=800',
    listingType: 'sale',
    propertyType: 'house',
    area: 200,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 1995,
  },

  // FOR RENT
  {
    id: '4',
    title: 'Cozy Studio Apartment - Athens',
    description: 'Perfect starter apartment in central Athens, close to metro and shops',
    price: 800,
    address: 'Syntagma 321',
    city: 'Athens',
    region: 'Attica',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    listingType: 'rent',
    propertyType: 'studio',
    area: 45,
    bedrooms: 0,
    bathrooms: 1,
    yearBuilt: 2015,
  },
  {
    id: '5',
    title: 'Beachfront Villa - Crete',
    description: 'Beautiful beachfront villa with direct beach access, perfect for summer vacations',
    price: 2500,
    address: 'Beach Road 111',
    city: 'Heraklion',
    region: 'Crete',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570129477492-45ec003aafea?w=800',
    listingType: 'rent',
    propertyType: 'villa',
    area: 300,
    bedrooms: 5,
    bathrooms: 4,
    yearBuilt: 2019,
  },
  {
    id: '6',
    title: 'Modern Apartment - Thessaloniki',
    description: 'Spacious modern apartment with all amenities, near the waterfront',
    price: 1200,
    address: 'Waterfront Ave 555',
    city: 'Thessaloniki',
    region: 'Central Macedonia',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    listingType: 'rent',
    propertyType: 'apartment',
    area: 140,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 2021,
  },
  {
    id: '7',
    title: 'Family House - Peloponnese',
    description: 'Spacious family home perfect for long-term rent, great for families',
    price: 1500,
    address: 'Mountain View 222',
    city: 'Nafplio',
    region: 'Peloponnese',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570129477492-45ec003aafea?w=800',
    listingType: 'rent',
    propertyType: 'house',
    area: 250,
    bedrooms: 4,
    bathrooms: 3,
    yearBuilt: 2010,
  },
  {
    id: '8',
    title: 'Seaside House in Rethymno, Crete',
    description: 'Beautiful coastal house with sea views and private patio, perfect for a Mediterranean lifestyle',
    price: 650000,
    address: 'Coastal Street 456',
    city: 'Rethymno',
    region: 'Crete',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
    listingType: 'sale',
    propertyType: 'house',
    area: 280,
    bedrooms: 4,
    bathrooms: 3,
    yearBuilt: 2005,
  },
  {
    id: '9',
    title: 'Charming Cretan House for Rent',
    description: 'Authentic Cretan stone house with traditional architecture and modern amenities, ideal for long-term rental',
    price: 1800,
    address: 'Old Town Lane 789',
    city: 'Heraklion',
    region: 'Crete',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1512917774080-9b274b3057d5?w=800',
    listingType: 'rent',
    propertyType: 'house',
    area: 220,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 2012,
  },
];

const cityRegionPairs = [
  { city: 'Athens', region: 'Attica' },
  { city: 'Thessaloniki', region: 'Central Macedonia' },
  { city: 'Patras', region: 'West Greece' },
  { city: 'Heraklion', region: 'Crete' },
  { city: 'Larissa', region: 'Thessaly' },
  { city: 'Volos', region: 'Thessaly' },
  { city: 'Ioannina', region: 'Epirus' },
  { city: 'Chania', region: 'Crete' },
  { city: 'Chalcis', region: 'Central Greece' },
  { city: 'Serres', region: 'Central Macedonia' },
  { city: 'Alexandroupoli', region: 'East Macedonia & Thrace' },
  { city: 'Xanthi', region: 'East Macedonia & Thrace' },
  { city: 'Katerini', region: 'Central Macedonia' },
  { city: 'Kalamata', region: 'Peloponnese' },
  { city: 'Kavala', region: 'East Macedonia & Thrace' },
  { city: 'Rhodes', region: 'South Aegean' },
  { city: 'Corfu', region: 'Ionian Islands' },
  { city: 'Agrinio', region: 'West Greece' },
  { city: 'Trikala', region: 'Thessaly' },
  { city: 'Lamia', region: 'Central Greece' },
  { city: 'Mykonos', region: 'South Aegean' },
  { city: 'Santorini', region: 'South Aegean' },
  { city: 'Nafplio', region: 'Peloponnese' },
  { city: 'Zakynthos', region: 'Ionian Islands' },
  { city: 'Lefkada', region: 'Ionian Islands' },
];

const streetNames = [
  'Ermou',
  'Patission',
  'Tsimiski',
  'Vasilissis Sofias',
  'Egnatia',
  'Navarinou',
  'Leoforos Kifisias',
  'Panepistimiou',
  'Mitropoleos',
  'Agias Sofias',
  'Ippokratous',
  'Athinas',
  'Stadiou',
  'Syngrou',
  'Vouliagmenis',
  'Leoforos Nikis',
  'Kolokotroni',
  'Kountouriotou',
  'Dimokratias',
  'Akti Themistokleous',
  'Agiou Dimitriou',
  'Kanari',
  'Sokratous',
  'Karaiskaki',
  'Filikon',
];

const titleAdjectives = [
  'Modern',
  'Bright',
  'Spacious',
  'Cozy',
  'Elegant',
  'Renovated',
  'Family-Friendly',
  'Contemporary',
  'Stylish',
  'Quiet',
];

const descIntros = [
  'Well-lit interior with practical layout.',
  'Comfortable layout with generous natural light.',
  'Renovated space with a fresh modern feel.',
  'Quiet home with efficient use of space.',
  'Bright rooms and clean finishes throughout.',
  'Functional layout with a welcoming atmosphere.',
];

const descFeatures = [
  'Close to public transport and everyday services.',
  'Steps from local cafes and markets.',
  'Easy access to main roads and the city center.',
  'Near parks, schools, and neighborhood shops.',
  'Short walk to the waterfront promenade.',
  'Convenient access to universities and offices.',
];

const propertyTypes = ['apartment', 'house', 'villa', 'studio', 'land', 'commercial'];
const listingTypes = ['sale', 'rent'];

const propertyTypeLabels = {
  apartment: 'Apartment',
  house: 'House',
  villa: 'Villa',
  studio: 'Studio Apartment',
  land: 'Plot of Land',
  commercial: 'Commercial Space',
};

const buildFacilities = (index, propertyType, listingType) => ({
  parking: index % 2 === 0,
  airConditioning: index % 3 !== 0,
  garden: propertyType === 'house' || propertyType === 'villa',
  pool: propertyType === 'villa' && index % 3 === 0,
  balcony: propertyType !== 'land',
  elevator: propertyType === 'apartment' || propertyType === 'commercial',
  furnished: listingType === 'rent' && index % 4 === 0,
  storage: index % 5 === 0,
});

const GENERATED_COUNT = 110;
const generatedProperties = Array.from({ length: GENERATED_COUNT }, (_, idx) => {
  const index = idx + 1;
  const pair = cityRegionPairs[index % cityRegionPairs.length];
  const propertyType = propertyTypes[index % propertyTypes.length];
  const listingType = listingTypes[index % listingTypes.length];
  const titleAdjective = titleAdjectives[index % titleAdjectives.length];
  const streetName = streetNames[index % streetNames.length];
  const addressNumber = 10 + (index % 180);

  const baseSalePrice = 90000 + (index % 40) * 15000;
  const baseRentPrice = 600 + (index % 25) * 40;
  const typePriceAdjustments = {
    apartment: 80000,
    house: 120000,
    villa: 250000,
    studio: 50000,
    land: 60000,
    commercial: 150000,
  };

  const price = listingType === 'rent'
    ? baseRentPrice + Math.floor(typePriceAdjustments[propertyType] / 200)
    : baseSalePrice + typePriceAdjustments[propertyType];

  const areaByType = {
    apartment: 70 + (index % 20) * 5,
    house: 140 + (index % 25) * 6,
    villa: 220 + (index % 25) * 8,
    studio: 35 + (index % 10) * 3,
    land: 600 + (index % 30) * 25,
    commercial: 90 + (index % 20) * 10,
  };

  const bedroomsByType = {
    apartment: 1 + (index % 3),
    house: 2 + (index % 4),
    villa: 3 + (index % 4),
    studio: 0,
    land: null,
    commercial: null,
  };

  const bathroomsByType = {
    apartment: 1 + (index % 2),
    house: 2 + (index % 3),
    villa: 2 + (index % 3),
    studio: 1,
    land: null,
    commercial: 1 + (index % 2),
  };

  const yearBuilt = propertyType === 'land'
    ? null
    : 1985 + (index % 35);

  const title = `${titleAdjective} ${propertyTypeLabels[propertyType]} in ${pair.city}`;
  const description = `${descIntros[index % descIntros.length]} ${descFeatures[index % descFeatures.length]} ${listingType === 'rent'
    ? 'Ideal for long-term rental.'
    : 'Ideal as a primary residence or investment.'}`;

  return {
    id: `gen-${index}`,
    title,
    description,
    price,
    address: `${streetName} ${addressNumber}`,
    city: pair.city,
    region: pair.region,
    country: 'Greece',
    listingType,
    propertyType,
    area: areaByType[propertyType],
    bedrooms: bedroomsByType[propertyType],
    bathrooms: bathroomsByType[propertyType],
    yearBuilt,
    facilities: buildFacilities(index, propertyType, listingType),
  };
});

export const seedMockProperties = [...baseProperties, ...generatedProperties];
