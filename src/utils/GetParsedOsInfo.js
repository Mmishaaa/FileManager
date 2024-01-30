const getParsedOsInfo = (inputLine) => {
  return inputLine.split("--")[1];
}

export default getParsedOsInfo();