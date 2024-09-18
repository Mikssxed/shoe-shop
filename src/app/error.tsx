'use client';

import ServerError from '@/components/common/ServerError';

const Error = (props: {error: Error; reset: () => void}) => {
  return <ServerError {...props} />;
};

export default Error;
