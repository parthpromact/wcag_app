/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/common/AppIcon';

const FooterSection = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentYear, setCurrentYear] = useState('2024');

  useEffect(() => {
    setIsHydrated(true);
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const footerLinks = {
    company: [
      { label: 'Privacy Policy', href: '//terms-privacy' },
      { label: 'Contact Us', href: '/contact' }
    ],
    explore: [
      { label: 'Home', href: '/home' },
      { label: 'Explore Us', href: '/explore' },
      { label: 'Experiences', href: '/experiences' },
      { label: 'Destinations', href: '/accessible-destinations' },
    ],
    legal: [
      { label: 'Terms and conditions', href: '/terms-privacy' },
    ]

  };

  const socialLinks = [
    { name: 'Go to Home Page', icon: 'ShareIcon', href: '#' },
    { name: 'Go to Explore Page', icon: 'ChatBubbleLeftRightIcon', href: '#' },
    { name: 'Go to Experience Page', icon: 'CameraIcon', href: '#' },
    { name: 'Go to Contact Us Page', icon: 'BriefcaseIcon', href: '#' }
  ];

  return (
    <footer className="bg-card-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-8">
          <div className="lg:col-span-3 md:col-span-1 col-span-4">
            <Link href="/homepage" className="flex items-center space-x-2 mb-4">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-muted"
              >
                <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" fill="none" />
                <path
                  d="M20 8C13.373 8 8 13.373 8 20C8 26.627 13.373 32 20 32C26.627 32 32 26.627 32 20C32 13.373 26.627 8 20 8ZM20 10C25.514 10 30 14.486 30 20C30 25.514 25.514 30 20 30C14.486 30 10 25.514 10 20C10 14.486 14.486 10 20 10Z"
                  fill="currentColor"
                />
                <path
                  d="M20 14C16.686 14 14 16.686 14 20C14 23.314 16.686 26 20 26C23.314 26 26 23.314 26 20C26 16.686 23.314 14 20 14ZM20 16C22.209 16 24 17.791 24 20C24 22.209 22.209 24 20 24C17.791 24 16 22.209 16 20C16 17.791 17.791 16 20 16Z"
                  fill="var(--color-accent)"
                />
              </svg>
              <span className="text-xl font-headline font-bold text-muted">TRVL</span>
            </Link>
            <p className="text-sm text-muted mb-4">
              Making travel accessible, meaningful, and transformative for everyone. Travel Without Limits.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border border-ternary hover:bg-ternary"
                  aria-label={social.name}
                >
                  <Icon name={social.icon as any} size={20} className="text-primary" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-headline font-bold text-muted mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-primary transition-colors duration-200 focus:outline-none focus:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-headline font-bold text-muted mb-4">Explore</h3>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-primary transition-colors duration-200 focus:outline-none focus:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-headline font-bold text-muted mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-primary transition-colors duration-200 focus:outline-none focus:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted">
              {isHydrated ? `© ${currentYear}` : '© 2024'} TRVL Travel. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="shield-check" size={16} className="text-muted" />
                <span className="text-xs text-muted">WCAG 2.1 AA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="badge-check" size={16} className="text-muted" />
                <span className="text-xs text-muted">ADA Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;