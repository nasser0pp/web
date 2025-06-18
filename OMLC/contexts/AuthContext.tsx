import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Auth, 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword, // Added
  signInWithEmailAndPassword // Added
} from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Use the initialized auth instance
import { UI_TEXTS } from '../constants'; 
import { useLanguage } from './LanguageContext';

interface AuthContextType {
  currentUser: User | null;
  loadingAuth: boolean;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmailPassword: (email: string, password: string) => Promise<User | null>; // Added
  signInWithEmailPassword: (email: string, password: string) => Promise<User | null>; // Added
  logout: () => Promise<void>;
  authError: string | null;
  setAuthError: (error: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [authError, setAuthErrorState] = useState<string | null>(null); // Renamed internal state setter
  const { t } = useLanguage(); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoadingAuth(false);
      if (user) setAuthErrorState(null); // Clear previous errors on successful auth state change
    }, (error) => {
      console.error("Auth state change error:", error);
      setAuthErrorState(t({en: "Error checking authentication status.", ar: "خطأ في التحقق من حالة المصادقة."}));
      setLoadingAuth(false);
    });

    return unsubscribe; 
  }, [t]);
  
  const setAuthError = (error: string | null) => {
    setAuthErrorState(error);
  }

  const signInWithGoogle = async () => {
    setLoadingAuth(true);
    setAuthErrorState(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Google Sign-In error:", error);
      let message = t({en: "Failed to sign in with Google. Please try again.", ar: "فشل تسجيل الدخول باستخدام جوجل. يرجى المحاولة مرة أخرى."});
      if (error.code === 'auth/popup-closed-by-user') {
        message = t({en: "Sign-in cancelled. The pop-up was closed.", ar: "تم إلغاء تسجيل الدخول. تم إغلاق النافذة المنبثقة."});
      } else if (error.code === 'auth/cancelled-popup-request') {
        message = t({en: "Sign-in cancelled. Multiple pop-ups were opened.", ar: "تم إلغاء تسجيل الدخول. تم فتح نوافذ منبثقة متعددة."});
      }
      setAuthErrorState(message);
      setCurrentUser(null); 
    } finally {
       // setLoadingAuth(false); // onAuthStateChanged handles this
    }
  };

  const signUpWithEmailPassword = async (email: string, password: string): Promise<User | null> => {
    setLoadingAuth(true);
    setAuthErrorState(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will set currentUser
      return userCredential.user;
    } catch (error: any) {
      console.error("Email/Password Sign-Up error:", error);
      // Firebase provides specific error codes that can be translated
      let message = t({en: "Registration failed. Please try again.", ar: "فشل التسجيل. يرجى المحاولة مرة أخرى."});
      if (error.code === 'auth/email-already-in-use') {
        message = t({en: "This email address is already in use.", ar: "عنوان البريد الإلكتروني هذا مستخدم بالفعل."});
      } else if (error.code === 'auth/weak-password') {
        message = t({en: "Password is too weak. Please choose a stronger password.", ar: "كلمة المرور ضعيفة جداً. يرجى اختيار كلمة مرور أقوى."});
      } else if (error.code === 'auth/invalid-email') {
        message = t({en: "The email address is not valid.", ar: "عنوان البريد الإلكتروني غير صالح."});
      }
      setAuthErrorState(message);
      return null;
    } finally {
      // setLoadingAuth(false); // onAuthStateChanged handles this
    }
  };
  
  const signInWithEmailPassword = async (email: string, password: string): Promise<User | null> => {
    setLoadingAuth(true);
    setAuthErrorState(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will set currentUser
      return userCredential.user;
    } catch (error: any) {
      console.error("Email/Password Sign-In error:", error);
      let message = t({en: "Login failed. Please check your credentials.", ar: "فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك."});
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        message = t({en: "Invalid email or password.", ar: "البريد الإلكتروني أو كلمة المرور غير صحيحة."});
      } else if (error.code === 'auth/invalid-email') {
         message = t({en: "The email address is not valid.", ar: "عنوان البريد الإلكتروني غير صالح."});
      }
      setAuthErrorState(message);
      return null;
    } finally {
      // setLoadingAuth(false); // onAuthStateChanged handles this
    }
  };

  const logout = async () => {
    // setLoadingAuth(true); // Not strictly needed as onAuthStateChanged handles UI update
    setAuthErrorState(null);
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
      setAuthErrorState(t({en:"Failed to log out. Please try again.", ar: "فشل تسجيل الخروج. يرجى المحاولة مرة أخرى."}));
    } 
    // finally { setLoadingAuth(false); } // onAuthStateChanged handles this
  };

  const value = {
    currentUser,
    loadingAuth,
    signInWithGoogle,
    signUpWithEmailPassword,
    signInWithEmailPassword,
    logout,
    authError,
    setAuthError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
