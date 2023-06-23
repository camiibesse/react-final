import { initializeApp } from "firebase/app";
import {getFirestore,collection,getDocs,doc,getDoc,query,where,addDoc,orderBy,writeBatch} from "firebase/firestore";
import products from '../data/juegos';


const firebaseConfig = {
  apiKey: "AIzaSyBJoBDIQlOxxg2a-mjOlavsUbt2QIdvfSc",
  authDomain: "cami-besse-react.firebaseapp.com",
  projectId: "cami-besse-react",
  storageBucket: "cami-besse-react.appspot.com",
  messagingSenderId: "476662025199",
  appId: "1:476662025199:web:f1cacb92d3f16c315f441a"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);



export async function getData() {
  const productsCollectionRef = collection(db, "products");

  const q = query(productsCollectionRef, orderBy("index"));
  const productsSnapshot = await getDocs(q);
  const arrayDocs = productsSnapshot.docs;

  const dataDocs = arrayDocs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return dataDocs;
}


export async function getItemData(idUrl) {
  const docRef = doc(db, "products", idUrl);
  const docSnap = await getDoc(docRef);
  return { id: docSnap.id, ...docSnap.data() };
}

export async function getCategoryData(idCategory) {
 
  const productsCollectionRef = collection(db, "products");
  const q = query(productsCollectionRef, where("category", "==", idCategory));
  const productsSnapshot = await getDocs(q);
  const arrayDocs = productsSnapshot.docs;
  const dataDocs = arrayDocs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return dataDocs;
}

export async function createOrder(data) {
  const ordersCollectionRef = collection(db, "orders");
  const response = await addDoc(ordersCollectionRef, data);
  return response.id;
}
export async function createOrderWithStockUpdate(data) {
  const ordersCollectionRef = collection(db, "orders");
  const batch = writeBatch(db);
  const { items } = data;

  for (let itemInCart of items) {
    const refDoc = doc(db, "products", itemInCart.id);
    const docSnap = await getDoc(refDoc);
    const { stock } = docSnap.data();

    const stockToUpdate = stock - itemInCart.count;
    if (stockToUpdate < 0) {
      throw new Error(`No hay stock suficiente del producto: ${itemInCart.id}`);
    } else {
      const docRef = doc(db, "products", itemInCart.id);
      batch.update(docRef, { stock: stockToUpdate });
    }
  }

  await batch.commit();
  const response = await addDoc(ordersCollectionRef, data);
  return response.id;
}

export async function exportDataWithBatch() {
  const batch = writeBatch(db);

  const collectionRef = collection(db, "products");

  for (let item of products) {
    item.index = item.id;
    delete item.id;

    const docRef = doc(collectionRef);
    batch.set(docRef, item);
  }

  await batch.commit();
}



