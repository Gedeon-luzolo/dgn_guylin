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

      {/* Fond décoratif */}
      <div className="absolute inset-0 -z-0 bg-gradient-to-r from-purple-600 via-blue-600 to-green-500 opacity-20" />
    </div>
  );
}
