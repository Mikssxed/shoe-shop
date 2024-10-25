import { DESCRIPTION_LIMIT } from '@/lib/constants';

export const getAiPromptForDescriptionByTitle = (title: string) =>
  `Write a product description for a shoe with the title: "${title}". 
THE DESCRIPTION MUST HAVE ${DESCRIPTION_LIMIT-100}-${DESCRIPTION_LIMIT} CHARACTERS, and it must reflect the style of an online shoe store. 
Prefer details that would appear on the official site of the shoe brand, including the shoe's unique features, design, and key selling points. 
Maintain a professional, appealing tone for potential customers, and include relevant information about comfort, durability, and fashion. 
In case the is no info about this product just mind something up. Don't forget about the character limit`;
