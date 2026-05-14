import { prisma } from '../config/prisma.configs.js';

const testUserEmail = 'demo@example.com';

const sampleProperties = [
  // FOR SALE
  {
    title: 'Luxury Villa in Santorini',
    description: 'Stunning white-washed villa with caldera views, perfect for a vacation home or investment',
    price: 1500000,
    address: 'Oia Road 123',
    city: 'Santorini',
    region: 'South Aegean',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077189670-ba3e7458af70?w=800',
    images: [],
    facilities: { pool: true, garden: true, parking: true, airConditioning: true },
    listingType: 'sale',
    propertyType: 'villa',
    area: 350,
    bedrooms: 4,
    bathrooms: 3,
    yearBuilt: 2018,
    userEmail: testUserEmail,
  },
  {
    title: 'Modern Apartment in Mykonos',
    description: 'Contemporary apartment in the heart of Mykonos town, ideal for living or seasonal rental',
    price: 850000,
    address: 'Main Street 456',
    city: 'Mykonos',
    region: 'South Aegean',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1567971502209-56b08ee278d7?w=800',
    images: [],
    facilities: { elevator: true, gym: false, parking: false, airConditioning: true },
    listingType: 'sale',
    propertyType: 'apartment',
    area: 120,
    bedrooms: 2,
    bathrooms: 2,
    yearBuilt: 2020,
    userEmail: testUserEmail,
  },
  {
    title: 'Traditional House in Crete',
    description: 'Charming traditional stone house in the Cretan countryside with olive grove',
    price: 450000,
    address: 'Village Road 789',
    city: 'Chania',
    region: 'Crete',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
    images: [],
    facilities: { garden: true, parking: true, pool: false, airConditioning: false },
    listingType: 'sale',
    propertyType: 'house',
    area: 200,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 1995,
    userEmail: testUserEmail,
  },
  
  // FOR RENT
  {
    title: 'Cozy Studio Apartment - Athens',
    description: 'Perfect starter apartment in central Athens, close to metro and shops',
    price: 800,
    address: 'Syntagma 321',
    city: 'Athens',
    region: 'Attica',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    images: [],
    facilities: { kitchenette: true, parking: false, airConditioning: true, wifi: true },
    listingType: 'rent',
    propertyType: 'studio',
    area: 45,
    bedrooms: 0,
    bathrooms: 1,
    yearBuilt: 2015,
    userEmail: testUserEmail,
  },
  {
    title: 'Beachfront Villa - Crete',
    description: 'Beautiful beachfront villa with direct beach access, perfect for summer vacations',
    price: 2500,
    address: 'Beach Road 111',
    city: 'Heraklion',
    region: 'Crete',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    images: [],
    facilities: { pool: true, garden: true, parking: true, beach: true },
    listingType: 'rent',
    propertyType: 'villa',
    area: 300,
    bedrooms: 5,
    bathrooms: 4,
    yearBuilt: 2019,
    userEmail: testUserEmail,
  },
  {
    title: 'Modern Apartment - Thessaloniki',
    description: 'Spacious modern apartment with all amenities, near the waterfront',
    price: 1200,
    address: 'Waterfront Ave 555',
    city: 'Thessaloniki',
    region: 'Central Macedonia',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    images: [],
    facilities: { elevator: true, gym: true, parking: true, airConditioning: true },
    listingType: 'rent',
    propertyType: 'apartment',
    area: 140,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 2021,
    userEmail: testUserEmail,
  },
  {
    title: 'Family House - Peloponnese',
    description: 'Spacious family home perfect for long-term rent, great for families',
    price: 1500,
    address: 'Mountain View 222',
    city: 'Nafplio',
    region: 'Peloponnese',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570129477492-45ec003aafea?w=800',
    images: [],
    facilities: { garden: true, parking: true, pool: true, airConditioning: true },
    listingType: 'rent',
    propertyType: 'house',
    area: 250,
    bedrooms: 4,
    bathrooms: 3,
    yearBuilt: 2010,
    userEmail: testUserEmail,
  },
];

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // Create or get test user
    const user = await prisma.user.upsert({
      where: { email: testUserEmail },
      update: {},
      create: {
        email: testUserEmail,
        name: 'Demo User',
      },
    });

    console.log(`👤 User created/updated: ${user.email}`);

    // Clear existing residencies for clean seed
    await prisma.residency.deleteMany({
      where: { userEmail: testUserEmail },
    });

    // Create sample properties
    for (const property of sampleProperties) {
      await prisma.residency.create({
        data: property,
      });
    }

    console.log(`✅ Created ${sampleProperties.length} sample properties`);
    console.log('🎉 Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
