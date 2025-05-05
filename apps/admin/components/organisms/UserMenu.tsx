import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import SignoutButton from "../atoms/SignoutButton";

interface UserMenuProps {
  user?: {
    name: string;
    image?: string;
  };
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Avatar className="w-8 h-8">
        {user?.image ? (
          <AvatarImage src={user.image} alt={user.name} />
        ) : (
          <AvatarFallback>{user?.name?.charAt(0) ?? "U"}</AvatarFallback>
        )}
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem><SignoutButton /></DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default UserMenu;
