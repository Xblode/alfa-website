const shapes = {
  promises: [
    "absolute -top-16 right-[8%] size-40 rounded-full bg-primary/20",
    "absolute top-8 -left-14 size-56 rounded-[42%] bg-primary/10",
    "absolute bottom-4 left-[16%] size-16 rounded-full bg-primary/25",
    "absolute -right-6 bottom-0 size-32 rotate-12 rounded-3xl bg-primary/15",
    "absolute top-1/2 right-[3%] size-10 rounded-full bg-primary/30",
  ],
  spaces: [
    "absolute -top-10 left-[3%] size-36 rounded-full bg-white/20",
    "absolute top-28 -left-12 size-52 rounded-[40%] bg-primary-100/25",
    "absolute bottom-8 left-[20%] size-14 rounded-full bg-white/35",
    "absolute top-6 right-[5%] size-28 rounded-full bg-primary/20 max-md:bg-white/20",
    "absolute top-[42%] -right-10 size-36 rotate-12 rounded-3xl bg-primary/15 max-md:bg-white/15",
    "absolute right-[16%] bottom-14 size-12 rounded-full bg-primary/30 max-md:bg-white/30",
  ],
  services: [
    "absolute bottom-10 left-[8%] size-20 rounded-full bg-primary/15",
    "absolute right-[22%] bottom-16 size-14 rounded-full bg-primary/30",
  ],
  articles: [
    "absolute bottom-8 left-[7%] size-28 rounded-full bg-primary/15",
    "absolute right-[4%] bottom-6 size-28 rounded-full bg-primary/15",
    "absolute bottom-3 left-1/2 size-14 -translate-x-1/2 rounded-full bg-primary/25",
  ],
} as const;

export function SectionShapes({ variant }: { variant: keyof typeof shapes }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {shapes[variant].map((className) => (
        <span key={className} className={`absolute ${className}`} />
      ))}
    </div>
  );
}
