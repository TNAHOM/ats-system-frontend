import { ChevronDown } from "lucide-react";

type ProfileProps = {
  more: boolean;
};

const Profile = ({ more = false }: ProfileProps) => {
  const userName = "Nahom";
  const position = "Hiring Manager";
  return (
    <div className="flex w-full justify-center items-center h-full">
      <div className="w-10 h-10 rounded-full bg-linear-to-tr from-blue-500 to-purple-600 flex justify-center items-center shadow-md border-2 border-white">
        <span className="text-white font-bold text-lg">
          {userName.charAt(0)}
        </span>
      </div>
      <div className="flex flex-col mx-2">
        <div className="text-sm font-semibold"> {userName} </div>
        <div className="text-[12px] font-medium text-muted-foreground whitespace-nowrap">
          {position}
        </div>
      </div>
      {more && (
        <div className="ml-2">
          <ChevronDown />
        </div>
      )}
    </div>
  );
};

export default Profile;
