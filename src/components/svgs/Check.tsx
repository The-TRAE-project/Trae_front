interface Props {
  className: string;
}

const Check = ({ className }: Props) => {
  return (
    <svg
      width="46"
      height="40"
      viewBox="0 0 46 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g id="react-icons/ai/AiOutlineCheck">
        <path
          id="Vector"
          d="M44.5678 2H40.7988C40.2704 2 39.7689 2.24462 39.4454 2.6632L17.2144 31.0557L6.55457 17.4384C6.39332 17.232 6.18777 17.0651 5.95337 16.9502C5.71898 16.8353 5.46181 16.7755 5.2012 16.7752H1.43223C1.07097 16.7752 0.871466 17.1938 1.09254 17.4764L15.8611 36.3395C16.5512 37.2202 17.8777 37.2202 18.5732 36.3395L44.9075 2.69581C45.1285 2.41858 44.929 2 44.5678 2Z"
          fill="#FF9A4A"
          stroke="#FF9A4A"
        />
      </g>
    </svg>
  );
};

export default Check;
