import fs from "fs";
import fsPromise from "fs/promises";
import path from "path";
import checkPathExists from "../utils/checkPathExists.js";

const cat = async(pathToFile) => {
  try{
    if(await checkPathExists(pathToFile) === false) throw new Error();
    const readableStream = fs.createReadStream(pathToFile, "utf-8");
    readableStream.on("data", (chunk) => console.log(chunk));
  } catch {
    console.log("Operation failed")
  }
};

const add = async(pathToNewFile) => {
  try{
    if(await checkPathExists(pathToNewFile)) throw new Error();
    await fsPromise.writeFile(pathToNewFile, "");
    console.log("Emply file was successfully created!");
  } catch {
    console.log("Operation failed");
  }
};

const rm = async(pathToFileToDelete) => {
  try{
    if(await checkPathExists(pathToFileToDelete) === false) throw new Error();
    await fsPromise.unlink(pathToFileToDelete);
    console.log("Successfully removed!");
  } catch {
    console.log("Operation failed");
  }
};

const rn = async(pathToFile, currentFileName, newFileName) => {
  try{
    if(await checkPathExists(pathToFile) === false) throw new Error();
    const currentPathToFile = path.join(pathToFile, currentFileName);
    const newPathToFile = path.join(pathToFile, newFileName);
    await fsPromise.rename(currentPathToFile, newPathToFile);
    console.log("Successfully renamed!");
  } catch {
    console.log("Operation failed");
  }
}

const cp = async(pathToSourceFile, pathToDestFile) => {
  try{
    if(await checkPathExists(pathToSourceFile) === false || await checkPathExists(pathToDestFile) === false) throw new Error();
    const readableStream = fs.createReadStream(pathToSourceFile);
    const writableStream = fs.createWriteStream(pathToDestFile);
    readableStream.pipe(writableStream);  
    console.log("Successfully copied!");
  } catch {
    console.log("Operation failed");
  }
}

const mv = async(pathToSourceFile, pathToDestFile) => {
  try{
    if(await checkPathExists(pathToSourceFile) === false || await checkPathExists(pathToDestFile) === false) throw new Error();
    const readableStream = fs.createReadStream(pathToSourceFile);
    const writableStream = fs.createWriteStream(pathToDestFile);
    readableStream.pipe(writableStream); 
    readableStream.on("end", () => fsPromise.unlink(pathToSourceFile)); 
    console.log("Successfully copied!");
  } catch {
    console.log("Operation failed");
  }
}


export { cat, add, rn, cp, mv, rm };