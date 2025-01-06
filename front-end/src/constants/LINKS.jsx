import {
  BookmarkIcon,
  ArrowRightOnRectangleIcon,
  BuildingStorefrontIcon,
  InboxStackIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
  TagIcon,
  UserCircleIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export const LINKS = [
  {
    SVG: <Squares2X2Icon strokeWidth="1" className="w-10 h-10" />,
    TEXT: "Dashboard",
    LINK: "/admin/dashboard",
  },
  {
    SVG: <UsersIcon strokeWidth="1" className="w-10 h-10" />,
    TEXT: "Users",
    LINK: "/admin/usersList",
  },
  {
    SVG: <ShoppingBagIcon strokeWidth="1" className="w-10 h-10" />,
    TEXT: "Products",
    LINK: "/admin/products",
  },
  {
    SVG: <InboxStackIcon strokeWidth="1" className="w-10 h-10" />,
    TEXT: "Pending products",
    LINK: "/admin/pendingProducts",
  },
  {
    SVG: <TagIcon strokeWidth="1" className="w-10 h-10" />,
    TEXT: "Categories",
    LINK: "/admin/categories",
  },
  {
    SVG: <BuildingStorefrontIcon strokeWidth="1" className="w-10 h-10" />,
    TEXT: "Stores",
    LINK: "/admin/stores",
  },
  {
    SVG: <BookmarkIcon strokeWidth="1" className="w-10 h-10" />,
    TEXT: "Saves",
    LINK: "/admin/saves",
  },
  {
    SVG: <UserGroupIcon strokeWidth="1" className="w-10 h-10" />,
    TEXT: "Our Team",
    LINK: "/admin/team",
  },
  {
    SVG: <UserCircleIcon strokeWidth="1" className="w-10 h-10" />,
    TEXT: "Profile",
    LINK: "/admin/profile",
  },
  {
    SVG: <ArrowRightOnRectangleIcon strokeWidth="1" className="w-10 h-10" />,
    TEXT: "Logout",
  },
];
