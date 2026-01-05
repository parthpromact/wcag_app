"use client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
    const [data, setData] = useState<any>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const emailInputRef = useRef<HTMLInputElement>(null);
    const errorAlertRef = useRef<HTMLDivElement>(null);

    // Focus management for accessibility (2.4.3, 2.4.7)
    useEffect(() => {
        emailInputRef.current?.focus();
    }, []);

    // Announce errors to screen readers (3.3.1)
    useEffect(() => {
        if (Object.keys(errors).length > 0 && errorAlertRef.current) {
            errorAlertRef.current.focus();
        }
    }, [errors]);

    const validateForm = (): boolean => {
        const newErrors: { email?: string; password?: string } = {};

        // Email validation (3.3.1, 3.3.3)
        if (!email.trim()) {
            newErrors.email = "Email address is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email address. Example: user@example.com";
        }

        // Password validation (3.3.1, 3.3.3)
        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        // Validate form (3.3.1)
        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        // Simulate login process
        try {
            // Set data to state as requested
            setData({ email, loginTime: new Date().toISOString() });
            
            // Set cookie and redirect
            document.cookie = "token=dummy-token; path=/";
            router.push("/home");
        } catch (error) {
            setErrors({ 
                email: "Login failed. Please check your credentials and try again." 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        // Clear error when user starts typing (3.3.1)
        if (errors.email) {
            setErrors(prev => ({ ...prev, email: undefined }));
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        // Clear error when user starts typing (3.3.1)
        if (errors.password) {
            setErrors(prev => ({ ...prev, password: undefined }));
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            {/* Skip to main content link (2.4.1) */}
            <a 
                href="#main-content" 
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
                Skip to main content
            </a>

            <main 
                id="main-content" 
                className="relative min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden"
                role="main"
            >
                {/* Background Image */}
                <Image
                    src="/hero-image.jpg"
                    alt=""
                    aria-hidden="true"
                    fill
                    priority
                    className="object-cover"
                />
                
                {/* Overlay for better contrast (WCAG 1.4.3) */}
                <div 
                    aria-hidden="true" 
                    className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"
                />

                <div className="relative z-10 w-full max-w-md">
                    {/* Logo */}
                    <div className="mb-6 text-center">
                        <Link
                            href="/"
                            aria-label="TRVL App logo, navigate to home page"
                            className="inline-block focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded-lg"
                        >
                            <Image 
                                src="/trvl-logo.svg" 
                                alt="TRVL App" 
                                width={120} 
                                height={120}
                                className="mx-auto"
                            />
                        </Link>
                    </div>

                    {/* Error alert for screen readers (3.3.1) */}
                    {Object.keys(errors).length > 0 && (
                        <div
                            ref={errorAlertRef}
                            role="alert"
                            aria-live="polite"
                            aria-atomic="true"
                            className="mb-4 p-4 rounded-md bg-destructive/90 border-2 border-destructive text-white backdrop-blur-sm"
                            tabIndex={-1}
                        >
                            <h2 className="font-semibold mb-2">Please correct the following errors:</h2>
                            <ul className="list-disc list-inside space-y-1">
                                {errors.email && <li>{errors.email}</li>}
                                {errors.password && <li>{errors.password}</li>}
                            </ul>
                        </div>
                    )}

                    <div className="bg-white/95 dark:bg-card/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-2xl p-6 md:p-8">
                        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-card-foreground">
                            Welcome Back, Explorer!
                        </h1>
                        <p className="text-gray-600 dark:text-muted-foreground mb-6">
                            Sign in to continue your journey and discover amazing destinations
                            {" "}
                            <span lang="es" className="italic">¡Bienvenido de nuevo!</span>
                        </p>

                        <form onSubmit={handleSubmit} noValidate aria-label="Login form">
                            {/* Email Field (1.3.5, 3.3.2, 3.3.3) */}
                            <div className="mb-4">
                                <label 
                                    htmlFor="email" 
                                    className="block text-sm font-medium mb-2 text-gray-900 dark:text-card-foreground"
                                >
                                    Email Address
                                    <span className="text-destructive ml-1" aria-label="required">*</span>
                                </label>
                                <input
                                    ref={emailInputRef}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    aria-required="true"
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                    className={cn(
                                        "w-full h-11 px-4 py-2 rounded-md border bg-background text-foreground",
                                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                        "disabled:opacity-50 disabled:cursor-not-allowed",
                                        "transition-all",
                                        errors.email 
                                            ? "border-destructive focus:ring-destructive/50" 
                                            : "border-input focus:border-ring"
                                    )}
                                    placeholder="Enter your email address"
                                    disabled={isSubmitting}
                                />
                                {errors.email && (
                                    <p 
                                        id="email-error" 
                                        role="alert"
                                        className="mt-2 text-sm text-destructive flex items-center gap-1"
                                    >
                                        <span aria-hidden="true">⚠</span>
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password Field (1.3.5, 3.3.2, 3.3.3) */}
                            <div className="mb-6">
                                <label 
                                    htmlFor="password" 
                                    className="block text-sm font-medium mb-2 text-gray-900 dark:text-card-foreground"
                                >
                                    Password
                                    <span className="text-destructive ml-1" aria-label="required">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        aria-required="true"
                                        aria-invalid={!!errors.password}
                                        aria-describedby={errors.password ? "password-error" : "password-hint"}
                                        className={cn(
                                            "w-full h-11 px-4 py-2 pr-12 rounded-md border bg-background text-foreground",
                                            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                            "disabled:opacity-50 disabled:cursor-not-allowed",
                                            "transition-all",
                                            errors.password 
                                                ? "border-destructive focus:ring-destructive/50" 
                                                : "border-input focus:border-ring"
                                        )}
                                        placeholder="Enter your password"
                                        disabled={isSubmitting}
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        aria-pressed={showPassword}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-muted-foreground hover:text-foreground transition-colors"
                                        tabIndex={0}
                                    >
                                        <span aria-hidden="true">
                                            {showPassword ? "👁️" : "👁️‍🗨️"}
                                        </span>
                                    </button>
                                </div>
                                <p 
                                    id="password-hint" 
                                    className="mt-2 text-sm text-muted-foreground"
                                >
                                    Password must be at least 8 characters long.
                                </p>
                                {errors.password && (
                                    <p 
                                        id="password-error" 
                                        role="alert"
                                        className="mt-2 text-sm text-destructive flex items-center gap-1"
                                    >
                                        <span aria-hidden="true">⚠</span>
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button (2.5.5 - 44x44px minimum) */}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-11 min-h-[44px] text-base font-medium"
                                aria-busy={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="sr-only">Logging in</span>
                                        <span aria-hidden="true">Logging in...</span>
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </form>

                        {/* Additional Links (2.4.4) */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600 dark:text-muted-foreground">
                                Don't have an account?{" "}
                                <a 
                                    href="/register" 
                                    className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
                                >
                                    Register here
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
