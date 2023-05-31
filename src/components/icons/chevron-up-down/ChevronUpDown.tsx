type Props = React.SVGProps<SVGSVGElement>;

const ChevronUpDown = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    {...props}
  >
    <path
      d="M6.5 12.75L10.25 16.5L14 12.75M6.5 6.75L10.25 3L14 6.75"
      stroke="#706F78"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ChevronUpDown;
