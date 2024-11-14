import Image from "next/image";

export default function About() {
  return (
    <section className="relative w-full min-h-screen flex flex-col sm:items-center sm:justify-center text-white p-4 ">
      <div className="flex lg:flex-row-reverse  flex-col w-full justify-center items-center gap-8 ">
        {/* Right Image (reversed in flex) */}
        <div className="relative w-full mt-24 md:w-2/5 md:mt-24 lg:w-3/5 sm:mt-24 sm:w-3/5 deneme:w-3/5">
          <Image
            src="/hakkimizda.jpeg"
            alt="About Us Image Left"
            layout="responsive"
            width={100}
            height={100}
            objectFit="cover"
            className="rounded-3xl shadow-lg"
          />
        </div>

        {/* Left Text with Justified Alignment */}
        <div className="w-full flex flex-col justify-center items-center lg:items-start	gap-4 fhdustu:gap-16 text-justify leading-relaxed space-y-4  bg-white/50  text-black">
          <h1 className="tracking-widest  lg:text-2xl font-light lg:mt-12 sm:text-xl text-xl fhdustu:text-6xl ">
            HAKKIMIZDA
          </h1>
          <p className="lg:text-md text-base fhdustu:text-2xl">
            KABİNOX Markası 2024 yılı içerisinde tescillenmiş SR Design
            markasıdır. SR Design Firması, Serdar Turgut tarafından 2021 yılında
            resmi şirket kuruluşunu yapmış 17 yıllık bir markadır. Bir çok
            yurtiçi ve yurtdışı projelerde nitelikli ürün tasarımları ve
            imalatlarını yapmıştır.
          </p>
          <p className="lg:text-md text-base fhdustu:text-2xl">
            SR Design tüm ürünlerin mekanik tasarımlarını kendi bünyesinde
            yapmaktadır. SR Design ayrıca Matto Bagno markasının da kurucusu ve
            sahibidir. Matto Bagno alüminyum profilli ileri teknoloji duş
            kabinlerini üretiyor.
          </p>
          <p className="lg:text-md text-base fhdustu:text-2xl">
            Kabinox ise paslanmaz çelik ve özel renk kaplamalı ürün seçenekleri
            sunan, üst segment ürün grubu ile standart ve özel tasarım ürünler
            üretmektedir. 17 yıllık Ar-Ge ve mühendislik tecrübesi
            markalarımızın asıl kimliğini yansıtmaktadır.
          </p>
          <p className="lg:text-md text-base fhdustu:text-2xl">
            Sürekli iyileştirme, geliştirme, mühendislik ve müşteri odaklı
            tasarım gibi bir çok başlık ile ilerleyen yıllarda atılacak adımlar
            2020 yılında belirlenmiştir. Her yıl farklı bir yenilikle sektörün
            ihtiyaç duyduğu vizyonumuz hazırdır.
          </p>
          <p className="lg:text-md text-base fhdustu:text-2xl">
            Daha fazlasını hayal etmenizden ve çılgın banyo tasarımlarınıza
            yenilikçi çözümler üretmekten keyif alıyoruz..
          </p>
        </div>
      </div>
    </section>
  );
}
