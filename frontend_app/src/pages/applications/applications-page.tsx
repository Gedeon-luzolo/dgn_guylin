import { ApplicationsGrid } from "../../components/applications-grid/applications-grid";
import { FlagOverlay } from "@/components/backgrounds/flag-overlay";

export const ApplicationsPage = () => {
  return (
    <div className="relative flex flex-col">
      <FlagOverlay />
      {/* Content */}
      <div className="relative flex-grow widthpx mx-auto" style={{ zIndex: 2 }}>
        <ApplicationsGrid />
      </div>
    </div>
  );
};
