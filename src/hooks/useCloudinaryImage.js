import axios from "axios";
import { useState } from "react";

const useCloudinaryImage = () => {
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const onSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };
  const handleUploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", process.env.REACT_APP_PRESET_NAME);
    data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
    data.append("folder", "monkey-blogging");
    try {
      const resp = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        data
      );
      return { url: resp.data.url, public_id: resp.data.public_id };
    } catch (err) {
      console.log("error : ", err);
    }
  };
  const handleDeleteImage = () => {
    setImage("");
    setPreviewImage("");
  };
  return {
    onSelectImage,
    handleUploadImage,
    handleDeleteImage,
    previewImage,
  };
};

export default useCloudinaryImage;
