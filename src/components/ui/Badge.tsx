import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface BadgeProps {
    children: ReactNode;
    variant?: 'cyan' | 'yellow' | 'red' | 'green' | 'outline';
    className?: string;
}

export default function Badge({ children, variant = 'cyan', className }: BadgeProps) {
    const variants = {
        cyan: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30',
        yellow: 'bg-neon-yellow/10 text-neon-yellow border-neon-yellow/30',
        red: 'bg-neon-red/10 text-neon-red border-neon-red/30',
        green: 'bg-neon-green/10 text-neon-green border-neon-green/30',
        outline: 'bg-transparent text-gray-400 border-gray-700',
    };

    return (
        <span className={cn(
            'px-2 py-0.5 rounded-full text-[10px] uppercase font-bold border tracking-wider',
            variants[variant],
            className
        )}>
            {children}
        </span>
    );
}
