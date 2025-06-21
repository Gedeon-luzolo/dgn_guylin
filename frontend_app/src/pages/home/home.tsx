import { Carousel } from "@/components/carousel/carousel";
import { slides } from "@/lib/slideItem";

export const HomePage = () => {
  return (
    <div className="min-h-screen z-50 bg-[var(--dgn-blue)]">
      <Carousel slides={slides} autoPlayInterval={6000} />
    </div>
  );
};
