import { auth, db } from '../firebase/config';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
  provider: string;
  createdAt: any;
  updatedAt: any;
  status: 'approved' | 'pending' | 'disabled';
  lastLoginAt: any;
}

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const authService = {
  async signInWithGoogle() {
    if (!auth) throw new Error('Firebase Auth is not initialized');
    
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, googleProvider);
      await this.handleUserAfterSignIn(result.user);
      return result.user;
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Bạn đã đóng cửa sổ đăng nhập.');
      } else if (error.code === 'auth/popup-blocked') {
        throw new Error('Cửa sổ đăng nhập bị chặn. Vui lòng cho phép popup.');
      } else if (error.code === 'auth/network-request-failed') {
        throw new Error('Không thể kết nối. Vui lòng kiểm tra mạng và thử lại.');
      } else {
        throw new Error('Đăng nhập thất bại. Vui lòng thử lại sau.');
      }
    }
  },

  async handleUserAfterSignIn(user: FirebaseUser) {
    if (!db) return;
    
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      // Existing user: only update non-business fields
      await setDoc(userRef, {
        lastLoginAt: serverTimestamp(),
        photoURL: user.photoURL,
        displayName: user.displayName || user.email?.split('@')[0], // Fallback if no display name
        updatedAt: serverTimestamp()
      }, { merge: true });
    } else {
      // New user: create basic profile with pending status
      const newUserProfile: UserProfile = {
        uid: user.uid,
        name: user.displayName || user.email?.split('@')[0] || 'User',
        email: user.email,
        photoURL: user.photoURL,
        provider: 'google',
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLoginAt: serverTimestamp()
      };
      await setDoc(userRef, newUserProfile);
    }
  },

  async signOut() {
    if (!auth) return;
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out', error);
      throw new Error('Đăng xuất thất bại.');
    }
  },

  onAuthStateChanged(callback: (user: FirebaseUser | null) => void) {
    if (!auth) return () => {};
    return onAuthStateChanged(auth, callback);
  }
};
