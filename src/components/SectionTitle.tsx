import { ReactNode } from "react";

interface SectionTitleProps {
  index: string;
  children: ReactNode;
}

const SectionTitle = ({ index, children }: SectionTitleProps) => (
  <div className="flex items-center gap-4 mb-10 md:mb-14 animate-fade-in">
    <h2 className="text-2xl md:text-3xl font-bold whitespace-nowrap">
      <span className="font-mono text-primary text-lg md:text-xl mr-2">
        {index}.
      </span>
      {children}
    </h2>
    <div className="h-px bg-border flex-1 max-w-[260px]"></div>
  </div>
);

export default SectionTitle;
