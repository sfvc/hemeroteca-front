type HeroSectionProps = {
  image: string;
  title?: string;
};

export default function HeroSection({ image, title }: HeroSectionProps) {
  return (
    <section className="relative w-full">
      {/* Imagen */}
      <div className="relative h-75 sm:h-90 md:h-105 lg:h-125 overflow-hidden">
        <img
          src={image}
          alt="Banner"
          className="w-full h-full object-cover object-center"
        />

        {/* overlay suave */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* texto opcional */}
        {title && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
            <h1 className="text-white text-4xl md:text-5xl font-serif font-bold">
              {title}
            </h1>

            <div className="mt-3 h-1 w-32 bg-yellow-500 mx-auto rounded-full"></div>
          </div>
        )}
      </div>
    </section>
  );
}
