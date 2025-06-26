import { slides } from "@/lib/slideItem";
import { Carousel } from "../../components/carousel/carousel";
import { CarteRDC } from "../../components/carte-rdc";
import { useResponsiveDimensions } from "@/hooks/useResponsiveDimension";

export const HomePage = () => {
  const { width, height } = useResponsiveDimensions(600, 500);

  return (
    <div className="w-full">
      <div className="w-full">
        <Carousel slides={slides} autoPlayInterval={6000} />

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 w-full py-16">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 px-6 md:px-0 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
              {/* Section titre et description */}
              <div className="lg:col-span-1 text-center lg:text-left">
                <div className="mb-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight ">
                    CARTE CARTOGRAPHIQUE DE NOS SIÈGES
                  </h2>
                  <div className="w-16 h-1 bg-blue-600 mx-auto lg:mx-0 mb-4"></div>
                  <p className="text-gray-600 text-lg leading-relaxed text-justify md:text-left">
                    Nous sommes présents dans plus de 5 provinces stratégiques
                    en RDC. Découvrez la répartition géographique de nos sièges
                    à travers le territoire national.
                  </p>
                </div>

                {/* Statistiques */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <div className="text-2xl font-bold text-blue-600">5</div>
                    <div className="text-sm text-gray-600">
                      Provinces couvertes
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <div className="text-2xl font-bold text-blue-600">26</div>
                    <div className="text-sm text-gray-600">
                      Total provinces RDC
                    </div>
                  </div>
                </div>
              </div>

              {/* Section carte */}
              <div className="lg:col-span-2">
                <div className=" rounded-2xl sm:p-6">
                  <div className="flex flex-col items-center">
                    {/* Carte responsive */}
                    <div className="w-full flex justify-center mb-4 sm:mb-6">
                      <div className="relative rounded-lg p-2">
                        <CarteRDC width={width} height={height} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
