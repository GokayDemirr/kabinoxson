import Image from "next/image";

interface Step1Props {
  selectedShape: string | null;
  setSelectedShape: (shape: string) => void;
  nextStep: () => void;
}

const steps = [
  { label: "İki duvar arası", value: "2duvar", image: "/2duvar.png" },
  { label: "Köşe", value: "kose", image: "/kose.png" },
  { label: "Düz duvar", value: "duzDuvar", image: "/duzduvar.png" },
];

const Step1ShapeSelection: React.FC<Step1Props> = ({
  selectedShape,
  setSelectedShape,
  nextStep,
}) => {
  return (
    <>
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
        İstediğiniz köşe şeklini seçiniz
      </h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {steps.map((shape) => (
          <div
            key={shape.label}
            className={`p-4 rounded-lg text-center cursor-pointer transition flex flex-col items-center ${
              selectedShape === shape.value ? "bg-gray-500/30" : "bg-inherit"
            }`}
            onClick={() => {
              setSelectedShape(shape.value);
            }}
          >
            <Image
              src={shape.image}
              alt={shape.label}
              width={128}
              height={128}
              className="mx-auto mb-2 md:w-40 md:h-40"
            />
            <span className="text-sm md:text-base">{shape.label}</span>
          </div>
        ))}
      </div>
      {selectedShape && (
        <div className="mt-6 flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-black/80 text-white rounded hover:bg-black/50 transition-colors"
            onClick={nextStep}
          >
            Devam Et
          </button>
        </div>
      )}
    </>
  );
};

export default Step1ShapeSelection;
