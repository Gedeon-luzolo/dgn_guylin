import { ApplicationsGrid } from "../../components/applications-grid/applications-grid";
import flagImage from "../../assets/images/flag.png";

export const ApplicationsPage = () => {
  return (
    <div className="relative flex flex-col">
      {/* Background with flag overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-blue-700 to-blue-900"
        style={{ zIndex: 0 }}
      />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${flagImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        }}
      />

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
