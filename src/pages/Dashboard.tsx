import { useEffect, useState } from 'react';
import { Search, RefreshCw, Plus, Loader } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "../components/sidebar"
import { UserNav } from "../components/user-nav"
import { useNavigate } from 'react-router-dom';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface GithubUser {
    name: string;
    login: string;
    avatar_url: string;
}

interface Repository {
    name: string
    status: "Public" | "Private"
    language: string
    size: string
    updatedAt: string
}

const repositories: Repository[] = [
    { name: "design-system", status: "Public", language: "React", size: "7320 KB", updatedAt: "1 day ago" },
    { name: "codeant-ci-app", status: "Private", language: "Javascript", size: "5871 KB", updatedAt: "2 days ago" },
    { name: "analytics-dashboard", status: "Private", language: "Python", size: "4521 KB", updatedAt: "5 days ago" },
    { name: "mobile-app", status: "Public", language: "Swift", size: "3096 KB", updatedAt: "3 days ago" },
    { name: "e-commerce-platform", status: "Private", language: "Java", size: "6210 KB", updatedAt: "6 days ago" },
    { name: "blog-website", status: "Public", language: "HTML/CSS", size: "1876 KB", updatedAt: "4 days ago" },
    { name: "social-network", status: "Private", language: "PHP", size: "5432 KB", updatedAt: "7 days ago" },
]

// interface GithubUser {
//     name: string ;
//     login: string ;
//     avatar_url: string ;
// }

export default function RepositoryDashboard() {

    const navigate = useNavigate();
    const [user, setUser] = useState<GithubUser | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    {/* TO FETCH REPO FROM THE GITHUB */ }
    // const [repositories, setRepositories] = useState<Repository[]>([]);

    {/* only fetching user data from firebase */ }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            try {
                if (user) {
                    if (!user.email) {
                        throw new Error('No email found for user');
                    }

                    setUser({
                        name: user.displayName || 'Anonymous',
                        login: user.email,
                        avatar_url: user.photoURL || ''
                    });
                    setError(null); // Clear any previous errors
                } else {
                    setError('Please sign in to continue');
                    navigate('/sign-in');
                }
            } catch (error) {
                console.error('Auth state error:', error);
                setError(error instanceof Error ? error.message : 'Authentication error occurred');
                navigate('/sign-in');
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    // comment left By - Rishabh Srivastava
    {/* fetching user data and repositories from github */ }
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
    //         if (user) {
    //             setUser({
    //                 name: user.displayName || 'Anonymous',
    //                 login: user.email || 'anonymous@user.com',
    //                 avatar_url: user.photoURL || ''
    //             });

    //             // Get the GitHub token from the user's credentials
    //             const token = await user.getIdToken();

    //             try {
    //                 const response = await fetch('https://api.github.com/user/repos', {
    //                     headers: {
    //                         'Authorization': `Bearer ${token}`,
    //                         'Accept': 'application/vnd.github.v3+json'
    //                     }
    //                 });

    //                 if (!response.ok) {
    //                     throw new Error('Failed to fetch repositories');
    //                 }

    //                 const data = await response.json();
    //                 const formattedRepos = data.map((repo: any) => ({
    //                     id: repo.id,
    //                     name: repo.name,
    //                     private: repo.private,
    //                     language: repo.language || 'Unknown',
    //                     size: repo.size,
    //                     updated_at: new Date(repo.updated_at).toLocaleDateString()
    //                 }));

    //                 setRepositories(formattedRepos);
    //             } catch (error) {
    //                 console.error('Error fetching repositories:', error);
    //                 setError('Failed to load repositories');
    //             }
    //         } else {
    //             navigate('/sign-in');
    //         }
    //         setLoading(false);
    //     });

    //     return () => unsubscribe();
    // }, [navigate]);

    const filteredRepositories = repositories.filter(repo =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-background">
            <div className="flex">
                <div className='hidden lg:block'>
                    <Sidebar />
                </div>

                <div className="flex-1 lg:ml-64">
                    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
                        <div className="container flex h-14 items-center gap-4">
                            <div className='lg:hidden'>
                                <Sidebar />
                            </div>
                            <UserNav userName={user?.name || user?.login || 'User'} avatarUrl={user?.avatar_url} />                            <div className="flex-1" />
                            <nav className="flex items-center gap-2">
                                <Button variant="outline" size="icon" className="hidden sm:inline-flex">
                                    <RefreshCw className="h-4 w-4" />
                                    <span className="sr-only">Refresh</span>
                                </Button>
                                <Button className="hidden sm:inline-flex">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Repository
                                </Button>
                                <Button size="icon" className="sm:hidden">
                                    <Plus className="h-4 w-4" />
                                    <span className="sr-only">Add Repository</span>
                                </Button>
                            </nav>
                        </div>
                    </header>

                    <main className="container py-6">
                        <div className="mb-6 px-6">
                            <h1 className="text-2xl font-bold">Repositories</h1>
                            <p className="text-muted-foreground">33 total repositories</p>
                        </div>

                        <div className="mb-6 px-6">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search Repositories"
                                    className="pl-10"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 px-6">
                            {filteredRepositories.map((repo) => (
                                <div
                                    key={repo.name}
                                    className="rounded-lg border p-4 transition-colors hover:bg-accent"
                                >
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <h2 className="truncate text-lg font-semibold">{repo.name}</h2>
                                            <Badge variant={repo.status === "Public" ? "secondary" : "outline"}>
                                                {repo.status}
                                            </Badge>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <span className="h-2 w-2 rounded-full bg-primary" />
                                                <span>{repo.language}</span>
                                            </div>
                                            <span>{repo.size}</span>
                                            <span>Updated {repo.updatedAt}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
