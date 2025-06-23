import { useRoutes } from "react-router-dom";
import { NavBar } from "./components/nav-bar/nav-bar";
// import { Footer } from "./components/footer/footer";
import { routes } from "./routes/routes";
import NewFooter from "./components/footer/NewFooter";

function App() {
  const element = useRoutes(routes);

  return (
    <div className="min-h-screen flex flex-col bg-primary text-foreground">
      <NavBar />
      <main className="flex-grow">{element}</main>
      {/* <Footer /> */}
      <NewFooter />
    </div>
  );
}

export default App;
