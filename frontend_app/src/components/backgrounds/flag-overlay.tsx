import flagOverlay from "@/assets/images/Background.png";
import { cn } from "@/lib/utils";
export function FlagOverlay({ className }: { className?: string }) {
  return (
    <div>
      <div className={cn("absolute inset-0 -z-0", className)}>
        <img
          src={flagOverlay}
          alt=""
          className="h-full w-full object-cover opacity-80"
        />
      </div>
    </div>
  );
}
