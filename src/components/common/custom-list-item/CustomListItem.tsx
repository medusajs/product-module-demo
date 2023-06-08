import { Circle } from "../../icons/circle";

type CustomListItemProps = {
  title: string;
  children: React.ReactNode;
};

const CustomListItem: React.FC<CustomListItemProps> = ({ title, children }) => (
  <li className="flex flex-row h-full w-full relative">
    <div className="flex flex-col items-center w-6 mr-4">
      <Circle fill="#1c1c1c" className="z-10 mt-1" />
      <div className="h-full mt-1 w-[1px] bg-[#2E2E32] absolute top-0 z-0"></div>
    </div>
    <div className="flex flex-col gap-y-2 h-full md:pl-12 z-40 mb-8 w-full">
      <span className="text-tag-purple text-labels-small font-medium">
        {title}
      </span>
      <div className="text-subtle-light dark:text-subtle-dark text-body-regular">
        {children}
      </div>
    </div>
  </li>
);

export default CustomListItem;
