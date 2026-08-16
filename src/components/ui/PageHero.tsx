export function PageHero({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  return (
    <div className="page-hero">
      <div className="container-forge">
        {eyebrow ? (
          <p
            className="mb-3 text-xs uppercase tracking-[0.25em] text-accent"
            data-aos="fade-down"
            data-aos-duration="700"
          >
            {eyebrow}
          </p>
        ) : null}
        <h1
          className="font-display text-[clamp(2.75rem,9vw,7rem)] leading-none max-w-full"
          data-aos="fade-up"
          data-aos-delay="80"
        >
          {title}
        </h1>
        {subtitle ? (
          <p
            className="mt-4 max-w-2xl text-lg text-muted"
            data-aos="fade-up"
            data-aos-delay="160"
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}
