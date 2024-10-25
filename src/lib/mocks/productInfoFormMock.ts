import { FiltersData, ProductAttributes } from '../types';

export const mockFiltersData = {
  data: {
    genders: {
      data: [
        {
          id: 1,
          attributes: {
            id: 1,
            name: 'Unisex',
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-01T00:00:00Z',
            publishedAt: '2023-01-01T00:00:00Z',
          },
        },
        {
          id: 2,
          attributes: {
            id: 2,
            name: 'Male',
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-01T00:00:00Z',
            publishedAt: '2023-01-01T00:00:00Z',
          },
        },
      ],
      meta: {},
    },
    colors: {
      data: [
        {
          id: 1,
          attributes: {
            id: 1,
            name: 'Red',
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-01T00:00:00Z',
            publishedAt: '2023-01-01T00:00:00Z',
          },
        },
        {
          id: 2,
          attributes: {
            id: 2,
            name: 'Blue',
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-01T00:00:00Z',
            publishedAt: '2023-01-01T00:00:00Z',
          },
        },
      ],
      meta: {},
    },
    categories: {
      data: [
        {
          id: 1,
          attributes: {
            id: 1,
            name: 'Casual',
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-01T00:00:00Z',
            publishedAt: '2023-01-01T00:00:00Z',
          },
        },
        {
          id: 2,
          attributes: {
            id: 2,
            name: 'Running',
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-01T00:00:00Z',
            publishedAt: '2023-01-01T00:00:00Z',
          },
        },
      ],
      meta: {},
    },
    brands: {
      data: [
        {
          id: 1,
          attributes: {
            id: 1,
            name: 'Nike',
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-01T00:00:00Z',
            publishedAt: '2023-01-01T00:00:00Z',
          },
        },
        {
          id: 2,
          attributes: {
            id: 2,
            name: 'Adidas',
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-01T00:00:00Z',
            publishedAt: '2023-01-01T00:00:00Z',
          },
        },
      ],
      meta: {},
    },
    sizes: {
      data: [
        {
          id: 1,
          attributes: {
            id: 1,
            value: '36',
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-01T00:00:00Z',
            publishedAt: '2023-01-01T00:00:00Z',
          },
        },
        {
          id: 3,
          attributes: {
            id: 3,
            value: '37',
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-01T00:00:00Z',
            publishedAt: '2023-01-01T00:00:00Z',
          },
        },
        {
          id: 3,
          attributes: {
            id: 3,
            value: '38',
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-01T00:00:00Z',
            publishedAt: '2023-01-01T00:00:00Z',
          },
        },
      ],
      meta: {},
    },
  },
  meta: {},
};

export const mockProduct: ProductAttributes = {
  brand: {
    data: mockFiltersData.data.brands.data[0],
  },
  categories: {
    data: [mockFiltersData.data.categories.data[0]],
  },
  color: {
    data: mockFiltersData.data.colors.data[0],
  },
  gender: {
    data: mockFiltersData.data.genders.data[0],
  },
  images: {
    data: [
      {
        id: 1,
        attributes: {
          width: 100,
          height: 100,
          url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1727781949/Buty_Adi2000_Brazowy_IF_8820_011_hover_standard_a607a53de3.avif',
          provider_metadata: {
            public_id:
              'Buty_Adi2000_Brazowy_IF_8820_011_hover_standard_a607a53de3',
            resource_type: 'image',
          },
          createdAt: '2024-10-01T11:25:49.610Z',
          updatedAt: '2024-10-01T11:25:49.610Z',
          publishedAt: '2023-01-01T00:00:00Z',
          id: 1,
        },
      },
      {
        id: 2,
        attributes: {
          width: 100,
          height: 100,
          url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1727781949/Buty_Adi2000_Brazowy_IF_8820_011_hover_standard_a607a53de3.avif',
          provider_metadata: {
            public_id:
              'Buty_Adi2000_Brazowy_IF_8820_011_hover_standard_a607a53de3',
            resource_type: 'image',
          },
          createdAt: '2024-10-01T11:25:49.610Z',
          updatedAt: '2024-10-01T11:25:49.610Z',
          publishedAt: '2023-01-01T00:00:00Z',
          id: 2,
        },
      },
    ],
  },
  name: 'Mock name',
  price: 100,
  sizes: {
    data: [
      mockFiltersData.data.sizes.data[0],
      mockFiltersData.data.sizes.data[1],
    ],
  },
  teamName: 'team-1',
  id: 1,
  description: 'Lorem ipsum Lorem ipsum',
};
