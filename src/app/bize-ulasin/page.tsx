import ContactForm from "@/components/ContactForm";
import ContactInformations from "@/components/ContactInformations";

export default function Contact() {
  return (
    <main className="py-12">
      <div className="flex fhdustu:mt-48 flex-col gap-4 lg:gap-12 justify-center items-center">
        <h1 className="mt-8 lg:mt-12 fhdustu:mt-0 fhdustu:mb-24 tracking-widest text-2xl lg:text-3xl font-light text-center">
          Bize Ulaşın
        </h1>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 justify-center items-center lg:items-start w-full max-w-screen-lg px-4 ">
          {/* Make the layout vertical on small screens and horizontal on large screens */}
          <ContactForm />
          <ContactInformations />
        </div>
      </div>
    </main>
  );
}
