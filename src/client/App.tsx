import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";

function App() {
  return (
    <Layout>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
      <Toaster />
    </Layout>
  );
}

export default App;
