import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { AuthProvider } from "@/contexts/authContext";
import "@/styles/main.sass";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <Head>
          <title>Shipping Cost Checker | Adi Wahyudi</title>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="description"
            content="Calculate and compare shipping costs instantly with our Shipping Cost Checker. Get the best rates for local and international deliveries from trusted couriers."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
        <ToastContainer />
      </AuthProvider>
    </ReactQueryProvider>
  );
}
