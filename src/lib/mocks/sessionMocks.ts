export const mockSessionAuthed = {
  status: 'authenticated',
  data: {
    user: {
      id: 777,
    },
  },
};

export const mockSessionLoading = {
  status: 'loading',
};

export const mockSessionUnauthed = {
  status: 'unauthenticated',
};

export const mockSessionWithUser = {
  data: {
    user: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      phoneNumber: '+123456789',
      avatar: {
        id: 5466,
        name: 'menu.png',
        alternativeText: null,
        caption: null,
        width: 17,
        height: 15,
        formats: null,
        hash: 'menu_ef1bcdf78c',
        ext: '.png',
        mime: 'image/png',
        size: 0.18,
        url: 'https://res.cloudinary.com/devc11z9p/image/upload/v1728236854/menu_ef1bcdf78c.png',
        previewUrl: null,
        provider: 'cloudinary',
        provider_metadata: {
          public_id: 'menu_ef1bcdf78c',
          resource_type: 'image',
        },
        createdAt: '2024-10-06T17:47:34.650Z',
        updatedAt: '2024-10-06T17:47:34.650Z',
      },
    },
  },
  status: 'authenticated',
};
