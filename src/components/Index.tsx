"use client";
import React, { useEffect } from "react";
import "./styles.css"; // Dosya yolunu doğrulayın

const Index: React.FC = () => {
  useEffect(() => {
    // JavaScript dosyalarını yükle
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const loadScripts = async () => {
      await loadScript("../utils/jquery.js");
      await loadScript("../utils/plugins.js");
      await loadScript("../utils/init.js");
    };

    loadScripts();

    // Sayfa yüklendiğinde çalışacak kodlar
    const handleScroll = () => {
      const downButton = document.querySelector(
        ".waxon_tm_down"
      ) as HTMLElement;
      if (downButton) {
        const position = window.pageYOffset > 100 ? "fixed" : "";
        downButton.setAttribute("data-position", position);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* PRELOADER */}
      <div className="waxon_tm_preloader">
        <div className="spinner_wrap">
          <div className="spinner"></div>
        </div>
      </div>
      {/* WRAPPER ALL */}
      <div className="waxon_tm_all_wrap" data-magic-cursor="show">
        {/* MAGIC CURSOR VALUES: show, hide */}
        {/* TOPBAR */}
        <div className="waxon_tm_topbar home">
          <div className="container">
            <div className="topbar_inner">
              <div className="logo">
                <a href="#">
                  <img alt="" src="/img/logo/mobile-logo-sr-40.png" />{" "}
                </a>
              </div>
              <div className="menu">
                <div className="links">
                  <ul className="anchor_nav">
                    <li className="current">
                      <a href="#home">
                        <span className="first">Anasayfa</span>{" "}
                        <span className="second">Anasayfa</span>{" "}
                      </a>
                    </li>
                    <li>
                      <a href="#about">
                        <span className="first">Hakkımızda</span>{" "}
                        <span className="second">Hakkımızda</span>{" "}
                      </a>
                    </li>
                    <li>
                      <a href="#portfolio">
                        <span className="first">Portfolyo</span>{" "}
                        <span className="second">Portfolyo</span>{" "}
                      </a>
                    </li>
                    <li>
                      <a href="#contact">
                        <span className="first">İletişim</span>{" "}
                        <span className="second">İletişim</span>{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /TOPBAR */}
        {/* MOBILE MENU */}
        <div className="waxon_tm_mobile_menu">
          <div className="topbar_inner">
            <div className="container bigger">
              <div className="topbar_in">
                <div className="logo">
                  <a href="#">
                    <img alt="" src="/img/logo/mobile-logo-sr-40.png" />
                  </a>
                </div>
                <div className="my_trigger">
                  <div className="hamburger hamburger--collapse-r">
                    <div className="hamburger-box">
                      <div className="hamburger-inner"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown">
            <div className="container">
              <div className="dropdown_inner">
                <ul className="anchor_nav">
                  <li>
                    <a href="#home">Anasayfa</a>
                  </li>
                  <li>
                    <a href="#about">Hakkımızda</a>
                  </li>
                  <li>
                    <a href="#portfolio">Portfolyo</a>
                  </li>
                  <li>
                    <a href="#contact">İletişim</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* /MOBILE MENU */}
        {/* HERO */}
        <div className="waxon_tm_hero" id="home">
          <div className="background">
            <div className="leftpart"></div>
            <div className="rightpart">
              <div className="inner">
                <div
                  className="image"
                  data-img-url="/img/slider/bunudene4.png"
                ></div>
                <div className="overlay_image"></div>
                <div className="myOverlay"></div>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="container">
              <div className="content_inner">
                <a href="https://mattobagno.com/">
                  <img
                    className="matto"
                    src="/img/mattobagnologofixed.png"
                    width="320"
                  />
                </a>
                <div className="name">
                  <h3 className="stroke">SR</h3>
                  <h3>Design</h3>
                  <span>Tasarım &amp; Mühendislik</span>
                </div>
              </div>
              <div className="waxon_tm_down" data-position="" data-skin="dark">
                {/* Skin: "", dark */}
                {/* Position: left, center, right */}
                <div className="line_wrapper">
                  <div className="line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /HERO */}
        {/* ABOUT */}
        <div className="waxon_tm_about" id="about">
          <div className="container">
            <div className="about_inner">
              <div className="left">
                <img
                  alt=""
                  className="thumbnail"
                  src="/img/about/serdaraturgutsb.png"
                />{" "}
              </div>
              <div className="right">
                <div className="name">
                  <h3>
                    Serdar Turgut<span className="bg">HAKIMIZDA</span>
                  </h3>
                  <span className="job">Uzman Tasarımcı &amp; Mühendis</span>
                </div>
                <div className="text">
                  <p>
                    Tam anlamıyla yenilikçi çözümlerimi ve özgür tasarım ruhumu
                    yansıtma fırsatı bulduğum çalışmalarımı sizlerle paylaşmanın
                    verdiği büyük heyecanı yaşıyorum.
                  </p>
                  <p>
                    Bu serüveni benimle beraber yaşayan ve yardımlarını
                    esirgemeyen herkese teşekkür ederim.
                  </p>
                </div>
                <a href="https://tr.linkedin.com/in/serdar-turgut-039161aa">
                  <img src="/img/svg/social/linkedin.svg" />{" "}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="waxon_tm_service">
          <div className="container">
            <div className="service_inner">
              <ul className="owl-carousel">
                <li className="item">
                  <div className="list_inner">
                    <img alt="" className="svg" src="/img/svg/check.svg" />
                    <div className="details">
                      <h3>Orijinal</h3>
                      <p>Kaynağı belli 1.kalite malzeme</p>
                    </div>
                  </div>
                </li>
                <li className="item">
                  <div className="list_inner">
                    <img alt="" className="svg" src="/img/svg/pro.svg" />
                    <div className="details">
                      <h3>Profesyonel</h3>
                      <p>Uzman tasarımcı desteği</p>
                    </div>
                  </div>
                </li>
                <li className="item">
                  <div className="list_inner">
                    <img alt="" className="svg" src="/img/svg/medalnew.svg" />
                    <div className="details">
                      <h3>Tecrübe</h3>
                      <p>15 yıllık mühendislik,tasarım ve proje tecrübesi</p>
                    </div>
                  </div>
                </li>
                <li className="item">
                  <div className="list_inner">
                    <img alt="" className="svg" src="/img/svg/rulernew.svg" />
                    <div className="details">
                      <h3>Özel Üretim</h3>
                      <p>Projenize özel tasarım, imalat ve uygulama</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* /SERVICES */}
        {/* PORTFOLIO */}
        <div className="waxon_tm_portoflio" id="portfolio">
          <div className="container">
            <div className="waxon_tm_main_title">
              <div className="title">
                <h3>
                  Tasarım ve Uygulama
                  <span className="bg">Portfolyo</span>
                </h3>
              </div>
            </div>
            <div className="portfolio_inner">
              <ul className="gallery_zoom">
                <li className="vimeo">
                  <div className="list_inner">
                    <div className="image">
                      <img alt="" src="/img/thumbs/1-1.jpg	" />
                      <div
                        className="main"
                        data-img-url="img/portfolio/regnum-carya-golf-and-spa-resort.webp"
                      ></div>
                    </div>
                    <div className="text-overlay">
                      <h3 className="portfolio-headings">
                        Regnum Carya Golf &amp; Spa Resort
                      </h3>
                    </div>
                  </div>
                </li>
                <li className="vimeo">
                  <div className="list_inner">
                    <div className="image">
                      <img alt="" src="/img/thumbs/1-1.jpg" />
                      <div
                        className="main"
                        data-img-url="img/portfolio/bodrumbodrum-bilgili-holding.webp"
                      ></div>
                    </div>
                    <div className="text-overlay">
                      <h3 className="portfolio-headings">BodrumBodrum</h3>
                    </div>
                  </div>
                </li>
                <li className="vimeo">
                  <div className="list_inner">
                    <div className="image">
                      <img alt="" src="/img/thumbs/1-1.jpg" />
                      <div
                        className="main"
                        data-img-url="img/portfolio/golf-aqua-apartments.jpg"
                      ></div>
                    </div>
                    <div className="text-overlay">
                      <h3 className="portfolio-headings">
                        Golf Aqua Apartments
                      </h3>
                    </div>
                  </div>
                </li>
                <li className="vimeo">
                  <div className="list_inner">
                    <div className="image">
                      <img alt="" src="/img/thumbs/1-1.jpg" />
                      <div
                        className="main"
                        data-img-url="/img/portfolio/manna-boutique-hotels.jpg"
                      ></div>
                    </div>
                    <div className="text-overlay">
                      <h3 className="portfolio-headings">
                        Manna Boutique Hotels
                      </h3>
                    </div>
                  </div>
                </li>
                <li className="vimeo">
                  <div className="list_inner">
                    <div className="image">
                      <img alt="" src="/img/thumbs/1-1.jpg" />
                      <div
                        className="main"
                        data-img-url="/img/portfolio/matild-palace-budapeste.jpg"
                      ></div>
                    </div>
                    <div className="text-overlay">
                      <h3 className="portfolio-headings">
                        Matild Palace Budapeşte
                      </h3>
                    </div>
                  </div>
                </li>
                <li className="vimeo">
                  <div className="list_inner">
                    <div className="image">
                      <img alt="" src="/img/thumbs/1-1.jpg" />
                      <div
                        className="main"
                        data-img-url="/img/portfolio/varyap-metropol-istanbul.jpg"
                      ></div>
                    </div>
                    <div className="text-overlay">
                      <h3 className="portfolio-headings">Metropol İstanbul</h3>
                    </div>
                  </div>
                </li>
                <li className="vimeo">
                  <div className="list_inner">
                    <div className="image">
                      <img alt="" src="/img/thumbs/1-1.jpg" />
                      <div
                        className="main"
                        data-img-url="/img/portfolio/the-elysium-miramar-villas-bodrum.jpg"
                      ></div>
                    </div>
                    <div className="text-overlay">
                      <h3 className="portfolio-headings">
                        The Elysium Miramar Villas Bodrum
                      </h3>
                    </div>
                  </div>
                </li>
                <li className="vimeo">
                  <div className="list_inner">
                    <div className="image">
                      <img alt="" src="/img/thumbs/1-1.jpg" />
                      <div
                        className="main"
                        data-img-url="/img/portfolio/lux-bodrum-resort.JPEG"
                      ></div>
                    </div>
                    <div className="text-overlay">
                      <h3 className="portfolio-headings">Lux Bodrum Resort</h3>
                    </div>
                  </div>
                </li>
                <li className="vimeo">
                  <div className="list_inner">
                    <div className="image">
                      <img alt="" src="/img/thumbs/1-1.jpg" />
                      <div
                        className="main"
                        data-img-url="/img/portfolio/girne-feo-elegance.jpeg"
                      ></div>
                    </div>
                    <div className="text-overlay">
                      <h3 className="portfolio-headings">Girne FEO Elegance</h3>
                    </div>
                  </div>
                </li>
                <li className="vimeo">
                  <div className="list_inner">
                    <div className="image">
                      <img alt="" src="/img/thumbs/1-1.jpg" />
                      <div
                        className="main"
                        data-img-url="/img/portfolio/yassiada.jpg"
                      ></div>
                    </div>
                    <div className="text-overlay">
                      <h3 className="portfolio-headings">Katre Island Hotel</h3>
                    </div>
                  </div>
                </li>
                <li className="vimeo">
                  <div className="list_inner">
                    <div className="image">
                      <img alt="" src="/img/thumbs/1-1.jpg" />
                      <div
                        className="main"
                        data-img-url="/img/portfolio/narlife.jpg"
                      ></div>
                    </div>
                    <div className="text-overlay">
                      <h3 className="portfolio-headings">Narlife</h3>
                    </div>
                  </div>
                </li>
                <li className="vimeo">
                  <div className="list_inner">
                    <div className="image">
                      <img alt="" src="/img/thumbs/1-1.jpg" />
                      <div
                        className="main"
                        data-img-url="/img/portfolio/baskent-emlak-konutlari.jpg"
                      ></div>
                    </div>
                    <div className="text-overlay">
                      <h3 className="portfolio-headings">
                        Başkent Emlak Konutları
                      </h3>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="waxon_tm_contact" id="contact">
          <div className="bg_image"></div>
          <div className="container">
            <div className="contact_inner">
              <div className="waxon_tm_main_title">
                <div className="title">
                  <h3>
                    Bİze Ulaşın<span className="bg">İLETİŞİM</span>
                  </h3>
                </div>
              </div>

              <div className="desc">
                <p>
                  İletişim formunu doldurarak veya telefon numaramızı hafta içi
                  09:00 - 17:00 saatleri arası arayarak bize ulaşabilirsiniz.
                </p>
              </div>

              <div className="wrapper">
                <div className="left wow fadeInLeft" data-wow-duration="0.8s">
                  <div className="fields">
                    <form
                      action="/"
                      autoComplete="off"
                      className="contact_form"
                      id="contact_form"
                      method="post"
                    >
                      <div
                        className="returnmessage"
                        data-success="Your message has been received, We will contact you soon."
                      ></div>

                      <div className="empty_notice">
                        <span>İletişim formunu doldurabilirsiniz.</span>
                      </div>

                      <div className="first">
                        <ul>
                          <li>
                            <input
                              id="name"
                              placeholder="Adınız ve soyadınız"
                              type="text"
                            />
                          </li>
                          <li>
                            <input
                              id="email"
                              placeholder="E-posta adresiniz"
                              type="text"
                            />
                          </li>
                        </ul>
                      </div>

                      <div className="last">
                        <textarea
                          id="message"
                          placeholder="Mesajınız"
                        ></textarea>
                      </div>

                      <div className="waxon_tm_button" data-position="center">
                        <a href="#" id="send_message">
                          <span>Mesajını G&ouml;nder</span>{" "}
                        </a>
                      </div>
                      {/* If you want to change mail address to yours, please open modal.php and go to line 4 */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /CONTACT */}
      {/* COPYRIGHT */}

      <div className="waxon_tm_copyright">
        <div className="container">
          <div className="copyright_inner">
            <ul>
              <li className="wow fadeInDown" data-wow-duration="0.8s">
                <span>
                  <a href="mailto:info@srdesign.com.tr">info@srdesign.com.tr</a>
                </span>{" "}
                <span>
                  <a href="tel:8503077678">850 307 76 78</a>
                </span>
              </li>
              <li
                className="wow fadeInDown"
                data-wow-delay="0.6s"
                data-wow-duration="0.8s"
              >
                <div className="social">
                  <ul>
                    <li>
                      <a href="https://www.facebook.com/p/Matto-Bagno-100064142107731/">
                        <img
                          alt=""
                          className="svg"
                          src="/img/svg/social/facebook.svg"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="https://instagram.com/mattobagno?igshid=NzZlODBkYWE4Ng==">
                        <img
                          alt=""
                          className="svg"
                          src="/img/svg/social/instagram.svg"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* /COPYRIGHT */}
      {/* MAGIC CURSOR */}

      <div className="mouse-cursor cursor-outer"></div>

      <div className="mouse-cursor cursor-inner"></div>
      {/* /MAGIC CURSOR */}
    </div>
  );
};

export default Index;
