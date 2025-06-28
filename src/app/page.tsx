import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
import Features from "../../components/Features";
import HowItWorks from "../../components/HowItWorks";
import Pricing from "../../components/Pricing";
import FAQ from "../../components/FAQ";
import Testimonials from "../../components/Testimonials";
import ContactUs from "../../components/ContactUs";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar isLoggedIn={false} />
      <HeroSection />
      <HowItWorks />
      {/* <Pricing /> */}
      <Features />
      <FAQ />
      <Testimonials />
      <ContactUs />
      <Footer />
    </>
  );
}
