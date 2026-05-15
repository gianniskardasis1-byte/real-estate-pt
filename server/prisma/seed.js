import { prisma } from '../config/prisma.configs.js';
import { seedMockProperties } from './SeedMockData.js';

const testUserEmail = 'demo@example.com';

const defaultFacilities = {
  parking: false,
  airConditioning: false,
  garden: false,
  pool: false,
  balcony: false,
  elevator: false,
  furnished: false,
  storage: false,
};

const mapProperty = (property) => {
  const facilities = property.facilities && typeof property.facilities === 'object'
    ? property.facilities
    : { ...defaultFacilities };

  const images = Array.isArray(property.images) && property.images.length > 0
    ? property.images
    : property.image
      ? [property.image]
      : [];

  return {
    title: property.title,
    description: property.description,
    price: property.price,
    address: property.address,
    city: property.city,
    region: property.region ?? null,
    country: property.country ?? 'Greece',
    image: property.image ?? null,
    images,
    facilities,
    listingType: property.listingType ?? 'sale',
    propertyType: property.propertyType ?? 'apartment',
    area: property.area ?? null,
    bedrooms: property.bedrooms ?? null,
    bathrooms: property.bathrooms ?? null,
    yearBuilt: property.yearBuilt ?? null,
    userEmail: testUserEmail,
  };
};

async function seed() {
  try {
    console.log('Seeding database...');

    // Create or get test user
    const user = await prisma.user.upsert({
      where: { email: testUserEmail },
      update: {},
      create: {
        email: testUserEmail,
        name: 'Demo User',
        bookedVisits: [],
        favResidenciesID: [],
      },
    });

    console.log(`User created/updated: ${user.email}`);

    // Clear existing residencies for clean seed
    await prisma.residency.deleteMany();

    const sampleProperties = seedMockProperties.map(mapProperty);

    await prisma.residency.createMany({
      data: sampleProperties,
    });

    console.log(`Created ${sampleProperties.length} sample properties`);
    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
