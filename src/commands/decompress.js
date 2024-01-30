import zlib from "zlib"; 
import checkPathExists from "../utils/checkPathExists.js";
import fs from "fs";
import { pipeline } from "stream/promises"

const decompress = async(pathToSourceFile, pathToDestFile) => {
  try{
    if(await checkPathExists(pathToSourceFile) === false) throw new Error();
    const brotli = zlib.createBrotliDecompress();
    const source = fs.createReadStream(pathToSourceFile);
    const dest = fs.createWriteStream(pathToDestFile);
    await pipeline(source, brotli, dest);
    console.log("File was successfully decompressed!")
  } catch{
    console.log("Operation failed");
  }
}

export default decompress;