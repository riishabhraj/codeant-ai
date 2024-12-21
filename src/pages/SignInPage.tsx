import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Key } from 'lucide-react'
import { Link } from "react-router-dom"
import { useState } from "react"
import { cn } from "@/lib/utils"
import logo from '../assets/small-logo.png'
import bigLogo from '../assets/big-logo.png'
import { FaGithub, FaBitbucket } from "react-icons/fa";
import { VscAzureDevops } from "react-icons/vsc";
import { FaGitlab } from "react-icons/fa6";
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from "@/lib/firebase"
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const [activeView, setActiveView] = useState<'saas' | 'self-hosted'>('saas')
    const navigate = useNavigate();

    const handleGitHubSignIn = async () => {
        try {
            const provider = new GithubAuthProvider();
            provider.addScope('repo');
            provider.addScope('read:user');
            provider.addScope('user:email');

            const result = await signInWithPopup(auth, provider);
            const credential = GithubAuthProvider.credentialFromResult(result);

            if (credential?.accessToken) {
                localStorage.setItem('github_token', credential.accessToken);
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('GitHub sign in error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="w-6xl flex min-h-screen flex-col items-center justify-center md:grid md:grid-cols-2">

                <div className="relative hidden w-full max-w-xl items-center justify-center md:flex mx-auto h-screen md:max-lg:bottom-10">
                    <div className="relative w-full max-w-sm">
                        <Card className="mb-16 overflow-hidden rounded-3xl border shadow-lg">
                            <CardContent className="p-0">
                                <div className="border-b p-4">
                                    <div className="flex items-center gap-3">
                                        <img className="h-6 w-6" src={logo} alt="logo" />
                                        <h2 className="text-base font-semibold">AI to Detect & Autofix Bad Code</h2>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 divide-x">
                                    <div className="p-4 text-center">
                                        <div className="text-xl font-bold">30+</div>
                                        <div className="text-xs text-muted-foreground">Language Support</div>
                                    </div>
                                    <div className="p-4 text-center">
                                        <div className="text-xl font-bold">10K+</div>
                                        <div className="text-xs text-muted-foreground">Developers</div>
                                    </div>
                                    <div className="p-4 text-center">
                                        <div className="text-xl font-bold">100K+</div>
                                        <div className="text-xs text-muted-foreground">Hours Saved</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="absolute left-1/2 top-32 w-48 -translate-x-1/2 rounded-3xl border shadow-lg">
                            <CardContent className="p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <div className="rounded-full bg-blue-100 p-2">
                                        <div className="h-4 w-4 rounded-full border-3 border-blue-500 border-r-transparent" />
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm text-blue-600">↑14%</span>
                                        <span className="text-xs text-muted-foreground">This week</span>
                                    </div>
                                </div>
                                <div className="text-xs text-muted-foreground">Issues Fixed</div>
                                <div className="text-2xl font-bold">500K+</div>
                            </CardContent>
                        </Card>

                        <div className="fixed bottom-0 left-0">
                            <img className="h-30 w-40" src={bigLogo} alt="logo" />
                        </div>
                    </div>
                </div>

                <div className="hidden md:block absolute left-1/2 h-screen w-px bg-border self-center" />

                <div className="w-full max-w-md space-y-8 p-4 mx-auto">
                    <div className="flex flex-col items-center space-y-2 text-center">
                        <div className="flex justify-center items-center text-2xl">
                            <img className="h-12 w-12" src={logo} alt="logo" />
                            <span>CodeAnt AI</span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">Welcome to CodeAnt AI</h1>
                    </div>

                    <div className="flex w-full gap-4">
                        <Button
                            className={cn(
                                "flex-1 rounded-xl py-6 text-base",
                                activeView === 'saas' ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-transparent hover:bg-accent"
                            )}
                            variant={activeView === 'saas' ? "default" : "outline"}
                            onClick={() => setActiveView('saas')}
                        >
                            SAAS
                        </Button>
                        <Button
                            className={cn(
                                "flex-1 rounded-xl py-6 text-base",
                                activeView === 'self-hosted' ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-transparent hover:bg-accent"
                            )}
                            variant={activeView === 'self-hosted' ? "default" : "outline"}
                            onClick={() => setActiveView('self-hosted')}
                        >
                            Self Hosted
                        </Button>
                    </div>

                    {activeView === 'saas' ? (
                        <div className="w-full space-y-4">
                            <Link to={'/dashboard'}>
                                <Button className="w-full justify-start gap-2 rounded-xl py-6" variant="outline" onClick={handleGitHubSignIn} >
                                    <FaGithub className="h-5 w-5" />{/*  */}
                                    Sign in with Github
                                </Button>
                            </Link>
                            <Button className="w-full justify-start gap-2 rounded-xl py-6" variant="outline">
                                <FaBitbucket className="w-5 h-5" />
                                Sign in with Bitbucket
                            </Button>
                            <Button className="w-full justify-start gap-2 rounded-xl py-6" variant="outline">
                                <VscAzureDevops className="w-5 h-5" />
                                Sign in with Azure Devops
                            </Button>
                            <Button className="w-full justify-start gap-2 rounded-xl py-6" variant="outline">
                                <FaGitlab className="h-5 w-5" />
                                Sign in with GitLab
                            </Button>
                        </div>
                    ) : (
                        <div className="w-full space-y-4">
                            <Button className="w-full justify-start gap-2 rounded-xl py-6" variant="outline">
                                <FaGitlab className="h-5 w-5" />
                                Self Hosted GitLab
                            </Button>
                            <Button className="w-full justify-start gap-2 rounded-xl py-6" variant="outline">
                                <Key className="h-5 w-5" />
                                Sign in with SSO
                            </Button>
                        </div>
                    )}

                    <div className="text-center text-sm text-muted-foreground">
                        By signing up you agree to the{" "}
                        <Link to="#" className="underline underline-offset-4 hover:text-primary">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}