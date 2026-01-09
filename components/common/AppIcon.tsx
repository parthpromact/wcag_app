/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const normalizeIconName = (name: string) => {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .replace(/\s+/g, '');
};

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  strokeWidth?: number;
  [key: string]: any;
}

const Icon = ({
  name,
  size = 24,
  className,
  onClick,
  disabled = false,
  strokeWidth = 2,
  ...props
}: IconProps) => {
  const iconName = normalizeIconName(name);
  const IconComponent =
    LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType | undefined;

  const classes = cn(
    disabled
      ? 'opacity-50 cursor-not-allowed'
      : onClick
      ? 'cursor-pointer hover:opacity-80 transition-opacity'
      : '',
    className
  );

  if (!IconComponent) {
    return (
      <HelpCircle
        size={size}
        strokeWidth={strokeWidth}
        className={cn('text-muted-background', classes)}
      />
    );
  }

  return (
    <IconComponent
      size={size}
      strokeWidth={strokeWidth}
      className={classes}
      onClick={disabled ? undefined : onClick}
      {...props}
    />
  );
};

export default Icon;
