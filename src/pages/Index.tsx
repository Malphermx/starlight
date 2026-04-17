import { Contact } from "@/components/contact";
import { Coverage } from "@/components/coverage";
import Footer from "@/components/footer";
import { Gallery } from "@/components/gallery";
import { Header } from "@/components/header";
// import { Hero } from "@/components/hero";
import { Hero1 } from "@/components/hero1";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import { UserSelector } from "@/components/user-selector";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { WhyUs } from "@/components/why-us";
import pacienteImg from "@/assets/persona-paciente.png";
import corporativoImg from "@/assets/persona-corporativo.png";
import proveedorImg from "@/assets/persona-proveedor.png";

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
      {/* <Hero/> */}
      {/* <div style={fondoStyles} /> */}
      <div
        style={contenidoStyles}
      >
        <Hero1
          title="Servicios Médicos para Ti y tu Familia"

          description="Accede a consultas médicas a domicilio, ambulancias, farmacia y equipo médico con cobertura nacional. Personal certificado disponible las 24 horas."
          // imageSrc={pacienteImg}
          imageAlt="Paciente"
          segment="pacientes"
        />


      </div>
      <div
        // style={{ paddingTop: '50px' }}
        style={contenidoStyles1}
      >
        <Hero1
          title="Soluciones de Salud para tu Empresa"

          description="Planes de salud ocupacional, bienestar laboral y atención médica para tus colaboradores. Reportes, control y seguimiento en tiempo real."
          // imageSrc={corporativoImg}
          imageAlt="Ejecutivo corporativo"
          reversed
          segment="corporativos"
        />
      </div>
      <div
        // style={{ paddingTop: '50px' }}
        style={contenidoStyles2}
      >
        <Hero1
          title="Únete a la Red de Proveedores"

          description="Forma parte de la red médica más grande de México. Conecta con miles de pacientes y corporativos que necesitan tus servicios."
          // imageSrc={proveedorImg}
          imageAlt="Doctora proveedora"
          segment="proveedores"
        />
      </div>
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
