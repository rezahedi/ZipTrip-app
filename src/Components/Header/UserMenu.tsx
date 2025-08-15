import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { User } from "@/types";
import { useNavigate } from "react-router-dom";

const UserMenu = ({
  user,
  handleLogoutClick,
}: {
  user: User;
  handleLogoutClick: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hidden sm:flex items-center gap-2 cursor-pointer">
        {user.name.split(" ")[0]}
        <Avatar>
          <AvatarImage src={user.imageURL} alt={user.name} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="hidden sm:block w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => {
              navigate("/account/profile");
            }}
          >
            Show Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              navigate("/account");
            }}
          >
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              navigate("/account/settings");
            }}
          >
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogoutClick}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
