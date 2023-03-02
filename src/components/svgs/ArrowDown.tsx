interface Props {
  color: string;
}

const ArrowDown = ({ color = 'var(--green)' }: Props) => {
  return (
    <svg
      width="76"
      height="106"
      viewBox="0 0 80 107"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M78.7095 97.5187C79.4572 97.1621 79.7743 96.2668 79.4176 95.5191L73.6057 83.3342C73.2491 82.5865 72.3538 82.2694 71.6061 82.6261C70.8583 82.9827 70.5413 83.878 70.898 84.6257L76.0641 95.4568L65.2331 100.623C64.4853 100.98 64.1683 101.875 64.525 102.623C64.8816 103.37 65.7769 103.687 66.5246 103.331L78.7095 97.5187ZM76.6204 97.245L77.563 97.5788L78.5644 94.7509L77.6218 94.4171L76.6204 97.245Z"
        fill={color}
      />
      <path
        d="M2 11.5977C8.92816 32.2993 33.5647 78.0425 76.6858 95.4027"
        stroke={color}
        strokeWidth="3"
        strokeDasharray="6 6"
      />
    </svg>
  );
};

export default ArrowDown;
