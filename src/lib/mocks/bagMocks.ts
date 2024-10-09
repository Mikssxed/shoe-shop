import { ICartItem } from '../types';

const mockAttributesData = {
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  publishedAt: '2024-01-01T00:00:00Z',
};

const mockImage = {
  url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1727781949/Buty_Adi2000_Brazowy_IF_8820_011_hover_standard_a607a53de3.avif',
  id: 1,
  width: 100,
  height: 100,
  provider_metadata: { public_id: '', resource_type: 'image' },
};

export const mockCartItems: ICartItem[] = [
  {
    id: 1,
    name: 'Mock Shoes',
    description: 'These boots are amazing',
    price: 549,
    teamName: 'Team-1',
    number: 10,
    selectedSize: 39,
    amount: 1,
    gender: {
      data: {
        id: 1,
        attributes: { id: 1, name: 'Men', ...mockAttributesData },
      },
    },
    sizes: {
      data: [
        { id: 1, attributes: { id: 16, value: '39', ...mockAttributesData } },
        { id: 2, attributes: { id: 17, value: '40', ...mockAttributesData } },
      ],
    },
    images: {
      data: [{ id: 1, attributes: { ...mockImage, ...mockAttributesData } }],
    },
  },
  {
    id: 1,
    name: 'Mock Shoes',
    description: 'These boots are amazing',
    price: 549,
    teamName: 'Team-1',
    number: 2,
    selectedSize: 'unselected',
    amount: 2,
    gender: {
      data: {
        id: 1,
        attributes: { id: 1, name: 'Men', ...mockAttributesData },
      },
    },
    sizes: {
      data: [
        { id: 1, attributes: { id: 16, value: '39', ...mockAttributesData } },
        { id: 2, attributes: { id: 17, value: '40', ...mockAttributesData } },
      ],
    },
    images: {
      data: [{ id: 1, attributes: { ...mockImage, ...mockAttributesData } }],
    },
  },
];
