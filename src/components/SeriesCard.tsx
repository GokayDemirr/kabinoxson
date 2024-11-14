import Link from "next/link";

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
        <img src={imageUrl} alt={seriesName} className="rounded-md mb-2" />
        <h2 className="tracking-wider text-3xl font-light">{seriesName}</h2>
        <p className="text-gray-700 ">{seriesDescription}</p>
      </div>
    </Link>
  );
};

export default SeriesCard;
