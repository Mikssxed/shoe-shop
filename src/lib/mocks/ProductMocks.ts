export const mockProduct = {
  data: {
    id: 1788,
    attributes: {
      name: 'Adi2000',
      description: 'Lorem ipsum lorem ipsum',
      price: 123,
      createdAt: '2024-10-01T11:25:49.878Z',
      updatedAt: '2024-10-01T11:42:45.887Z',
      publishedAt: '2024-10-01T11:25:49.869Z',
      teamName: 'team-1',
      images: {
        data: [
          {
            id: 5232,
            attributes: {
              name: 'Buty_Adi2000_Brazowy_IF8820_011_hover_standard.avif',
              alternativeText: null,
              caption: null,
              width: null,
              height: null,
              formats: null,
              hash: 'Buty_Adi2000_Brazowy_IF_8820_011_hover_standard_a607a53de3',
              ext: '.avif',
              mime: 'image/avif',
              size: 33.18,
              url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1727781949/Buty_Adi2000_Brazowy_IF_8820_011_hover_standard_a607a53de3.avif',
              previewUrl: null,
              provider: 'cloudinary',
              createdAt: '2024-10-01T11:25:49.610Z',
              updatedAt: '2024-10-01T11:25:49.610Z',
            },
          },
          {
            id: 5231,
            attributes: {
              name: 'Buty_Adi2000_Brazowy_IF8820_01_standard.avif',
              alternativeText: null,
              caption: null,
              width: null,
              height: null,
              formats: null,
              hash: 'Buty_Adi2000_Brazowy_IF_8820_01_standard_f3872a0f8f',
              ext: '.avif',
              mime: 'image/avif',
              size: 18.58,
              url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1727781949/Buty_Adi2000_Brazowy_IF_8820_01_standard_f3872a0f8f.avif',
              previewUrl: null,
              provider: 'cloudinary',
              createdAt: '2024-10-01T11:25:49.596Z',
              updatedAt: '2024-10-01T11:25:49.596Z',
            },
          },
        ],
      },
      brand: {
        data: {
          id: 10,
          attributes: {
            name: 'Adidas',
            createdAt: '2023-05-10T09:56:22.600Z',
            updatedAt: '2023-05-10T10:01:17.963Z',
            publishedAt: '2023-05-10T09:56:23.869Z',
          },
        },
      },
      categories: {
        data: [
          {
            id: 5,
            attributes: {
              name: 'Casual',
              createdAt: '2023-05-10T10:03:48.852Z',
              updatedAt: '2023-05-10T10:03:49.899Z',
              publishedAt: '2023-05-10T10:03:49.896Z',
            },
          },
        ],
      },
      color: {
        data: {
          id: 17,
          attributes: {
            name: 'Brown',
            createdAt: '2023-05-10T09:59:07.394Z',
            updatedAt: '2023-05-10T09:59:08.387Z',
            publishedAt: '2023-05-10T09:59:08.384Z',
          },
        },
      },
      gender: {
        data: {
          id: 3,
          attributes: {
            name: 'Men',
            createdAt: '2023-05-10T10:00:54.425Z',
            updatedAt: '2023-05-10T10:00:55.441Z',
            publishedAt: '2023-05-10T10:00:55.438Z',
          },
        },
      },
      sizes: {
        data: [
          {
            id: 22,
            attributes: {
              value: 45,
              createdAt: '2023-05-10T10:00:12.279Z',
              updatedAt: '2023-05-10T10:00:13.125Z',
              publishedAt: '2023-05-10T10:00:13.122Z',
            },
          },
          {
            id: 23,
            attributes: {
              value: 46,
              createdAt: '2023-05-10T10:00:20.278Z',
              updatedAt: '2023-05-10T10:00:21.170Z',
              publishedAt: '2023-05-10T10:00:21.167Z',
            },
          },
        ],
      },
    },
  },
  meta: {},
};

export const mockProductNoImage = {
  ...mockProduct,
  data: {
    ...mockProduct.data,
    attributes: {
      ...mockProduct.data.attributes,
      images: {
        data: null,
      },
    },
  },
};

export const mockProductNoSize = {
  ...mockProduct,
  data: {
    ...mockProduct.data,
    attributes: {
      ...mockProduct.data.attributes,
      sizes: {
        data: null,
      },
    },
  },
};

export const mockProductNoName = {
  ...mockProduct,
  data: {
    ...mockProduct.data,
    attributes: {
      ...mockProduct.data.attributes,
      name: null,
    },
  },
};

export const mockProductNoGender = {
  ...mockProduct,
  data: {
    ...mockProduct.data,
    attributes: {
      ...mockProduct.data.attributes,
      gender: null,
    },
  },
};

export const mockProductNoDescription = {
  ...mockProduct,
  data: {
    ...mockProduct.data,
    attributes: {
      ...mockProduct.data.attributes,
      description: null,
    },
  },
};

export const mockProductNoPrice = {
  ...mockProduct,
  data: {
    ...mockProduct.data,
    attributes: {
      ...mockProduct.data.attributes,
      price: null,
    },
  },
};

export const mockProductNoBrand = {
  ...mockProduct,
  data: {
    ...mockProduct.data,
    attributes: {
      ...mockProduct.data.attributes,
      brand: null,
    },
  },
};

export const mockProductNoCategories = {
  ...mockProduct,
  data: {
    ...mockProduct.data,
    attributes: {
      ...mockProduct.data.attributes,
      categories: null,
    },
  },
};

export const mockProductNoColor = {
  ...mockProduct,
  data: {
    ...mockProduct.data,
    attributes: {
      ...mockProduct.data.attributes,
      color: null,
    },
  },
};