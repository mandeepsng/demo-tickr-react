import React from 'react';
import {
  FaFile,
  FaFilePdf,
  FaFileWord,
  FaFileImage,
} from 'react-icons/fa';

const FileDisplay = ({ fileAttachment, size = 24 }) => {
  if (!fileAttachment) {
    return null;
  }

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const commonProps = { size };
  const { file_path } = fileAttachment;
  console.log(file_path);


  const adjustedFilePath = file_path.startsWith('/') ? file_path.substring(1) : file_path;


  const full_path = `${API_BASE_URL}${adjustedFilePath}`;

  // Function to get the file extension from the file path
  const getFileExtension = (filePath) => {
    return filePath.split('.').pop().toLowerCase();
  };

  // Determine the file extension
  const fileExtension = getFileExtension(file_path);

  // Choose the appropriate icon based on the file extension
  const FileIcon = () => {
    switch (fileExtension) {
      case 'pdf':
        return <FaFilePdf {...commonProps} />;
      case 'doc':
      case 'docx':
        return <FaFileWord {...commonProps}/>;
      case 'txt':
        return <FaFile {...commonProps}/>;
      case 'png':
      case 'jpg':
      case 'jpeg':
        return <FaFileImage {...commonProps}/>;
      default:
        return <FaFile {...commonProps}/>;
    }
  };

  return (
    <div>
      <a href={full_path} target="_blank" rel="noopener noreferrer">
        <FileIcon {...commonProps} />
        <span>{" "}</span>
      </a>
    </div>
  );
};

export default FileDisplay;
