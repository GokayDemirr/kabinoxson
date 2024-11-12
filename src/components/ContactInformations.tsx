import InstagramIcon from "./InstagramIcon";
import LinkedinIcon from "./LinkedinIcon";
import LocationIcon from "./LocationIcon";
import MailIcon from "./MailIcon";
import PhoneIcon from "./PhoneIcon";

export default function ContactInformations() {
  return (
    <div className="flex flex-col items-center gap-12 sm:gap-32 ">
      <div className="tracking-widest text-2xl font-light sm:text-3xl">
        İLETİŞİM BİLGİLERİ
      </div>
      <div className="flex flex-col    ">
        <div className="flex flex-col items-center gap-4">
          <span className="text-lg tracking-wider">+850 307 76 78 00</span>
        </div>

        <div className="flex flex-col items-center gap-4 ">
          <span className="text-lg tracking-wider">info@kabinox.com</span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="font-semibold text-xl tracking-wider">Ofis Adresi</div>
        <div className="text-md tracking-wide">
          Özgürlük Mh. Aşık Veysel Cd. 38/A
        </div>
        <div className="text-lg tracking-wide "> Çayırova/KOCAELİ</div>
      </div>
      <div className="flex items-center gap-8">
        <InstagramIcon className="w-10 h-10" />
        <LinkedinIcon className="w-12 h-12" />
      </div>
    </div>
  );
}
