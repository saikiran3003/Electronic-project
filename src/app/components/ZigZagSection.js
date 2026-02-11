import Image from "next/image";

export default function ZigZagSections({ sections }) {
  return (
    <section className="py-20 bg-gray-100">
      {sections.map((section, index) => (
        <div
          key={index}
          className={`max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 mb-20 ${
            section.imageOnRight ? "md:flex-row-reverse" : ""
          }`}
        >
        
          <div className="w-full md:w-1/2 flex flex-col items-center text-center md:text-left">
            <h2 className="text-3xl font-semibold mb-4">{section.title}</h2>
            <div className="w-full flex justify-center">
              <Image
                src={section.image}
                alt={section.title}
                width={400}
                height={300}
                className="rounded-lg object-contain"
              />
            </div>
          </div>

          {/* Description */}
          <div className="w-full md:w-1/2 text-black">
            <p className="leading-relaxed">{section.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
