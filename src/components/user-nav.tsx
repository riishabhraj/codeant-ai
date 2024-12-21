import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"

export interface UserNavProps {
    userName: string;
    avatarUrl?: string;
}

export function UserNav({ userName, avatarUrl }: UserNavProps) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User logged out successfully");
            navigate('/sign-in');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2">
                    {avatarUrl && (
                        <img
                            src={avatarUrl}
                            alt={userName}
                            className="w-6 h-6 rounded-full"
                        />
                    )}
                    <span>{userName}</span>
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

