import ContactForm from "@/components/ContactForm";
import ContactInformations from "@/components/ContactInformations";

export default function Contact() {
  return (
    <>
      <main className="p-40 flex justify-around">
        <div className="flex flex-col items-center">
          <div className="text-4xl text-custom-darkteal mb-12">Bize Ulaşın</div>

          <div className="flex gap-96 ">
            <ContactInformations />
            <ContactForm />
          </div>
        </div>
      </main>
    </>
  );
}
