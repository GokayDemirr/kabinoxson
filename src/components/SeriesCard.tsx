import Link from "next/link";
import Image from "next/image"; // Next.js Image bileşeni

interface SeriesCardProps {
  id: string;
  seriesName: string;
  imageUrl: string;
  seriesDescription: string;
}

const SeriesCard: React.FC<SeriesCardProps> = ({
  id,
  seriesName,
  imageUrl,
  seriesDescription,
}) => {
  return (
    <Link href={`/series/${seriesName}`}>
      <div className="rounded-lg flex flex-col items-center cursor-pointer">
        <div className="relative w-full h-64 mb-2">
          {/* Resim konteyneri: Boyutlar burada belirlenir */}
          <Image
            src={imageUrl}
            alt={seriesName}
            layout="fill" // Tam genişlik ve yükseklik
            objectFit="cover" // Resmi kapsayacak şekilde boyutlandırır
            className="rounded-md"
            priority // Gerekirse öncelik verir
          />
        </div>
        <h2 className="tracking-wider text-2xl font-light">{seriesName}</h2>
        <p className="sm:text-base text-gray-700 text-sm ">
          {seriesDescription}
        </p>
      </div>
    </Link>
  );
};

export default SeriesCard;
