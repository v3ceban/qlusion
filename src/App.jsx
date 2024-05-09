import Header from "./components/Header";
import Main from "./components/Main";
import { DateProvider } from "./providers/DateProvider";
import { MainProvider } from "./providers/MainContent";
import { FiltersProvider } from "./providers/FiltersProvider";

export default function App() {
  return (
    <DateProvider>
      <FiltersProvider>
        <MainProvider>
          <Header />
          <Main />
        </MainProvider>
      </FiltersProvider>
    </DateProvider>
  );
}
