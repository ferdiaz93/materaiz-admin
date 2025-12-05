export const formatText = (text?: string): string => {
  if (!text) return '';

  return text
    .toLowerCase()
    .trim()
    .replace(/(^\p{L}|\s\p{L})/gu, (c) => c.toUpperCase());
};
