import Article from "@/components/AboutArticle";
import MailIcon from "@/components/MailIcon";
import TraitCard from "@/components/TraitCard";
import Image from "next/image";

export default function About() {
  const traitCardsData = [
    { icon: MailIcon, description: "Bu bir örnek yazıdır." },
    { icon: MailIcon, description: "Bu bir örnek yazıdır." },
    { icon: MailIcon, description: "Bu bir örnek yazıdırrr." },
  ];
  return (
    <div className="flex flex-col mt-36  ">
      <div className="flex justify-between items-start">
        <Article
          title="Hakkımızda"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur tempora, maxime at provident ipsa praesentium nihil nobis excepturi voluptates recusandae! Quasi asperiores rem ea explicabo repudiandae eum voluptatem dolor eos?"
        />
        <div className="relative w-[400px] h-[300px] ml-8">
          <Image
            src="/kabin1.jpg" // public klasöründeki resmin yolu
            alt="About Us Image"
            layout="fill" // Resmi bulunduğu container'ın boyutuna göre ayarlar
            objectFit="cover" // Resmi container'ın boyutlarına göre ayarlar, kırpma yapabilir
            className="image-with-gradient"
          />
        </div>
      </div>
      <div className="flex mt-32 justify-center gap-64">
        {traitCardsData.map((trait, index) => (
          <TraitCard
            key={index}
            IconComponent={trait.icon}
            iconWidth="64px"
            description={trait.description}
          />
        ))}
      </div>
    </div>
  );
}
