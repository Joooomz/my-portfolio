type SectionHeaderProps = {
  eyebrow: string
  title: string
  description?: string
}

function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <header className="relative z-10 mb-8 max-w-3xl sm:mb-10 lg:mb-12">
      <p className="mb-3 inline-flex items-center gap-3 font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] text-brandgreen-500 before:h-px before:w-8 before:bg-brandyellow-500 sm:mb-4 sm:text-xs sm:before:w-9">
        {eyebrow}
      </p>

      <h2 className="max-w-4xl text-[clamp(2.15rem,9vw,3.35rem)] font-extrabold leading-[1] tracking-[-0.055em] text-stonegrid-950 lg:text-[clamp(3.25rem,4.7vw,4.6rem)]">
        {title}
      </h2>

      {description ? (
        <p className="mt-4 max-w-2xl text-[1rem] leading-7 text-stonegrid-600 sm:text-[1.05rem] sm:leading-8 lg:text-[1.1rem]">
          {description}
        </p>
      ) : null}
    </header>
  )
}

export default SectionHeader