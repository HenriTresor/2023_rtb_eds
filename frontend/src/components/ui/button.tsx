import React from 'react'
import { Button as RadixButton } from '@radix-ui/themes'

type Props = {
    children: React.ReactNode;
    variant: 'primary' | 'secondary' | 'destruct' | 'outline';
    type?: 'submit';
    onClick?: () => void;
    className?: string;
    loading?: boolean;
    disabled?: boolean;
}

export const variants: Record<string, string> = {
    primary: "bg-[var(--primary)] text-[var(--foreground-inverse)] hover:bg-[var(--foreground-inverse)] hover:border hover:border-[var(--primary)] hover:text-[var(--primary)] duration-75 border border-transparent",
    secondary: "bg-[var(--secondary)] text-[var(--foreground)]",
    destruct: "bg-[red] text-white",
    outline: "bg-white border border-[var(--border-color)] text-[var(--foreground)]"
}

function Button({
    children,
    type,
    onClick,
    className,
    loading,
    disabled,
    variant = 'primary' }: Props) {
    return (
        <button onClick={onClick} type={type} disabled={loading || disabled} className={`${variants[variant]} ${loading && 'disabled:cursor-not-allowed bg-neutral-400 '} ${className} py-2 px-4 rounded-md cursor-pointer`}>
            {children}
        </button>
    )
}

export default Button