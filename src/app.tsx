import {
  LocationProvider,
  Route,
  Router,
  useLocation,
} from "preact-iso/router";
import "./app.css";
import HomePage from "./pages/Homepage";
import VirtualizedTablePage from "./pages/VirtualizedTablePage";
import PlainTablePage from "./pages/PlainTablePage";

const routes = [
  { path: "/", label: "Home", page: HomePage },
  {
    path: "/virtualized-table",
    label: "Virtualized Table",
    page: VirtualizedTablePage,
  },
  {
    path: "/plain-table",
    label: "Plain Table",
    page: PlainTablePage,
  },
];

function Header() {
  const { path } = useLocation();

  return (
    <header className="app-header">
      <nav aria-label="Main navigation">
        {routes.map((route) => (
          <a
            key={route.path}
            href={route.path}
            aria-current={route.path === path ? "page" : undefined}
          >
            {route.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function App() {
  return (
    <LocationProvider>
      <Header />
      <main>
        <Router>
          {routes.map(({ path, page }) => (
            <Route key={path} path={path} component={page} />
          ))}
        </Router>
      </main>
    </LocationProvider>
  );
}
