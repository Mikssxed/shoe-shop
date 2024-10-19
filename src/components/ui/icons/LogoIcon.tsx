export const LogoIcon = ({
  width = 40,
  height = 30,
  color = 'none',
}: {
  width?: number;
  height?: number;
  color?: string;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 40 30"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse
      cx="3.83763"
      cy="3.83501"
      rx="3.83763"
      ry="3.83501"
      transform="matrix(0.866321 0.499488 -0.500512 0.86573 3.83887 1.91699)"
    />
    <ellipse
      cx="3.83763"
      cy="3.83501"
      rx="3.83763"
      ry="3.83501"
      transform="matrix(0.866321 0.499488 -0.500512 0.86573 33.3516 0)"
    />
    <rect
      width="7.4354"
      height="20.1338"
      rx="3.7177"
      transform="matrix(0.866321 0.499488 -0.500512 0.86573 28.3125 8.85568)"
    />
    <rect
      width="7.4354"
      height="29.961"
      rx="3.7177"
      transform="matrix(0.866321 0.499488 -0.500512 0.86573 18.7148 0.209869)"
    />
  </svg>
);
