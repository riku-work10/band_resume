import { useState } from "react";

export const useS3Upload = (userId, initialProfileImage = "") => {
  const [profileImage, setProfileImage] = useState(initialProfileImage);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // S3アップロード関数
  const uploadImage = async () => {
    if (!selectedFile) return;
    try {
      setIsUploading(true);

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/${process.env.REACT_APP_API_VERSION}/s3/presigned_url?user_id=${userId}&filename=${selectedFile.name}&content_type=${selectedFile.type}`
      );
      const { url, file_url } = await res.json();

      const uploadRes = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": selectedFile.type },
        body: selectedFile,
      });

      if (!uploadRes.ok) throw new Error("S3アップロードに失敗しました");

      setProfileImage(file_url);
      setSelectedFile(null);
      alert("画像アップロード成功！");
      return file_url;
    } catch (err) {
      alert(err.message);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  // S3オブジェクト削除関数
  const deleteImage = async () => {
    if (!profileImage) return;

    const bucketUrl = `https://${process.env.REACT_APP_S3_BUCKET}.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/`;
    const objectKey = profileImage.startsWith(bucketUrl)
      ? profileImage.substring(bucketUrl.length)
      : null;

    if (!objectKey) {
      alert("画像のキーが取得できません");
      return;
    }

    if (!window.confirm("画像を削除しますか？")) return;

    try {
      const url = new URL(
        `${process.env.REACT_APP_API_URL}/api/${process.env.REACT_APP_API_VERSION}/s3/delete_object`
      );
      url.searchParams.append("object_key", objectKey);

      const res = await fetch(url.toString(), { method: "DELETE" });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "画像削除に失敗しました");
      }

      setProfileImage("");
      setSelectedFile(null);
      alert("画像を削除しました");
    } catch (err) {
      alert(err.message);
    }
  };

  return {
    profileImage,
    selectedFile,
    setSelectedFile,
    isUploading,
    uploadImage,
    deleteImage,
  };
};
