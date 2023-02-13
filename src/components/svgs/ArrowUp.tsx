import { colors } from '../../constants/colors';

interface Props {
  color: string;
}

const ArrowUp = ({ color = colors.green }: Props) => {
  return (
    <svg
      width="95"
      height="79"
      viewBox="0 0 97 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M96.507 8.7159C96.9023 7.98787 96.6326 7.07723 95.9045 6.68194L84.0405 0.240296C83.3125 -0.154996 82.4018 0.114747 82.0065 0.842783C81.6113 1.57082 81.881 2.48146 82.609 2.87675L93.1548 8.60265L87.4289 19.1485C87.0336 19.8765 87.3034 20.7871 88.0314 21.1824C88.7595 21.5777 89.6701 21.308 90.0654 20.5799L96.507 8.7159ZM94.656 9.72241L95.6148 9.43839L94.7628 6.56193L93.804 6.84595L94.656 9.72241Z"
        fill={color}
      />
      <path
        d="M93.918 8C73.6371 16.0773 29.3463 43.2384 14.4296 87.2644"
        stroke={color}
        strokeWidth="3"
        strokeDasharray="6 6"
      />
    </svg>
  );
};

export default ArrowUp;
