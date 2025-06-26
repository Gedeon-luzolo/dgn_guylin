import { Carousel } from "@/components/carousel/carousel";
import { CarteRDC } from "@/components/carte-rdc";
import { slides } from "@/lib/slideItem";

export const HomePage = () => {
  return (
    <div className="min-h-screen z-5">
      <Carousel slides={slides} autoPlayInterval={6000} />

      <div className="py-20 px-10 bg-white mx-auto flex items-center justify-center">
        <CarteRDC
          width={800}
          height={600}
          onProvinceClick={(nom, valeur) => console.log(nom, valeur)}
          showLegend={true}
        />
      </div>
    </div>
  );
};
