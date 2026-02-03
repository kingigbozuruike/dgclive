"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Logo } from "../components/logo"
import { Check, Mail, Lock, Key, Eye, EyeOff, User } from "lucide-react"
import BokehDots from "../components/BokehDots"

export default function AuthPage() {
	const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin")
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		password: "",
		inviteCode: ""
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleAuth = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			const endpoint = activeTab === "signup" ? "/register" : "/login"
			const body = activeTab === "signup"
				? {
					email: formData.email,
					password: formData.password,
					fullName: formData.fullName,
					inviteCode: formData.inviteCode
				}
				: {
					email: formData.email,
					password: formData.password
				}

			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body)
			})

			const data = await res.json()
			if (!res.ok) throw new Error(data.error || "Authentication failed")

			if (activeTab === "signup") {
				alert("Account Created! Please Sign In.")
				setActiveTab("signin")
			} else {
				localStorage.setItem("token", data.token)
				localStorage.setItem("user", JSON.stringify(data.user))
				router.push("/dashboard")
			}
		} catch (err: any) {
			alert(err.message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="relative min-h-screen w-full overflow-hidden bg-brand-dark">
			{/* GLOBAL FULL-SCREEN BACKGROUND */}
			<div className="absolute inset-0 z-0">
				<Image
					src="/images/authscreen.png"
					alt="Auth background"
					fill
					priority
					className="object-cover"
				/>
			</div>

			{/* CONTENT LAYER */}
			<div className="relative z-10 flex min-h-screen w-full">
				{/* LEFT SIDE - HERO */}
				<div className="relative hidden w-3/5 flex-col justify-between p-12 lg:flex">
                    <BokehDots className="blur-[1px]" opacity={0.18} />
                    {/* Light overlay */}
				<div className="absolute inset-0 z-5 bg-brand-dark/80" />
				{/* Content */}
				<div className="relative z-10 h-full flex flex-col justify-between pl-5 space-y-4">
						<Logo />

						<div className="space-y-8 max-w-lg">
							<h1 className="text-5xl font-bold leading-tight text-white mb-6">
								Experience God&apos;s Presence on Livestream
							</h1>

							<p className="text-lg text-white/80 leading-relaxed mb-8">
								Join thousands in worship, powerful messages, and community connection from anywhere in the world.
							</p>

							<div className="space-y-4">
								<FeatureItem text="Live worship services & special events" />
								<FeatureItem text="Interactive chat & community" />
								<FeatureItem text="On-demand sermon archives" />
							</div>
						</div>

						<div>
							<blockquote className="text-white/60 italic text-lg mb-2">
								&quot;For where two or three gather in my name, there am I with them.&quot;
							</blockquote>
							<cite className="text-white/40 not-italic block">
								- Matthew 18:20
							</cite>
						</div>
					</div>
				</div>

				{/* RIGHT SIDE - AUTH */}
				<div className="relative flex w-full flex-col items-center justify-center px-4 lg:w-2/5">
                    <BokehDots className="blur-[2px] mix-blend-screen" opacity={0.4} />
                    {/* Strong overlay */}
				<div className="absolute inset-0 z-5 bg-brand-dark" />
				{/* Foreground */}
				<div className="relative z-20 w-full max-w-md space-y-8">
						<div className="text-center lg:text-left">
							<h2 className="text-3xl font-semibold text-white">
								{activeTab === "signin" ? "Welcome Back" : "Create Account"}
							</h2>
							<p className="mt-2 text-white/60">
								{activeTab === "signin" ? "Sign in to your account" : "Join our community today"}
							</p>
						</div>

						<div className="bg-brand-card/20 border border-white/40 rounded-2xl p-6 backdrop-blur-sm">
							{/* Toggle */}
						<div className="relative grid grid-cols-2 gap-2 mb-8 bg-black p-1 rounded-lg">
							{/* Sliding background */}
							<div
								className="absolute inset-y-0 left-0 w-1/2 bg-brand-purple rounded-md transition-transform duration-300"
								style={{
									transform: activeTab === "signup" ? "translateX(100%)" : "translateX(0)"
								}}
							/>
							<button
								onClick={() => setActiveTab("signin")}
								className={`relative z-10 text-sm font-medium py-2 rounded-md transition-colors duration-300 cursor-pointer ${
									activeTab === "signin"
										? "text-white"
										: "text-white/60 hover:text-white"
								}`}
							>
								Sign In
							</button>
							<button
								onClick={() => setActiveTab("signup")}
							className={`relative z-10 text-sm font-medium py-2 rounded-md transition-colors duration-300 cursor-pointer ${
									activeTab === "signup"
										? "text-white"
										: "text-white/60 hover:text-white"
								}`}
							>
								Sign Up
							</button>
							</div>

							<form className="space-y-5" onSubmit={handleAuth}>
								{activeTab === "signup" && (
									<div className="space-y-2">
										<Label>Full Name</Label>
										<Input
											name="fullName"
											value={formData.fullName}
											onChange={handleChange}
											placeholder="Enter your full name"
                                            className="bg-black"
											icon={<User className="w-4 h-4" />}
										/>
									</div>
								)}

								<div className="space-y-2">
									<Label>Email</Label>
									<Input
										name="email"
										type="email"
										value={formData.email}
										onChange={handleChange}
										placeholder="Enter your email"
                                        className="bg-black"
										icon={<Mail className="w-4 h-4" />}
									/>
								</div>

								<div className="space-y-2">
									<Label>Password</Label>
									<div className="relative">
										<Input
											name="password"
											type={showPassword ? "text" : "password"}
											value={formData.password}
											onChange={handleChange}
											placeholder="Enter your password"
											className="pr-10 bg-black"
											icon={<Lock className="w-4 h-4" />}
										/>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white cursor-pointer"
										>
											{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
										</button>
									</div>
								</div>

								{activeTab === "signup" && (
									<div className="space-y-2">
										<Label>Service Access Code</Label>
										<Input
											name="inviteCode"
											value={formData.inviteCode}
											onChange={handleChange}
											placeholder="ENTER YOUR ACCESS CODE"
											className="tracking-wider uppercase bg-black"
											icon={<Key className="w-4 h-4" />}
										/>
									</div>
								)}

								<Button
									type="submit"
									disabled={isLoading}
									className="w-full bg-brand-purple hover:bg-brand-purple/90 h-12"
								>
									{isLoading
										? "Processing..."
										: activeTab === "signin"
											? "Sign In"
											: "Create Account"}
								</Button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function FeatureItem({ text }: { text: string }) {
	return (
		<div className="flex items-center gap-3">
			<div className="flex h-6 w-6 items-center justify-center rounded-full border border-brand-purple/50 bg-brand-purple/10">
				<Check className="h-3.5 w-3.5 text-brand-purple" />
			</div>
			<span className="text-white/90 font-medium">{text}</span>
		</div>
	)
}
