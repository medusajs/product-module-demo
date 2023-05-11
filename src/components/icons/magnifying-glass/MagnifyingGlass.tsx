type Props = React.SVGProps<SVGSVGElement>;

const MagnifyingGlass = (props: Props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.4999 17.5002L13.1691 13.1693M13.1691 13.1693C14.3412 11.9972 14.9997 10.4074 14.9997 8.74975C14.9997 7.09208 14.3412 5.50231 13.1691 4.33016C11.9969 3.15802 10.4072 2.49951 8.7495 2.49951C7.09184 2.49951 5.50207 3.15802 4.32992 4.33016C3.15777 5.50231 2.49927 7.09208 2.49927 8.74975C2.49927 10.4074 3.15777 11.9972 4.32992 13.1693C5.50207 14.3415 7.09184 15 8.7495 15C10.4072 15 11.9969 14.3415 13.1691 13.1693V13.1693Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MagnifyingGlass;
