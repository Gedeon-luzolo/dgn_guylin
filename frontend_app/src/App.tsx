import { useRoutes } from "react-router-dom";
import { NavBar } from "./components/nav-bar/nav-bar";
import { Footer } from "./components/footer/footer";
import { routes } from "./routes/routes";

function App() {
  const element = useRoutes(routes);

  return (
    <div className="min-h-screen flex flex-col bg-primary text-foreground">
      <NavBar />
      <main className="flex-grow">{element}</main>
      <Footer />
    </div>
  );
}

export default App;
