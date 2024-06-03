import Header from "./components/Header";
import Main from "./components/Main";
import { AppProvider } from "./Providers";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <AppProvider>
      <Header />
      <Main />
      <Analytics />
    </AppProvider>
  );
}
