import { useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { useOutletContext } from "react-router";
import { api } from '../../../api/api';
import { BACKEND_URL } from "../../../api/api";

function PhotosStep() {
  const { setIsStepValid, listing, setListing } = useOutletContext();

  const fileList = (listing.images || []).map((img, index) => ({
    name: `image-${index}`,
    status: "done",
    url: `${BACKEND_URL}${img}`,
  }));

  useEffect(() => {
    setIsStepValid(fileList.length > 0);
  }, [fileList.length]);

  const handleUpload = async (options) => {
    const { file, onSuccess, onError } = options;

    try {
      const formData = new FormData();
      formData.append("images", file);

      const res = await api.post("/upload", formData);

      const newImage = res.data.images[0];

      setListing(prev => ({
        ...prev,
        images: [...(prev.images || []), newImage],
      }));

      onSuccess("ok");
    } catch (err) {
      console.error(err);
      onError(err);
    }
  };

  const handleRemove = async (file) => {
    const imagePath = file.uid;

    try {
      await api.delete("/upload", {
        data: { path: imagePath },
      });

      setListing(prev => ({
        ...prev,
        images: prev.images.filter(img => img !== imagePath),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Upload
      listType="picture-card"
      fileList={fileList}
      customRequest={handleUpload}
      onRemove={handleRemove}
      multiple
    >
      {fileList.length >= 8 ? null : (
        <button type="button" style={{ border: 0, background: "none" }}>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
      )}
    </Upload>
  );
}

export default PhotosStep;