import flagOverlay from "@/assets/images/flag_overlay.png";
export function FlagOverlay() {
  return (
    <div>
      <div className="absolute inset-0 -z-0">
        <img
          src={flagOverlay}
          alt=""
          className="h-full w-full object-cover opacity-40"
        />
      </div>
    </div>
  );
}
