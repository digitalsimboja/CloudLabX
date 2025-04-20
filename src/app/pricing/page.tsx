import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import Pricing from "../../../components/Pricing";

export default function PricingPage() {
    return (
       <>
       <Navbar isLoggedIn={false} />
       <Pricing />
       <Footer />
       </>
    )
}