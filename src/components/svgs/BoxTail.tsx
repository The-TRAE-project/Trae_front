interface BoxTailProps {
  className: string;
}

const BoxTail = ({ className }: BoxTailProps) => {
  return (
    <svg
      width="25"
      height="9"
      viewBox="0 0 25 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M11 9C9 3 2.83333 0.5 0 0H24.5L11 9Z" fill="var(--white)" />
    </svg>
  );
};

export default BoxTail;
