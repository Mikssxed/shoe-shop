type BaseWithValue = {
  id: number;
  attributes: {
    value: string | number;
  };
};

type Data<T> = T & {
  id: number;
  attributes: {
    value: string | number;
  };
};

export default function sortSizes(sizes: Data<BaseWithValue>[]) {
  return sizes.sort((a, b) => +a.attributes.value - +b.attributes.value);
}
