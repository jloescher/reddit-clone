const truncateWords = (str: string, numWords: number): string => {
  const truncatedString = str.split(" ").splice(0, numWords).join(" ");
  return truncatedString + "...";
};

export default truncateWords;
