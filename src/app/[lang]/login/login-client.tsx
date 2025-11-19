"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { useToast } from "@/hooks/use-toast"

interface LoginClientProps {
  lang: string
}

export function LoginClient({ lang }: LoginClientProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMessage = data.error || "Invalid email or password. Please try again."
        setError(errorMessage)
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: errorMessage,
        })
        return
      }

      // Show success toast
      toast({
        variant: "success",
        title: "Login Successful",
        description: "Welcome back! Redirecting to dashboard...",
      })

      // Redirect to dashboard on successful login
      setTimeout(() => {
        router.push(`/${lang}/dashboard`)
        router.refresh()
      }, 500)
    } catch {
      const errorMessage = "An error occurred. Please try again."
      setError(errorMessage)
      toast({
        variant: "destructive",
        title: "Login Error",
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center px-4 py-12 min-h-screen">
      <div className="w-full max-w-md">
        <Reveal>
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <Link href={`/${lang}`} className="inline-block mb-6">
              <Image
                src="/logo.png"
                alt="Northern Pathways Immigration Consulting"
                width={48}
                height={48}
                className="h-12 mx-auto"
                priority
              />
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#2c2b2b] mb-2">
              Welcome Back
            </h1>
            <p className="text-[#2c2b2b]/70 text-sm md:text-base">
              Sign in to access your account
            </p>
          </div>
        </Reveal>

        {/* Login Form */}
        <Reveal delay={0.1}>
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-[#2c2b2b] mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b92025] focus:border-[#b92025] outline-none transition-all text-[#2c2b2b] placeholder-gray-400"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-[#2c2b2b] mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b92025] focus:border-[#b92025] outline-none transition-all text-[#2c2b2b] placeholder-gray-400"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#2c2b2b] transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-[#b92025] focus:ring-[#b92025] border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-[#2c2b2b]/70"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  href={`/${lang}/forgot-password`}
                  className="text-sm font-semibold text-[#b92025] hover:text-[#7d1416] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#b92025] hover:bg-[#7d1416] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6 mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Don&apos;t have an account?
                  </span>
                </div>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <Link
                href={`/${lang}/register`}
                className="text-sm font-semibold text-[#b92025] hover:text-[#7d1416] transition-colors"
              >
                Create an account
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Footer Text */}
        <Reveal delay={0.2}>
          <div className="mt-6 text-center">
            <p className="text-xs text-[#2c2b2b]/60">
              By signing in, you agree to our{" "}
              <Link
                href={`/${lang}/terms`}
                className="text-[#b92025] hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href={`/${lang}/privacy`}
                className="text-[#b92025] hover:underline"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

