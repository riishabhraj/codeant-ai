import { Home, Code, Cloud, Book, Settings, Phone, LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { cn } from "@/lib/utils"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { Menu } from 'lucide-react'
import logo from '../assets/small-logo.png'
import { auth } from "@/lib/firebase"
import { signOut } from 'firebase/auth'
import { useCallback } from 'react'

interface NavItem {
    href: string
    icon: React.ComponentType<{ className?: string }>
    title: string
    isActive?: boolean
    onClick?: () => void
}

const navItems: NavItem[] = [
    { href: "#", icon: Home, title: "Repositories", isActive: true },
    { href: "#", icon: Code, title: "AI Code Review" },
    { href: "#", icon: Cloud, title: "Cloud Security" },
    { href: "#", icon: Book, title: "How to Use" },
    { href: "#", icon: Settings, title: "Settings" },
]

interface SidebarProps {
    className?: string
}

export function Sidebar({ className }: SidebarProps) {


    const navigate = useNavigate();

    const handleLogout = useCallback(async () => {
        try {
            await signOut(auth);
            console.log("User logged out successfully");
            setTimeout(() => {
                navigate('/sign-in');
            }, 0);
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }, [navigate]);

    const bottomNavItems: NavItem[] = [
        { href: "#", icon: Phone, title: "Support" },
        {
            href: "#",
            icon: LogOut,
            title: "Logout",
            onClick: handleLogout
        },
    ];

    const NavContent = () => (
        <>
            <div className="flex h-14 items-center border-b px-4">
                <Link to="/" className="flex items-center gap-2">
                    <img className='h-5 w-5' src={logo} alt="logo" />
                    <span className="font-normal">CodeAnt AI</span>
                </Link>
            </div>
            <nav className="space-y-1 p-4">
                {navItems.map((item) => (
                    <Link
                        key={item.title}
                        to={item.href}
                        className={cn(
                            "flex items-center space-x-2 rounded-lg px-3 py-2 hover:bg-accent",
                            item.isActive && "bg-primary/10 text-primary"
                        )}
                    >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                    </Link>
                ))}
            </nav>
            <div className="absolute bottom-4 left-4 right-4 space-y-1">
                {bottomNavItems.map((item) => (
                    <Link
                        key={item.title}
                        to={item.href}
                        className="flex items-center space-x-2 rounded-lg px-3 py-2 hover:bg-accent"
                    >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                    </Link>
                ))}
            </div>
        </>
    )

    return (
        <>
            <aside className={cn(
                "fixed left-0 top-0 z-30 hidden h-screen w-64 border-r bg-background lg:block",
                className
            )}>
                <NavContent />
            </aside>

            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        className="px-2 lg:hidden"
                        size="icon"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                    <NavContent />
                </SheetContent>
            </Sheet>
        </>
    )
}

