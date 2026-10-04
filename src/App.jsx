import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Story from './components/Story';
import Products from './components/Products';
import Process from './components/Process';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Story />
        <Products />
        <Process />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
