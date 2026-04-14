type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow text-xs sm:text-sm">{eyebrow}</p>
      <h2 className="mt-4 font-headline text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
        {description}
      </p>
    </div>
  );
}
