import { cn } from "@/lib/utils";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Spinner = ({ className, ...props }: SpinnerProps) => {
  return (
    <div
      className={cn(
        "inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]",
        className
      )}
      role="status"
      {...props}
    >
      <span className="sr-only">Chargement...</span>
    </div>
  );
};
