import { Spinner } from "../ui/spinner";

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Spinner className="w-8 h-8" />
    </div>
  );
}
