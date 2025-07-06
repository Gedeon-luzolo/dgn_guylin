import { ApplicationsGrid } from "../../components/applications-grid/applications-grid";
import { FlagOverlay } from "@/components/backgrounds/flag-overlay";

export const ApplicationsPage = () => {
  return (
    <div className="relative flex flex-col">
      <FlagOverlay />
      {/* Content */}
      <div
        className="relative flex-grow container mx-auto w-[90%] sm:w-5xl"
        style={{ zIndex: 2 }}
      >
        <ApplicationsGrid />
      </div>
    </div>
  );
};
