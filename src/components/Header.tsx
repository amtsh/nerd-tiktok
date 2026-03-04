import { GalleryVerticalEnd, UserRound } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  bgColor?: string;
  isLoggedIn?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ bgColor, isLoggedIn }) => {
  return (
    <header className={`p-4 flex items-center ${bgColor} text-white`}>
      <div className="flex items-center gap-4 w-full">
        <a href="/">
          <Button
            variant={"link"}
            className="rounded-full transition-colors opacity-80"
          >
            <GalleryVerticalEnd className="h-8 w-8 mr-4" />
          </Button>
        </a>
      </div>

      {isLoggedIn && (
        <div>
          <Button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <UserRound className="h-6 w-6" />
          </Button>
        </div>
      )}
    </header>
  );
};
