import Image from "next/image";

export default function ZigZagSections() {
  const sections = [
    {
      title: "LED TV",
      description:
        "An LED display is a flat panel display that uses an array of light-emitting diodes (LEDs) as pixels for a video display. Their brightness allows them to be used outdoors where they are visible in the sun for store signs and billboards. In recent years, they have also become commonly used in destination signs on public transport vehicles, as well as variable-message signs on highways. LED displays are capable of providing general illumination in addition to visual display, as when used for stage lighting or other decorative (as opposed to informational) purposes. LED displays can offer higher contrast ratios than a projector and are thus an alternative to traditional projection screens, and they can be used for large, uninterrupted (without a visible grid arising from the bezels of individual displays) video walls. microLED displays are LED displays with smaller LEDs, which poses significant development challenges.",
      image: "/assets/images/tvimage.jpg",
      imageOnRight: false,
    },
    {
      title: "IPhone",
      description:
        "The iPhone is a line of smartphones developed and marketed by Apple that run iOS, the company's own mobile operating system. The first-generation iPhone was announced by then–Apple CEO and co-founder Steve Jobs on January 9, 2007, at Macworld 2007, and launched later that year. Since then, Apple has annually released new iPhone models and iOS versions; the latest models being the iPhone 17, the higher-end iPhone 17 Pro and 17 Pro Max, and the thinner iPhone Air. As of July 2025, more than 3 billion iPhones have been sold, and Apple has been the largest vendor of mobile phones since 2023.",
      image: "/assets/images/iphone15.jpg",
      imageOnRight: true,
    },
    {
      title: "Printer",
      description:
        "Epson Corporation, commonly known as Epson,[6] is a Japanese multinational electronics company and one of the world's largest manufacturers of printers and information- and imaging-related equipment. Headquartered in Suwa, Nagano, Japan,[7] the company has numerous subsidiaries worldwide and manufactures inkjet, dot matrix, thermal and laser printers for consumer, business and industrial use, scanners, laptop and desktop computers, video projectors, watches, point of sale systems, robots and industrial automation equipment, semiconductor devices, crystal oscillators, sensing systems and other associated electronic components..",
      image: "/assets/images/epsonprinter.jpg",
      imageOnRight: false,
    },
  ];

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
          <h2 className="text-3xl font-semibold mb-4 text-black">{section.title}</h2>
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

         
          <div className="w-full md:w-1/2 text-black">
            <p className="leading-relaxed">{section.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
