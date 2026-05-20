import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}

export const Progress = ({ value, className, ...props }: ProgressProps) => {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn(
        "h-2 overflow-hidden rounded-full bg-slate-100 ring-1 ring-inset ring-slate-200",
        className
      )}
      {...props}
    >
      <div
        className="h-full rounded-full bg-emerald-500 transition-all duration-500"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
};
