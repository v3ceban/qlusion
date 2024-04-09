import Header from "./components/Header";
import Main from "./components/Main";
import { DateProvider } from "./providers/DateProvider";

export default function App() {
  return (
    <DateProvider>
      <Header />
      <Main />
    </DateProvider>
  );
}
