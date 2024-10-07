import { FiltersData, ProductsResponse } from '@/lib/types';

export const mockFiltersData: FiltersData = {
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
    ],
    meta: {},
  },
  sizes: {
    data: [
      {
        id: 1,
        attributes: {
          id: 1,
          value: 'M',
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-01T00:00:00Z',
          publishedAt: '2023-01-01T00:00:00Z',
        },
      },
    ],
    meta: {},
  },
};
export const mockMaxPrice = 1000;
export const mockProductData: ProductsResponse = {
  data: [
    {
      id: 1,
      attributes: {
        id: 1,
        createdAt: '2023-01-01T00:00:00Z',
        publishedAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
        name: 'Test Product 1',
        description: 'Description for Test Product 1',
        price: 500,
        teamName: 'team-1',
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
                publishedAt: '2024-10-01T11:25:49.610Z',
                id: 1,
              },
            },
          ],
        },
        brand: {
          data: {
            id: 1,
            attributes: {
              id: 1,
              name: 'Nike',
              createdAt: '2023-01-01T00:00:00Z',
              updatedAt: '2023-01-01T00:00:00Z',
              publishedAt: '2023-01-01T00:00:00Z',
            },
          },
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
          ],
        },
        gender: {
          data: {
            id: 1,
            attributes: {
              id: 1,
              name: 'Unisex',
              createdAt: '2023-01-01T00:00:00Z',
              updatedAt: '2023-01-01T00:00:00Z',
              publishedAt: '2023-01-01T00:00:00Z',
            },
          },
        },
        sizes: {
          data: [
            {
              id: 1,
              attributes: {
                id: 1,
                value: 'M',
                createdAt: '2023-01-01T00:00:00Z',
                updatedAt: '2023-01-01T00:00:00Z',
                publishedAt: '2023-01-01T00:00:00Z',
              },
            },
          ],
        },
      },
    },
    {
      id: 2,
      attributes: {
        createdAt: '2023-01-01T00:00:00Z',
        publishedAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
        id: 2,
        name: 'Test Product 2',
        description: 'Description for Test Product 2',
        price: 800,
        teamName: 'team-2',
        images: {
          data: [
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
                publishedAt: '2024-10-01T11:25:49.610Z',
                id: 2,
              },
            },
          ],
        },
        brand: {
          data: {
            id: 1,
            attributes: {
              id: 1,
              name: 'Nike',
              createdAt: '2023-01-01T00:00:00Z',
              updatedAt: '2023-01-01T00:00:00Z',
              publishedAt: '2023-01-01T00:00:00Z',
            },
          },
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
          ],
        },
        gender: {
          data: {
            id: 1,
            attributes: {
              id: 1,
              name: 'Unisex',
              createdAt: '2023-01-01T00:00:00Z',
              updatedAt: '2023-01-01T00:00:00Z',
              publishedAt: '2023-01-01T00:00:00Z',
            },
          },
        },
        sizes: {
          data: [
            {
              id: 2,
              attributes: {
                id: 2,
                value: 'L',
                createdAt: '2023-01-01T00:00:00Z',
                updatedAt: '2023-01-01T00:00:00Z',
                publishedAt: '2023-01-01T00:00:00Z',
              },
            },
          ],
        },
      },
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 10,
      pageCount: 1,
      total: 2,
    },
  },
};
