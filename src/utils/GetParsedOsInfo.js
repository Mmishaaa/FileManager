const getParsedOsInfo = (inputLine) => {
  try {
    if(!inputLine.startsWith("--")) throw new Error();
    return inputLine.split("--")[1];
  } catch {
    console.log("Invalid input")
  }
}

export default getParsedOsInfo;