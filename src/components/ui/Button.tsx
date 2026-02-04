import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'neon-cyan' | 'neon-yellow' | 'neon-red' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        const variants = {
            primary: 'bg-white text-navy-deep hover:bg-gray-200',
            secondary: 'bg-navy-dark text-white border border-white/20 hover:border-white/40',
            'neon-cyan': 'border-2 neon-border-cyan neon-text-cyan hover:bg-neon-cyan/10',
            'neon-yellow': 'border-2 border-neon-yellow text-neon-yellow shadow-neon-yellow hover:bg-neon-yellow/10',
            'neon-red': 'border-2 border-neon-red text-neon-red hover:bg-neon-red/10',
            outline: 'border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white',
            ghost: 'bg-transparent text-gray-400 hover:text-white',
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-xs',
            md: 'px-6 py-2.5 text-sm',
            lg: 'px-8 py-3 text-base',
            icon: 'p-2',
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-sm font-bold tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export default Button;
