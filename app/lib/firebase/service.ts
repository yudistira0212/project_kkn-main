import {} from "firebase/app";
import app from "./init";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import bcrypt from "bcrypt";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import firebase from "firebase/compat/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export const retrieveData = async (collectionName: string) => {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return data;
};

export const retrieveDataById = async (collectionName: string, id: string) => {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data;

  return data;
};

// singup simpan di firestore
// export const signUp = async (
//   userData: {
//     email: string;
//     fullName: string;
//     password: string;
//     role?: string;
//   },
//   callback: Function
// ) => {
//   const q = query(
//     collection(firestore, "users"),
//     where("email", "==", userData.email)
//   );

//   const snapshot = await getDocs(q);
//   const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

//   if (data.length > 0) {
//     callback(false, "Email already exists");
//   } else if (!userData.role) {
//     userData.role = "member";
//   }

//   userData.password = await bcrypt.hash(userData.password, 10);

//   await addDoc(collection(firestore, "users"), userData)
//     .then(() => {
//       callback(true, "User registered successfully");
//     })
//     .catch((error) => {
//       callback(false, error.message);
//       console.log(error);
//     });
// };

// membuat user baru
export const createUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      // Gunakan metode updateProfile untuk mengubah displayName
      return updateProfile(user, {
        displayName: fullName,
      });
    })
    .then(() => {
      // UpdateProfile berhasil dilakukan
      console.log("User profile updated successfully");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Tangani kesalahan
      console.error(errorCode, errorMessage);
    });
};

// login user
export const loginUser = async (email: string, password: string) => {
  try {
    // Lakukan proses login dengan Firebase Authentication
    await signInWithEmailAndPassword(auth, email, password).then((user) => {
      // console.log("user", user);
    });
    // Pengguna berhasil login
    console.log("User logged in successfully");
    return true;
  } catch (error: any) {
    console.error("Error during login:", error.message);
    // Login gagal
    throw new Error("Invalid login credentials");
  }
};

// logout user
export const logoutUser = async () => {
  await auth.signOut();
};

// user check user is login
export const checkUser = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      // console.log("user");
      console.log("user services", user?.email);

      resolve(user);
    });
  });
};

//create bertia
export const createBerita = async (
  dataBerita: {
    title: string;
    content: string;
    img1: File;
    img2?: File;
    img3?: File;
    coments?: string;
  },
  callback: Function
) => {
  // Buat referensi ke koleksi "berita" di Firestore
  const beritaCollectionRef = collection(firestore, "berita");

  try {
    // Tambahkan dokumen berita ke Firestore
    const beritaDocRef = await addDoc(beritaCollectionRef, {
      title: dataBerita.title,
      content: dataBerita.content,
      coments: "",
    });

    // Fungsi untuk mengunggah gambar ke Firebase Storage dan mendapatkan URL
    const uploadAndSaveImage = async (img: File, imgNumber: number) => {
      const storageRef = ref(
        storage,
        `berita/${beritaDocRef.id}/img${imgNumber}_${img.name}`
      );
      await uploadBytes(storageRef, img);

      // Dapatkan URL download gambar dari Storage
      const imgUrl = await getDownloadURL(storageRef);

      // Simpan URL dan nama gambar di Firestore
      await updateDoc(beritaDocRef, {
        [`img${imgNumber}`]: imgUrl,
        [`urlImg${imgNumber}`]: `img${imgNumber}_${img.name}`,
      });
    };

    // Simpan gambar 1
    if (dataBerita.img1) {
      await uploadAndSaveImage(dataBerita.img1, 1);
    }

    // Simpan gambar 2
    if (dataBerita.img2) {
      await uploadAndSaveImage(dataBerita.img2, 2);
    }

    // Simpan gambar 3
    if (dataBerita.img3) {
      await uploadAndSaveImage(dataBerita.img3, 3);
    }

    callback(true, "Berita dan gambar berhasil disimpan");
  } catch (error: any) {
    callback(false, error.message);
    console.error(error);
  }
};

// export const updateBerita = async();

// update berita
export const updateBerita = async (
  beritaId: string,
  updatedData: {
    title?: string;
    content?: string;
    img1?: File;
    img2?: File;
    img3?: File;
    coments?: string;
  },
  callback: Function
) => {
  // Referensi ke dokumen berita yang akan diupdate
  const beritaDocRef = doc(firestore, "berita", beritaId);

  try {
    // Update data berita di Firestore
    await updateDoc(beritaDocRef, {
      title: updatedData.title,
      content: updatedData.content,
      coments: updatedData.coments,
    });

    // Fungsi untuk mengunggah dan mengupdate gambar
    const uploadAndUpdateImage = async (img: File, imgNumber: number) => {
      // Hapus gambar lama dari Storage
      const oldImgName = await getDocs(
        query(
          collection(firestore, "berita", beritaId, "imgUrls"),
          where(`urlImg${imgNumber}`, "==", `img${imgNumber}_${img.name}`)
        )
      );
      oldImgName.forEach(async (oldImg) => {
        const storageRef = ref(storage, `berita/${beritaId}/${oldImg.id}`);
        await deleteObject(storageRef);
      });

      // Upload gambar baru ke Storage
      const storageRef = ref(
        storage,
        `berita/${beritaId}/img${imgNumber}_${img.name}`
      );
      await uploadBytes(storageRef, img);

      // Dapatkan URL download gambar dari Storage
      const imgUrl = await getDownloadURL(storageRef);

      // Update URL dan nama gambar di Firestore
      await updateDoc(beritaDocRef, {
        [`img${imgNumber}`]: imgUrl,
        [`urlImg${imgNumber}`]: `img${imgNumber}_${img.name}`,
      });
    };

    // Update gambar 1
    if (updatedData.img1) {
      await uploadAndUpdateImage(updatedData.img1, 1);
    }

    // Update gambar 2
    if (updatedData.img2) {
      await uploadAndUpdateImage(updatedData.img2, 2);
    }

    // Update gambar 3
    if (updatedData.img3) {
      await uploadAndUpdateImage(updatedData.img3, 3);
    }

    callback(true, "Berita berhasil diupdate");
  } catch (error: any) {
    callback(false, error.message);
    console.error(error);
  }
};
