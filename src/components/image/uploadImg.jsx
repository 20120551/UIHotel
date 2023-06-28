import { useDropzone } from 'react-dropzone';

export default function UploadImgComponent({ img, previewImg }) {
    const [image, setImage] = img;
    const [previewImage, setPreviewImage] = previewImg;

    const onDrop = (acceptedFiles) => {
        setImage(acceptedFiles[0]);
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(acceptedFiles[0]);
      };

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({onDrop});

    const files = acceptedFiles.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));
    
    return (
      <div>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drop or choose image</p>
        </div>
        {previewImage && <img src={previewImage} alt="Preview" />}
        <ul>{files}</ul>
      </div>
    );
}