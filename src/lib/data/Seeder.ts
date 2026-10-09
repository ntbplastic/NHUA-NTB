import { db, isFirebaseConfigured } from '../firebase/config';
import { doc, getDoc, setDoc, writeBatch } from 'firebase/firestore';

import { mockProducts } from '../mock/products';
import { mockCategories } from '../mock/categories';
import { mockIndustries } from '../mock/industries';
import { mockProcess } from '../mock/process';
import { mockPartners } from '../mock/partners';
import { navigationData as mockNavigation } from '../mock/navigation';
import { mockCapabilities } from '../mock/capabilities';
import { mockArticles } from '../mock/articles';
import { mockSiteConfig } from '../mock/siteConfig';
import { mockHomepageSections } from '../mock/homepageSections';

export const SEED_VERSION = 'ntb-demo-v1';

export class DataSeeder {
  static async checkSeedStatus() {
    if (!isFirebaseConfigured || !db) return { seeded: false, version: null, counts: null };
    try {
      const docRef = doc(db, 'system', 'seed');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        return { seeded: data.status === 'completed', version: data.version, counts: data.counts || {} };
      }
    } catch (e) {
      console.error("Error checking seed status:", e);
    }
    return { seeded: false, version: null, counts: null };
  }

  static async seedData(forceReset = false) {
    if (!isFirebaseConfigured || !db) return false;

    const status = await this.checkSeedStatus();
    if (!forceReset && status.seeded && status.version === SEED_VERSION) {
      console.log('Data already seeded. Version:', SEED_VERSION);
      return true;
    }

    console.log(`Starting seed: ${SEED_VERSION}${forceReset ? ' (FORCE RESET)' : ''}`);

    try {
      const counts = {
        products: await this.seedCollection('products', mockProducts, forceReset),
        productCategories: await this.seedCollection('productCategories', mockCategories, forceReset),
        industries: await this.seedCollection('industries', mockIndustries, forceReset),
        processSteps: await this.seedCollection('processSteps', mockProcess, forceReset),
        partners: await this.seedCollection('partners', mockPartners, forceReset),
        capabilities: await this.seedCollection('capabilities', mockCapabilities, forceReset),
        articles: await this.seedCollection('articles', mockArticles, forceReset),
        homepageSections: await this.seedCollection('homepageSections', mockHomepageSections, forceReset),
        navigation: await this.seedCollection('navigation', mockNavigation, forceReset, true), // generate nav ids
        siteConfig: await this.seedCollection('siteConfig', [mockSiteConfig], forceReset),
      };

      await setDoc(doc(db, 'system', 'seed'), {
        version: SEED_VERSION,
        status: 'completed',
        seededAt: status.seeded ? undefined : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        counts
      }, { merge: true });

      console.log('Seed completed successfully!', counts);
      return true;
    } catch (error) {
      console.error('Seed failed:', error);
      await setDoc(doc(db, 'system', 'seed'), {
        version: SEED_VERSION,
        status: 'failed',
        error: String(error),
        updatedAt: new Date().toISOString()
      }, { merge: true });
      return false;
    }
  }

  private static async seedCollection(collectionName: string, data: any[], forceReset: boolean, generateId = false) {
    if (!data || data.length === 0) return 0;

    let count = 0;
    const batch = writeBatch(db!);
    let ops = 0;

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const docId = item.id || item.slug || (generateId ? `nav-${i}` : Math.random().toString(36).substring(2, 10));
      const docRef = doc(db!, collectionName, docId);

      if (!forceReset) {
        const existing = await getDoc(docRef);
        if (existing.exists()) {
          count++; // Already exists, count it but don't overwrite
          continue; 
        }
      }

      batch.set(docRef, item, { merge: true });
      count++;
      ops++;

      // Commit batch every 400 ops (limit is 500)
      if (ops >= 400) {
        await batch.commit();
        ops = 0;
      }
    }

    if (ops > 0) {
      await batch.commit();
    }

    return count;
  }
}
