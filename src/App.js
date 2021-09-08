import Header from "./components/Header";
import Layout from "./components/Layout";
import Footer from "./components/Footer";
import "./index.css";

import LayoutBg1 from "./assets/thoth-tarot-the fool.jpg";
import LayoutBg2 from "./assets/foolcard3.jpg";


const App = () => (
  <>
    <Header title="A tarot deck" descr="brief descriptions of the trump cards" />
    <Layout urlBg={LayoutBg1} title="The Fool" descr="The trump of Crowley tarot deck numbered 0" />
    <Layout colorBg="red"/>
    <Layout urlBg={LayoutBg2} title="The Fool" descr="The trump of Marseille tarot deck numbered 0" />
    <Footer />
  </>
);

export default App;