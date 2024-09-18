import LocationIcon from "./LocationIcon";
import MailIcon from "./MailIcon";
import PhoneIcon from "./PhoneIcon";

export default function ContactInformations() {
  return (
    <div className="flex flex-col justify-around mt-16 gap-20">
      <div className="flex  items-center gap-4">
        <PhoneIcon width="80px" />
        <p className="text-white mt-2 font-semibold">+90 5437845535</p>
      </div>

      <div className="flex items-center gap-4">
        <MailIcon width="80px" />
        <p className="text-white mt-2 font-semibold">info@srdesign.com.tr</p>
      </div>

      <div className="flex items-center gap-4">
        <LocationIcon width="80px" className="flex-shrink-0" />
        <p className="text-white mt-2 font-semibold ">
          Yenimahalle Fatih Caddesi No:33/2 Kocaeli/Çayırova
        </p>
      </div>
    </div>
  );
}
