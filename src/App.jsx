import Header from "./components/Header";
import Main from "./components/Main";
import { AppProvider } from "./Providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function App() {
  return (
    <>
      {/* App */}
      <AppProvider>
        <Header />
        <Main />
      </AppProvider>

      {/* Analytics */}
      <Analytics />
      <SpeedInsights />
    </>
  );
}
