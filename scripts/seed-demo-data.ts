import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs } from 'firebase/firestore';
import * as dotenv from 'dotenv';
import { mockProducts } from '../src/lib/mock/products.js';
import { mockCategories } from '../src/lib/mock/categories.js';
import { mockIndustries } from '../src/lib/mock/industries.js';
import { mockProcess as mockProcessSteps } from '../src/lib/mock/process.js';
import { mockPartners } from '../src/lib/mock/partners.js';
import { navigationData as mockNavigation } from '../src/lib/mock/navigation.js';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

if (!firebaseConfig.projectId) {
  console.error("Missing Firebase configuration. Check your .env file.");
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedCollection(collectionName: string, data: any[]) {
  console.log(`Seeding ${collectionName}...`);
  const colRef = collection(db, collectionName);
  
  // Basic safety check: if we already have some items, let's not double-seed blindly
  const existingDocs = await getDocs(colRef);
  if (!existingDocs.empty) {
    console.log(`Collection ${collectionName} already has data. Skipping to avoid duplicates.`);
    return;
  }

  for (const item of data) {
    const docId = item.id || Math.random().toString(36).substr(2, 9);
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, item);
  }
  console.log(`Seeded ${data.length} items to ${collectionName}.`);
}

async function main() {
  try {
    console.log("Starting Firebase Demo Data Seed...");
    await seedCollection('productCategories', mockCategories);
    
    // The instructions say 30-40 demo products. Right now mockProducts only has ~6. 
    // We will expand mockProducts in another step, or generate them here. 
    // Let's use the mockProducts we have for now, we'll update mockProducts separately.
    await seedCollection('products', mockProducts);
    await seedCollection('industries', mockIndustries);
    await seedCollection('processSteps', mockProcessSteps);
    await seedCollection('partners', mockPartners);
    await seedCollection('navigation', mockNavigation);
    
    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
}

main();
