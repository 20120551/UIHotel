import { storage } from "@lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export default async function UploadImage(img) {
    if (img == null) return null;

    const imageRef = ref(storage, `images/${img.name + v4()}`);

    // uploadBytes(imageRef, img)
    // .then((url) => {
    //     getDownloadURL(imageRef)
    //     .then((url) => {
    //         console.log(url);
    //         return url;
    //     })
    //     .catch((e) => {
    //         console.log("upload img failed!");
    //         return null;
    //     })
    // })
    // .catch((e) => {return null});

    await uploadBytes(imageRef, img);

    try {
        return await getDownloadURL(imageRef);
    } catch (error) {
        return null;
    }
}