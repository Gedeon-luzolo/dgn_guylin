import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function BackButton({
  to,
  className,
}: {
  to: string;
  className?: string;
}) {
  return (
    <div className="flex justify-end">
      <Link
        to={to}
        className={cn(
          "inline-flex items-center justify-start text-white hover:text-white/80 transition-colors",
          className
        )}
      >
        <ChevronLeft className="h-5 w-5" />
        <span>Retour</span>
      </Link>
    </div>
  );
}
