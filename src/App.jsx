import Header from "./components/Header";
import Main from "./components/Main";
import { DateProvider } from "./providers/DateProvider";
import { MainProvider } from "./providers/MainContent";

export default function App() {
  return (
    <DateProvider>
      <MainProvider>
        <Header />
        <Main />
      </MainProvider>
    </DateProvider>
  );
}
