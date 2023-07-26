import "@/styles/globals.css";
import { SWRConfig } from "swr";
import Footer from "../../components/Footer";
import TopNavBar from "../../components/TopNavBar";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
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
        <div className="div-main">
          <TopNavBar />
          <main>
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </SWRConfig>
    </SessionProvider>
  );
}
