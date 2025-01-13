import { UserSideBar } from "../../layouts/UserSideBar";

export const History = () => {

  return (
    <div>
      <div>
        <UserSideBar />
      </div>

      <div className="lg:ml-[21%] px-2 mt-8">
        <div>
            <h1 className="text-3xl font-semibold">Your history</h1>
            <div className="mt-2 flex gap-4">
            </div>
        </div>
      </div>
    </div>
  );
};
