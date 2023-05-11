import fs from "fs";
import { lookup } from "mime-types";
import { extname } from "path";

const MAX_FILE_SIZE = 6 * 1024 * 1024; // Максимальный размер файла (в байтах)

const validateFile = async (filePath) => {
  const fileExtension = extname(filePath);
  const mimeType = lookup(fileExtension);
  if (!mimeType || !mimeType.startsWith("image/"))
    return {
      validSuccess: false,
      message: "The file type is not valid. Please upload an image",
    };
  const fileSize = fs.statSync(filePath).size;
  if (fileSize > MAX_FILE_SIZE)
    return {
      validSuccess: false,
      message: "The maximum file size has been exceeded.",
    };
  return {
    validSuccess: true,
    message: "Successfully validated the file",
  };
};

export default validateFile;
