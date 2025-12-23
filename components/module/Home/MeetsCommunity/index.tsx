import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const dammyData = [
  {
    id: 1,
    image: "https://i.ibb.co.com/XZrQX1rt/Court-Image-3.png",
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/TxNxcNys/Court-Image-2.png",
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/6JRc91c6/Court-Card.png",
  },
  {
    id: 4,
    image: "https://i.ibb.co.com/TxNxcNys/Court-Image-2.png",
  },
  {
    id: 5,
    image: "https://i.ibb.co.com/XZrQX1rt/Court-Image-3.png",
  },
  {
    id: 6,
    image: "https://i.ibb.co.com/XZrQX1rt/Court-Image-3.png",
  },
  {
    id: 7,
    image: "https://i.ibb.co.com/TxNxcNys/Court-Image-2.png",
  },
];

const MeetsCommunity = () => {
  return (
    <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-12 md:py-24">
      <div className="flex w-full justify-between items-center gap-4">
        <p className="text-xl border-s-4 ps-4 border-primary ">
          Life at the Club
        </p>
        <div className="w-[50%]">
          <h2 className="text-4xl mb-4 ">Where the game meets community.</h2>
          <p className="mt-0.5 text-md">
            Experience the energy, camaraderie, and passion that makes our{" "}
            <br />
            community special
          </p>
        </div>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full "
      >
        <CarouselContent>
          {dammyData?.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <div>
                  <div className="flex aspect-square items-center justify-center p-6">
                    <Image
                      src={item.image}
                      alt="image"
                      width={500}
                      height={500}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default MeetsCommunity;
