import React from "react";

import {
  EllipsisHorizontalIcon,
  PhoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

export const HeaderConvsertion = React.forwardRef(({ item }, ref) => {
  return (
    <div className="p-5 border-b flex justify-between items-center" ref={ref}>
      <div className="flex items-center gap-4">
        <div>
          <img
            className="rounded-full w-14 h-14"
            src="/assets/userDefaultImage.jpg"
            alt=""
          />
        </div>
        <div>
          <p className="font-semibold text-black text-[20px]">
            {item.userName}
          </p>
        </div>
      </div>
      <div className="text-black flex items-center gap-6">
        <VideoCameraIcon width={20} height={20} />
        <PhoneIcon width={20} height={20} />
        <EllipsisHorizontalIcon width={20} height={20} />
      </div>
    </div>
  );
});
