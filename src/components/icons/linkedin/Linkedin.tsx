type Props = React.SVGProps<SVGSVGElement>;

const Linkedin = (props: Props) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15 1H5C2.93 1 1 2.93 1 5v10c0 2.07 1.93 4 4 4h10c2.072 0 4-1.93 4-4V5c0-2.07-1.928-4-4-4ZM7 15.25H4.75V7H7v8.25ZM5.875 6.049a1.318 1.318 0 0 1-1.313-1.323c0-.73.588-1.323 1.313-1.323.724 0 1.313.592 1.313 1.323 0 .73-.588 1.323-1.313 1.323ZM16 15.25h-2.25v-4.203c0-2.526-3-2.335-3 0v4.203H8.5V7h2.25v1.324C11.797 6.384 16 6.24 16 10.18v5.069Z"
      fill="currentColor"
    />
  </svg>
);

export default Linkedin;
