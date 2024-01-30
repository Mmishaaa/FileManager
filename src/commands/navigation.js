import fs from "fs/promises"
import path from "path";
import checkPathExists from "../utils/checkPathExists.js";

const navigation = async(line, currentPath, newPath = null) => {
  try{
    switch (line) {
      case "up":   
        const __dirname = path.dirname(currentPath);
        return __dirname;
      case "ls":
          const files = await fs.readdir(currentPath);

          // const dataTable = await Promise.all(files.map( async(file) => {
          //   const stat = await fs.stat(path.join(currentPath, file));
          //   const type = stat.isDirectory() ? "directory" : "File";
          //   return {
          //     Name: file,
          //     Type: type,
          //   }
          // }));

          // console.table(await Promise.all(dataTable), ["Name", "Type"]);
          
          const dataTable = await Promise.all(
            files.map(async (file) => {
              const filePath = path.join(currentPath, file);
              const stat = await fs.stat(filePath);
              const type = stat.isDirectory() ? "Directory" : "File";
              //const name = stat.isDirectory() ? file : file + path.extname(file);
              return {
                Name: file,
                Type: type,
              };
            })
          );
  
          const sortedDataTable = dataTable.sort((a, b) => {
            if (a.Type !== b.Type) {
              return a.Type === "Directory" ? -1 : 1;
            }
            return a.Name.localeCompare(b.Name);
          });
  
          console.table(sortedDataTable, ["Name", "Type"]);
          return currentPath;        
      case "cd":
        const updatedPath = path.join(currentPath, newPath);
        console.log(updatedPath);
        if(path.isAbsolute(newPath)) return newPath; 
        if(await checkPathExists(updatedPath) === false) throw new Error();
        return updatedPath;
    }
  } catch(err) {
    console.log("Operation failed")
    return currentPath;
  }
}

export default navigation;