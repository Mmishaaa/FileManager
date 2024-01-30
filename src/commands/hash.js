import { createHash } from "crypto";
import { createReadStream } from "fs";
import checkPathExists from "../utils/checkPathExists.js";

const calculateHashForFile = async(pathToFile) => {
  try {
    if(await checkPathExists(pathToFile) === false) throw new Error();
    const hash = createHash('sha256');
    const input = createReadStream(pathToFile);
    input.on('readable', () => {
      const data = input.read();
      if (data)
        hash.update(data);
      else {
        console.log(`${hash.digest('hex')}`);
      }
    })
  } catch {
    console.log("Operation failed");
  }
}

export default calculateHashForFile;