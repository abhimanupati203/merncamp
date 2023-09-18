import { UserProvider } from '../context';
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/Nav";
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <Head>
          <link rel="stylesheet" href="/css/styles.css" />
        </Head>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Nav />
        <Component {...pageProps} />
      </UserProvider>
    </>)
}