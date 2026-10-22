import { Header } from "@/components/site/header";
import {
  Catalogue,
  Cta,
  Footer,
  Hero,
  Patterns,
  Phases,
  Services,
  Stack,
  Stats,
  Team,
  WatchAgent,
} from "@/components/site/sections";

export default function Home() {
  return (
    <main id="top">
      <Header />
      <Hero />
      <WatchAgent />
      <Stats />
      <Services />
      <Catalogue />
      <Stack />
      <Phases />
      <Patterns />
      <Team />
      <Cta />
      <Footer />
    </main>
  );
}
