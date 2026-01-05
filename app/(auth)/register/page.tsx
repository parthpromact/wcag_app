"use client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
    const [data, setData] = useState<any>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [country, setCountry] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
        country?: string;
        terms?: string;
    }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
    const nameInputRef = useRef<HTMLInputElement>(null);
    const errorAlertRef = useRef<HTMLDivElement>(null);

    const countries = [
        { value: "", label: "Select a country" },
        { value: "us", label: "United States" },
        { value: "uk", label: "United Kingdom" },
        { value: "ca", label: "Canada" },
        { value: "au", label: "Australia" },
        { value: "in", label: "India" },
        { value: "de", label: "Germany" },
        { value: "fr", label: "France" },
        { value: "jp", label: "Japan" },
        { value: "br", label: "Brazil" },
    ];

    // Focus management for accessibility (2.4.3, 2.4.7)
    useEffect(() => {
        nameInputRef.current?.focus();
    }, []);

    // Announce errors to screen readers (3.3.1)
    useEffect(() => {
        if (Object.keys(errors).length > 0 && errorAlertRef.current) {
            errorAlertRef.current.focus();
        }
    }, [errors]);

    const validateForm = (): boolean => {
        const newErrors: typeof errors = {};

        // Name validation (3.3.1, 3.3.3)
        if (!name.trim()) {
            newErrors.name = "Full name is required.";
        } else if (name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters long.";
        }

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

        // Confirm Password validation (3.3.1, 3.3.3)
        if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password.";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match. Please re-enter your password.";
        }

        // Country validation (3.3.1, 3.3.3)
        if (!country) {
            newErrors.country = "Please select your country.";
        }

        // Terms validation (3.3.1, 3.3.4)
        if (!acceptTerms) {
            newErrors.terms = "You must accept the terms and conditions to register.";
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

        // Simulate registration process
        try {
            // Set data to state as requested
            setData({ name, email, country, registrationTime: new Date().toISOString() });
            
            // Set cookie and redirect
            document.cookie = "token=dummy-token; path=/";
            router.push("/home");
        } catch (error) {
            setErrors({ 
                email: "Registration failed. Please try again." 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (errors.name) {
            setErrors(prev => ({ ...prev, name: undefined }));
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (errors.email) {
            setErrors(prev => ({ ...prev, email: undefined }));
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (errors.password) {
            setErrors(prev => ({ ...prev, password: undefined }));
        }
        // Clear confirm password error if passwords now match
        if (confirmPassword && e.target.value === confirmPassword && errors.confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: undefined }));
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        if (errors.confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: undefined }));
        }
    };

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCountry(e.target.value);
        if (errors.country) {
            setErrors(prev => ({ ...prev, country: undefined }));
        }
    };

    const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAcceptTerms(e.target.checked);
        if (errors.terms) {
            setErrors(prev => ({ ...prev, terms: undefined }));
        }
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
                    src="/bali.jpg"
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
                                {errors.name && <li>{errors.name}</li>}
                                {errors.email && <li>{errors.email}</li>}
                                {errors.password && <li>{errors.password}</li>}
                                {errors.confirmPassword && <li>{errors.confirmPassword}</li>}
                                {errors.country && <li>{errors.country}</li>}
                                {errors.terms && <li>{errors.terms}</li>}
                            </ul>
                        </div>
                    )}

                    <div className="bg-white/95 dark:bg-card/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-2xl p-6 md:p-8">
                        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-card-foreground">
                            Start Your Journey
                        </h1>
                        <p className="text-gray-600 dark:text-muted-foreground mb-6">
                            Join TRVL and unlock access to amazing destinations around the world
                            {" "}
                            <span lang="fr" className="italic">Bon voyage!</span>
                        </p>

                        <form onSubmit={handleSubmit} noValidate aria-label="Registration form">
                            {/* Name Field (1.3.5, 3.3.2, 3.3.3) */}
                            <div className="mb-4">
                                <label 
                                    htmlFor="name" 
                                    className="block text-sm font-medium mb-2 text-gray-900 dark:text-card-foreground"
                                >
                                    Full Name
                                    <span className="text-destructive ml-1" aria-label="required">*</span>
                                </label>
                                <input
                                    ref={nameInputRef}
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    value={name}
                                    onChange={handleNameChange}
                                    aria-required="true"
                                    aria-invalid={!!errors.name}
                                    aria-describedby={errors.name ? "name-error" : undefined}
                                    className={cn(
                                        "w-full h-11 px-4 py-2 rounded-md border bg-background text-foreground",
                                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                        "disabled:opacity-50 disabled:cursor-not-allowed",
                                        "transition-all",
                                        errors.name 
                                            ? "border-destructive focus:ring-destructive/50" 
                                            : "border-input focus:border-ring"
                                    )}
                                    placeholder="Enter your full name"
                                    disabled={isSubmitting}
                                />
                                {errors.name && (
                                    <p 
                                        id="name-error" 
                                        role="alert"
                                        className="mt-2 text-sm text-destructive flex items-center gap-1"
                                    >
                                        <span aria-hidden="true">⚠</span>
                                        {errors.name}
                                    </p>
                                )}
                            </div>

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

                            {/* Country Combobox (1.3.5, 3.3.2, 3.3.3) */}
                            <div className="mb-4">
                                <label 
                                    htmlFor="country" 
                                    className="block text-sm font-medium mb-2 text-gray-900 dark:text-card-foreground"
                                >
                                    Country
                                    <span className="text-destructive ml-1" aria-label="required">*</span>
                                </label>
                                <select
                                    id="country"
                                    name="country"
                                    value={country}
                                    onChange={handleCountryChange}
                                    aria-required="true"
                                    aria-invalid={!!errors.country}
                                    aria-describedby={errors.country ? "country-error" : undefined}
                                    className={cn(
                                        "w-full h-11 px-4 py-2 rounded-md border bg-background text-foreground",
                                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                        "disabled:opacity-50 disabled:cursor-not-allowed",
                                        "transition-all appearance-none cursor-pointer",
                                        "bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M6%209L1%204h10z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-right-3 bg-[length:12px_12px]",
                                        errors.country 
                                            ? "border-destructive focus:ring-destructive/50" 
                                            : "border-input focus:border-ring"
                                    )}
                                    disabled={isSubmitting}
                                >
                                    {countries.map((countryOption) => (
                                        <option key={countryOption.value} value={countryOption.value}>
                                            {countryOption.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.country && (
                                    <p 
                                        id="country-error" 
                                        role="alert"
                                        className="mt-2 text-sm text-destructive flex items-center gap-1"
                                    >
                                        <span aria-hidden="true">⚠</span>
                                        {errors.country}
                                    </p>
                                )}
                            </div>

                            {/* Password Field (1.3.5, 3.3.2, 3.3.3) */}
                            <div className="mb-4">
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
                                        autoComplete="new-password"
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
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        aria-pressed={showPassword}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-muted-foreground hover:text-foreground transition-colors min-w-[44px] min-h-[44px]"
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

                            {/* Confirm Password Field (1.3.5, 3.3.2, 3.3.3) */}
                            <div className="mb-4">
                                <label 
                                    htmlFor="confirmPassword" 
                                    className="block text-sm font-medium mb-2 text-gray-900 dark:text-card-foreground"
                                >
                                    Confirm Password
                                    <span className="text-destructive ml-1" aria-label="required">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        aria-required="true"
                                        aria-invalid={!!errors.confirmPassword}
                                        aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
                                        className={cn(
                                            "w-full h-11 px-4 py-2 pr-12 rounded-md border bg-background text-foreground",
                                            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                            "disabled:opacity-50 disabled:cursor-not-allowed",
                                            "transition-all",
                                            errors.confirmPassword 
                                                ? "border-destructive focus:ring-destructive/50" 
                                                : "border-input focus:border-ring"
                                        )}
                                        placeholder="Re-enter your password"
                                        disabled={isSubmitting}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                        aria-pressed={showConfirmPassword}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-muted-foreground hover:text-foreground transition-colors min-w-[44px] min-h-[44px]"
                                        tabIndex={0}
                                    >
                                        <span aria-hidden="true">
                                            {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                                        </span>
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p 
                                        id="confirm-password-error" 
                                        role="alert"
                                        className="mt-2 text-sm text-destructive flex items-center gap-1"
                                    >
                                        <span aria-hidden="true">⚠</span>
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>

                            {/* Terms and Conditions Checkbox (3.3.4) */}
                            <div className="mb-6">
                                <div className="flex items-start gap-3">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        checked={acceptTerms}
                                        onChange={handleTermsChange}
                                        aria-required="true"
                                        aria-invalid={!!errors.terms}
                                        aria-describedby={errors.terms ? "terms-error" : "terms-hint"}
                                        className={cn(
                                            "mt-1 h-5 w-5 min-w-[44px] min-h-[44px] rounded border-2 cursor-pointer",
                                            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                            "disabled:opacity-50 disabled:cursor-not-allowed",
                                            "transition-all accent-primary",
                                            errors.terms 
                                                ? "border-destructive focus:ring-destructive/50" 
                                                : "border-input"
                                        )}
                                        disabled={isSubmitting}
                                    />
                                    <label 
                                        htmlFor="terms" 
                                        className="text-sm text-gray-900 dark:text-card-foreground cursor-pointer flex-1"
                                    >
                                        I accept the{" "}
                                        <a 
                                            href="/terms-privacy" 
                                            className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Terms and Conditions and Privacy Policy
                                        </a>
                                        <span className="text-destructive ml-1" aria-label="required">*</span>
                                    </label>
                                </div>
                                <p 
                                    id="terms-hint" 
                                    className="sr-only"
                                >
                                    You must accept the terms and conditions to register.
                                </p>
                                {errors.terms && (
                                    <p 
                                        id="terms-error" 
                                        role="alert"
                                        className="mt-2 text-sm text-destructive flex items-center gap-1"
                                    >
                                        <span aria-hidden="true">⚠</span>
                                        {errors.terms}
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
                                        <span className="sr-only">Creating account</span>
                                        <span aria-hidden="true">Creating account...</span>
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </Button>
                        </form>

                        {/* Additional Links (2.4.4) */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600 dark:text-muted-foreground">
                                Already have an account?{" "}
                                <a 
                                    href="/login" 
                                    className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
                                >
                                    Login here
                                </a>
                            </p>          
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
