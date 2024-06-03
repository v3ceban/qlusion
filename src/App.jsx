import Header from "./components/Header";
import Main from "./components/Main";
import { AppProvider } from "./Providers";

export default function App() {
  return (
    <AppProvider>
      <Header />
      <Main />
    </AppProvider>
  );
}
