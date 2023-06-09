type Props = React.SVGProps<SVGSVGElement>;

const Circle = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    {...props}
  >
    <circle cx="6" cy="6" r="5.25" stroke="#6E56CF" strokeWidth="1.5" />
  </svg>
);

export default Circle;
