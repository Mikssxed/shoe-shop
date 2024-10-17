import { IImage, TMyImage } from "@/lib/types";

export const capitalizeFirstLetter = (text: string) => {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export function generateRandomUsername() {
  const adjectives = [
    'Quick',
    'Lazy',
    'Happy',
    'Sad',
    'Brave',
    'Clever',
    'Bright',
    'Bold',
    'Curious',
    'Mighty',
  ];

  const nouns = [
    'Lion',
    'Tiger',
    'Elephant',
    'Eagle',
    'Falcon',
    'Shark',
    'Dragon',
    'Wolf',
    'Bear',
    'Panther',
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(Math.random() * 100000);

  return `${randomAdjective}${randomNoun}${randomNumber}`;
}

export const getItemUrl = (item: IImage | TMyImage): string => {
  if ('previewUrl' in item && item.previewUrl) return item.previewUrl; // Handle IImage case
  if ('url' in item && item?.url) return item?.url;
  if ('attributes' in item && item?.attributes?.previewUrl)
    return item?.attributes.previewUrl;
  if ('attributes' in item && item?.attributes.url) return item?.attributes.url;

  return 'https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg';
};