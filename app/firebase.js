import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs, doc, updateDoc, addDoc, getDoc, deleteDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function loginUser(email, password) {
    const auth = getAuth();

    try {
        const userE = await signInWithEmailAndPassword(auth, email, password);
        const token = await userE.user.getIdToken();

        storeToken(token);
        return(true);       
    } catch {
        return(false);
    }
}

function storeToken(token) {
    sessionStorage.setItem("token", token);
}

async function getToken() {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("token");
  }
}


async function getRecipes() {
    try {
        const recipesCollection = collection(db, "recipes");
        const snapshot = await getDocs(recipesCollection);
        const recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return recipes;
    } catch (error) {
        return null;
    }
}

async function createRecipe(recipeData) {
  try {
    const recipesCollection = collection(db, "recipes");
    await addDoc(recipesCollection, recipeData);
    return true;
  } catch (error) {
    return false;
  }
}

async function updateRecipe(updatedData, id) {
    const token = await getToken();

    try {
        const recipeDoc = doc(db, "recipes", id);
        await updateDoc(recipeDoc, {
            ...updatedData,
            token,
        });
        return true;
    } catch (error) {
        return false;
    }
}

async function deleteRecipe(id) {
  const token = await getToken();

  try {
      const recipeDoc = doc(db, "recipes", id);
      await deleteDoc(recipeDoc, {
          token,
      });
      return true;
  } catch (error) {
      return false;
  }
}


export { app, auth, db, updateRecipe, deleteRecipe, getRecipes, createRecipe, loginUser, getToken, };
