import Image from "next/image";

interface Step3Props {
  prevStep: () => void;
  nextStep: () => void;
  setOpeningType: (type: string) => void;
  selectedOpeningType: string | null;
}

const openingTypes = [
  { label: "Menteşeli", gif: "/menteseliyeni.gif", value: "menteseli" },
  { label: "Sürgülü", gif: "/surguluyeni.gif", value: "surgulu" },
];

const Step3OpeningType: React.FC<Step3Props> = ({
  prevStep,
  nextStep,
  setOpeningType,
  selectedOpeningType,
}) => (
  <div className="px-2 sm:px-4 md:px-8">
    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center">
      Açılış Türünü Seçiniz
    </h2>
    <div className="grid grid-cols-2 gap-4 justify-items-center">
      {openingTypes.map((type) => (
        <div
          key={type.label}
          className={`p-2 sm:p-4 rounded-lg cursor-pointer transition flex flex-col items-center ${
            selectedOpeningType === type.value
              ? "bg-custom-color3"
              : "bg-inherit"
          }`}
          onClick={() => setOpeningType(type.value)}
        >
          <Image
            src={type.gif}
            alt={type.label}
            width={128} // Reduced size for smaller screens
            height={128} // Reduced size for smaller screens
            className=" mb-2 w-32 h-32 sm:w-48 sm:h-48 md:w-128 md:h-128   "
            unoptimized
          />
          <span className="text-xs sm:text-sm md:text-base">{type.label}</span>
        </div>
      ))}
    </div>
    <div className="mt-4 sm:mt-6 flex justify-center gap-2 sm:gap-4">
      <button
        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-500 text-white rounded hover:bg-red-500/50 transition-colors text-sm sm:text-base"
        onClick={prevStep}
      >
        Önceki Adım
      </button>
      {selectedOpeningType && (
        <button
          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-black/80 text-white rounded hover:bg-black/50 transition-colors text-sm sm:text-base"
          onClick={nextStep}
        >
          Sonraki Adım
        </button>
      )}
    </div>
  </div>
);

export default Step3OpeningType;
