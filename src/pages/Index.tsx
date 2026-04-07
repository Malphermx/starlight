import { Contact } from "@/components/contact";
import { Coverage } from "@/components/coverage";
import { Gallery } from "@/components/gallery";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import { UserSelector } from "@/components/user-selector";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { WhyUs } from "@/components/why-us";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header/>
      <Hero/>
      <UserSelector/>
      <Services/>
      <WhyUs/>
      <Gallery/>
      <Coverage/>
      <Testimonials/>
      <Contact/>
      <footer/>
      <WhatsAppButton/>
      {/* <Navbar /> */}
      {/* <HeroSection />
      <PlansSection />
      <SavingsSection />
      {/* <ProcessSection /> */}
      {/* <BenefitsSection />
      <ContactForm />
      <Footer />  */}
    </div>
  );
};

export default Index;
