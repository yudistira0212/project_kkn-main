"use client";

import app, { storage } from "@/app/lib/firebase/init";
import axios from "axios";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Button } from "flowbite-react";
import { useState } from "react";

// const storage = getStorage(app);
const PageBerita = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const dataBerita = {
      title: "",
      content: "",
      comments: "",
      imgUrls: [] as string[],
    };

    try {
      let imgUrls: string[] = [];
      // Upload gambar 1
      const img1 = formData.get("img1") as File;
      if (img1) {
        const img1Ref = ref(storage, `berita/${img1.name}`);
        await uploadBytes(img1Ref, img1);
        const imgUrl1 = await getDownloadURL(img1Ref);
        imgUrls.push(imgUrl1);
      }

      // Upload gambar 2
      const img2 = formData.get("img2") as File;
      if (img2) {
        const img2Ref = ref(storage, `berita/${img2.name}`);
        await uploadBytes(img2Ref, img2);
        const imgUrl2 = await getDownloadURL(img2Ref);
        imgUrls.push(imgUrl2);
      }

      // Upload gambar 3
      const img3 = formData.get("img3") as File;
      if (img3) {
        const img3Ref = ref(storage, `berita/${img3.name}`);
        await uploadBytes(img3Ref, img3);
        const imgUrl3 = await getDownloadURL(img3Ref);
        imgUrls.push(imgUrl3);
      }

      // Tambahkan URL gambar ke dataBerita
      dataBerita.imgUrls = imgUrls;

      // Kirim dataBerita ke API
      const result = await axios.post("/api/berita/create-berita", dataBerita);

      console.log({ result });
    } catch (error) {
      console.log("submit data error : ", error);
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input type="text" name="title" />
        <input type="text" name="content" />
        <input type="file" name="img1" />
        <input type="file" name="img2" />
        <input type="file" name="img3" />
        <input type="text" name="coments" />
        <Button type="submit" /* disabled={isSubmitting} */>Submit</Button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default PageBerita;
