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

import fondo1 from "@/assets/1.png"
import fondo2 from "@/assets/2.png"
import fondo3 from "@/assets/3.png"
import { Services1 } from "@/components/services1";
import { CentroRehabilitacion } from "@/components/centroRehabilitación";

const Index = () => {



  const contenidoStyles = {
    position: 'relative',
    zIndex: 1,
    // backgroundColor: 'rgba(255, 255, 255, 0.55)',
    backgroundImage: `url('${fondo1}')`,
    backgroundRepeat: 'no-repeat',
    width: '100%',
    backdropFilter: 'blur(2px)',
    backgroundSize: 'cover',
    height: '700px',
    padding: '120px 0px 50px 0px',
    backgroundAttachment: 'fixed'
  };
  const contenidoStyles1 = {
    position: 'relative',
    zIndex: 1,
    // backgroundColor: 'rgba(255, 255, 255, 0.55)',
    backgroundImage: `url('${fondo2}')`,
    backgroundRepeat: 'no-repeat',
    width: '100%',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
    // boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -100px',
    backgroundSize: 'cover',
    height: '700px',
    padding: '120px 0px 50px 0px'
  };
  const contenidoStyles2 = {
    position: 'relative',
    zIndex: 1,
    // backgroundColor: 'rgba(255, 255, 255, 0.55)',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
    backgroundImage: `url('${fondo3}')`,
    backgroundRepeat: 'no-repeat',
    width: '100%',
    backdropFilter: 'blur(2px)',
    backgroundSize: 'cover',
    height: '700px',
    padding: '120px 0px 50px 0px',
    backgroundAttachment: 'fixed'
  };
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero/>
      {/* <div style={fondoStyles} /> */}
    
      {/* <UserSelector /> */}
      {/* <Services /> */}
      <Services1 />
      <CentroRehabilitacion/>
      {/* <WhyUs /> */}
      <Gallery />
      <Coverage />
      {/* <Testimonials /> */}
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
