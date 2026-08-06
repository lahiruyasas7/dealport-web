"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/features/auth/auth.schema";
import { useLogin } from "@/features/auth/hooks/use-login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  TrendingUp,
  Users,
  Shield,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    login.mutate(data);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel — Branding (hidden on mobile/tablet) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] bg-primary relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

        {/* Decorative blobs */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px]" />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-20 h-full">
          {/* Logo */}
          <div>
            <Image
              src="/dealport-logo.svg"
              alt="Dealport"
              width={160}
              height={36}
              className="brightness-0 invert"
              priority
            />
          </div>

          {/* Value props */}
          <div className="space-y-8 max-w-lg">
            <h2 className="text-4xl xl:text-5xl font-bold text-white leading-[1.15] tracking-tight">
              Manage your business with confidence
            </h2>
            <p className="text-lg text-white/75 leading-relaxed">
              Streamline orders, track real-time sales, and scale your
              e-commerce operations from a single dashboard.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: ShoppingBag, label: "Order Management" },
                { icon: TrendingUp, label: "Sales Analytics" },
                { icon: Users, label: "Customer Insights" },
                { icon: Shield, label: "Secure Platform" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3.5 border border-white/10"
                >
                  <Icon className="w-4.5 h-4.5 text-white shrink-0" />
                  <span className="text-white text-sm font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Dealport. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 bg-muted/30">
        <div className="w-full max-w-[420px] space-y-8">
          {/* Mobile-only logo */}
          <div className="lg:hidden flex justify-center mb-6">
            <Image
              src="/dealport-logo.svg"
              alt="Dealport"
              width={140}
              height={32}
              priority
            />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-[#023337]">
              Welcome back
            </h1>
            <p className="text-muted-foreground">
              Sign in to your account to access the dashboard
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@dealport.com"
                  className="pl-10 h-11 rounded-lg border-input bg-background transition-colors focus-visible:ring-primary"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-error font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password with show/hide toggle */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-foreground font-medium"
                >
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-11 rounded-lg border-input bg-background transition-colors focus-visible:ring-primary"
                  {...register("password")}
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={0}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-error font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me */}
            <div className="flex items-center space-x-2.5">
              <Checkbox
                id="remember"
                className="rounded-md border-input data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me for 30 days
              </label>
            </div>

            {/* Error message */}
            {login.isError && (
              <div className="rounded-lg bg-error/10 px-4 py-3 text-sm text-error font-medium">
                {login.error instanceof Error
                  ? login.error.message
                  : "Login failed. Please check your credentials and try again."}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-11 rounded-full font-semibold text-base transition-all hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98]"
              disabled={login.isPending}
            >
              {login.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign in
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Need an account?{" "}
            <Link
              href="/#"
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Contact your administrator
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
