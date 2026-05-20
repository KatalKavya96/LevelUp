import { cn } from "@/lib/utils";

export const Card = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-slate-200 bg-white shadow-soft",
        className
      )}
      {...props}
    />
  );
};
