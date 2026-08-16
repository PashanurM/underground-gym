import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  onClick,
  disabled,
}: Props) {
  const classes = cn(
    variant === "primary" ? "btn-primary" : "btn-ghost",
    "cursor-pointer",
    disabled && "opacity-50 pointer-events-none cursor-not-allowed",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      <span>{children}</span>
    </button>
  );
}
