import { Contact } from "@/components/contact";
import { Coverage } from "@/components/coverage";
import Footer from "@/components/footer";
import { Gallery } from "@/components/gallery";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Hero1 } from "@/components/hero1";
// import { Services } from "@/components/services";
// import { Testimonials } from "@/components/testimonials";
// import { UserSelector } from "@/components/user-selector";
import { WhatsAppButton } from "@/components/whatsapp-button";
// import { WhyUs } from "@/components/why-us";
// import pacienteImg from "@/assets/persona-paciente.png";
// import corporativoImg from "@/assets/persona-corporativo.png";
// import proveedorImg from "@/assets/persona-proveedor.png";

// import fondo1 from "@/assets/1.png"
// import fondo2 from "@/assets/2.png"
// import fondo3 from "@/assets/3.png"
import { Services1 } from "@/components/services1";
import { CentroRehabilitacion } from "@/components/centroRehabilitación";

const Index = () => {


  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* <Hero/> */}
      <Services1 />
      <CentroRehabilitacion/>
      <Gallery />
      <Coverage />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
