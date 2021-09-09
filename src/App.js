import Header from "./components/Header";
import Layout from "./components/Layout";
import Footer from "./components/Footer";
import "./index.css";

import LayoutBg1 from "./assets/thoth-tarot-the fool.jpg";
import LayoutBg2 from "./assets/foolcard3.jpg";


const App = () => (
  <>
    <Header title="A tarot deck" descr="brief descriptions of the trump cards" />
    <Layout urlBg={LayoutBg1} title="The Fool of the 20th century" descr="The trump of Crowley's tarot deck numbered 0" />
    <Layout colorBg="red" title="The Fool of early 20th century" descr="The card from Waite's deck was supposed to be here, if the deck hadn't been cursed" />
    <Layout urlBg={LayoutBg2} title="The Fool of the Early modern period" descr="The trump of Marseilles tarot deck numbered 0" />
    <Footer />
  </>
);

export default App;