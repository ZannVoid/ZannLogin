import type { ReactNode } from "react";
import { MotionReveal } from "@/components/motion-reveal";
import { SectionHeading } from "@/components/section-heading";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  badge?: string;
  className?: string;
  children?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  badge,
  className,
  children,
}: PageHeroProps) {
  return (
    <MotionReveal className={className}>
      <section className="section-shell rounded-[2.35rem] p-6 sm:p-8 lg:p-10">
        <div
          className={`grid gap-8 ${
            children ? "lg:grid-cols-[1.06fr_0.94fr] lg:items-end" : ""
          }`}
        >
          <div>
            {badge ? (
              <div className="mb-5 inline-flex rounded-full border border-primary/22 bg-primary/10 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-primary">
                {badge}
              </div>
            ) : null}
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              description={description}
            />
          </div>

          {children ? <div className="grid gap-4">{children}</div> : null}
        </div>
      </section>
    </MotionReveal>
  );
}
