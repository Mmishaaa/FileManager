import os from "os";
import path from "path";
import readlinePromises from "node:readline/promises";

import navigation from "./commands/navigation.js";
import { cat, add, rn, cp, mv, rm } from "./commands/basicOperations.js";
import getParsedOsInfo from "./utils/getParsedOsInfo.js";
import getOsInfo from "./commands/getOsInfo.js";
import calculateHashForFile from "./commands/hash.js";
import compress from "./commands/compress.js";
import decompress from "./commands/decompress.js";

const commands = [
  "up",
  "ls",
  "cd",
  "cat",
  "add",
  "rn",
  "cp",
  "mv",
  "rm",
  "os",
  "hash",
  "compress",
  "decompress"
];
const username = process.argv.splice(2)[0].split("=")[1];
let userHomeDirPath = os.homedir();
let currentPath = userHomeDirPath;

const greetings = `Welcome to the File Manager, ${username}!`;
const goodbye = `Thank you for using File Manager, ${username}, goodbye!`;

console.log(greetings);
console.log(`You are currently in ${userHomeDirPath}`);

const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
}); 

rl.on("SIGINT", () => {
  console.log(goodbye);
  process.exit();
});

rl.on("line", async(line) => {
  try {
    if(line === "up" || line === "ls") {
      currentPath = await navigation(line, currentPath);
      console.log(`You are currently in ${currentPath}`);
    }

    if(line === ".exit"){
      console.log(goodbye);
      process.exit();
    }

    const [ command, ...firstPath] = line.split(" ");
    if(!commands.includes(command)) throw new Error();
    
    switch(command) {
      case "cd":
        if(firstPath.length === 0) throw new Error();
        currentPath = await navigation(command, currentPath, firstPath.join(" "));
        console.log(`You are currently in ${currentPath}`);
        break;
      case "cat": {
        if(firstPath.length !== 1) throw new Error();
        const fileName = firstPath[0];
        const pathToRead = path.join(currentPath, fileName);
        await cat(pathToRead);
        console.log(`You are currently in ${currentPath}`);
        break;
      }
      case "add": {
        if(firstPath.length !== 1) throw new Error();
        const fileName = firstPath[0];
        const pathToNewFile = path.join(currentPath, fileName);
        await add(pathToNewFile);
        console.log(`You are currently in ${currentPath}`);
        break;
      }
      case "rn": 
        if(firstPath.length !== 2) throw new Error();
        const currentFileName = firstPath[0];
        const newFileName = firstPath[1];
        await rn(currentPath, currentFileName, newFileName);
        console.log(`You are currently in ${currentPath}`);
        break;
      case "cp": {
        if(firstPath.length !== 2) throw new Error();
        const pathToSourceFile = path.join(currentPath, firstPath[0]);
        const pathToDestFile = path.join(currentPath, firstPath[1]);
        await cp(pathToSourceFile, pathToDestFile);
        console.log(`You are currently in ${currentPath}`);
        break;
      }
      case "mv": 
      {
        if(firstPath.length !== 2) throw new Error();
        const pathToSourceFile = path.join(currentPath, firstPath[0]);
        const pathToDestFile = path.join(currentPath, firstPath[1]);
        await mv(pathToSourceFile, pathToDestFile);
        console.log(`You are currently in ${currentPath}`);
        break;
      }
      case "rm": {
        if(firstPath.length !== 1) throw new Error();
        const fileName = firstPath[0];
        const pathToFileToRemove = path.join(currentPath, fileName);
        await rm(pathToFileToRemove);
        console.log(`You are currently in ${currentPath}`);
        break
      }
      case "os": 
        if(firstPath.length !== 1) throw new Error();
        const osInput = firstPath[0];
        const osCommand = getParsedOsInfo(osInput);
        await getOsInfo(osCommand);
        console.log(`You are currently in ${currentPath}`);
        break;
      case "hash": {
        if(firstPath.length !== 1) throw new Error();
        const fileName = firstPath[0];
        const pathToFileToHash = path.join(currentPath, fileName);
        await calculateHashForFile(pathToFileToHash);
        console.log(`You are currently in ${currentPath}`);
        break;
      }
      case "compress": {
        if(firstPath.length !== 2) throw new Error();
        const pathToSourceFile = path.join(currentPath, firstPath[0]);
        const pathToDestFile = path.join(currentPath, firstPath[1]);
        await compress(pathToSourceFile, pathToDestFile);
        console.log(`You are currently in ${currentPath}`);
        break;
      }
      case "decompress": {
        if(firstPath.length !== 2) throw new Error();
        const pathToSourceFile = path.join(currentPath, firstPath[0]);
        const pathToDestFile = path.join(currentPath, firstPath[1]);
        await decompress(pathToSourceFile, pathToDestFile);
        console.log(`You are currently in ${currentPath}`);
        break;
      }
    }  
  } catch {
    console.log("Invalid input");
    console.log(`You are currently in ${currentPath}`);
  }
})
