interface Props {
  color: string;
}

const ControlArrowLeft = ({ color }: Props) => {
  return (
    <svg
      width="22"
      height="38"
      viewBox="0 0 22 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.7678 20.7678C21.7441 19.7915 21.7441 18.2085 20.7678 17.2322L4.85786 1.32233C3.88155 0.34602 2.29864 0.34602 1.32233 1.32233C0.34602 2.29864 0.34602 3.88155 1.32233 4.85786L15.4645 19L1.32233 33.1421C0.34602 34.1184 0.34602 35.7014 1.32233 36.6777C2.29864 37.654 3.88155 37.654 4.85786 36.6777L20.7678 20.7678ZM18 21.5H19V16.5H18V21.5Z"
        fill={color}
      />
    </svg>
  );
};

export default ControlArrowLeft;