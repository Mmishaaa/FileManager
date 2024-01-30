import fs from "node:fs/promises";

const checkPathExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

export default checkPathExists;