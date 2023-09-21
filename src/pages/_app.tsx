// import '@/styles/globals.css'
import "@/src/styles/globals.css"
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { store } from '../../store';
import Header from "@/components/navigation/Header";

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <div  className = "text-dark-text">
      <Header/>
    <Component {...pageProps} />
    </div>

  </Provider>
}
