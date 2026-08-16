import { cn } from "@/lib/cn";

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  className,
}: {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        align === "center" && "text-center mx-auto",
        className,
      )}
    >
      <h2
        className="font-display text-[clamp(2.5rem,8vw,4.5rem)] md:text-7xl text-balance leading-none max-w-full"
        data-aos="fade-up"
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 max-w-xl text-muted text-lg",
            align === "center" && "mx-auto",
          )}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
