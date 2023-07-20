import "@/styles/globals.css";
import { SWRConfig } from "swr";
import Footer from "../../components/Footer";
import TopNavBar from "../../components/TopNavBar";
import "./app.module.css";

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      className="app"
      value={{
        fetcher: async (...args) => {
          const response = await fetch(...args);
          if (!response.ok) {
            throw new Error(`Request with ${JSON.stringify(args)} failed.`);
          }
          return await response.json();
        },
      }}
    >
      <main>
        <TopNavBar></TopNavBar>
        <Component {...pageProps} />
        <Footer></Footer>
      </main>
    </SWRConfig>
  );
}
