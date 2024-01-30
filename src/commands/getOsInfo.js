import os from "os";

const getOsInfo = async(osCommand) => {
  try{
    switch(osCommand) {
      case "EOL":
        console.log(JSON.stringify(os.EOL));
        break;
      case "cpus":
        const cpus = os.cpus();
        console.log("overall amount of CPUS: " + os.availableParallelism());
        cpus.forEach((cpu, index) => console.log(`${index + 1} - ${cpu.model} - ${(cpu.speed / 1000).toFixed(2)} GHz`))
        break;  
      case "homedir":
        console.log("Your homedir: " + os.homedir());
        break;
      case "username":
        console.log("Your system user name: " + os.userInfo().username);
        break; 
      case "architecture":
        console.log("CPU architecture for which Node.js binary has compiled: " + process.arch);
        break;
      default:
        console.log("Invalid input");
        break;
    }
  } catch(err) {
    console.log("Operation failed")
    return currentPath;
  }
}

export default getOsInfo;