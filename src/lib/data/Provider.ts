import { db, isFirebaseConfigured } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

// Mock imports
import { mockProducts } from '../mock/products';
import { mockArticles } from '../mock/articles';
import { mockCategories } from '../mock/categories';
import { mockIndustries } from '../mock/industries';
import { mockProcess } from '../mock/process';
import { mockPartners } from '../mock/partners';
import { navigationData as mockNavigation } from '../mock/navigation';

export class DataProvider {
  static async getProducts() {
    if (isFirebaseConfigured && db) {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        if (!querySnapshot.empty) {
          return querySnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
        }
      } catch (error) {
        console.error("Error fetching products from Firebase, falling back to mock", error);
      }
    }
    return mockProducts;
  }

  static async getCategories() {
    if (isFirebaseConfigured && db) {
      try {
        const querySnapshot = await getDocs(collection(db, 'productCategories'));
        if (!querySnapshot.empty) {
          return querySnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
        }
      } catch (error) {
        console.error("Error fetching categories from Firebase, falling back to mock", error);
      }
    }
    return mockCategories;
  }

  static async getIndustries() {
    if (isFirebaseConfigured && db) {
      try {
        const querySnapshot = await getDocs(collection(db, 'industries'));
        if (!querySnapshot.empty) {
          return querySnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
        }
      } catch (error) {
        console.error("Error fetching industries from Firebase, falling back to mock", error);
      }
    }
    return mockIndustries;
  }

  static async getProcessSteps() {
    if (isFirebaseConfigured && db) {
      try {
        const querySnapshot = await getDocs(collection(db, 'processSteps'));
        if (!querySnapshot.empty) {
          return querySnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
        }
      } catch (error) {
        console.error("Error fetching process steps from Firebase, falling back to mock", error);
      }
    }
    return mockProcess;
  }

  static async getPartners() {
    if (isFirebaseConfigured && db) {
      try {
        const querySnapshot = await getDocs(collection(db, 'partners'));
        if (!querySnapshot.empty) {
          return querySnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
        }
      } catch (error) {
        console.error("Error fetching partners from Firebase, falling back to mock", error);
      }
    }
    return mockPartners;
  }

  static async getNavigation() {
    if (isFirebaseConfigured && db) {
      try {
        const querySnapshot = await getDocs(collection(db, 'navigation'));
        if (!querySnapshot.empty) {
          return querySnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
        }
      } catch (error) {
        console.error("Error fetching navigation from Firebase, falling back to mock", error);
      }
    }
    return mockNavigation;
  }

  static async getArticles() {
    if (isFirebaseConfigured && db) {
      try {
        const querySnapshot = await getDocs(collection(db, 'articles'));
        if (!querySnapshot.empty) {
          return querySnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
        }
      } catch (error) {
        console.error("Error fetching articles from Firebase, falling back to mock", error);
      }
    }
    return mockArticles;
  }

}