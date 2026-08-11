import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Aula1 from "./pages/Aula1";
import Aula2 from "./pages/Aula2";
import Aula3 from "./pages/Aula3";
import Aula4 from "./pages/Aula4";
import Aula5 from "./pages/Aula5";
import Aula6 from "./pages/Aula6";

type PageId = "home" | "aula1" | "aula2" | "aula3" | "aula4" | "aula5" | "aula6";

const NAV: { id: PageId; label: string; icon: string }[] = [
  { id: "home", label: "Início", icon: "•" },
  { id: "aula1", label: "Aula 1", icon: "01" },
  { id: "aula2", label: "Aula 2", icon: "02" },
  { id: "aula3", label: "Aula 3", icon: "03" },
  { id: "aula4", label: "Aula 4", icon: "04" },
  { id: "aula5", label: "Aula 5", icon: "05" },
  { id: "aula6", label: "Aula 6", icon: "06" },
];

function isPageId(v: string): v is PageId {
  return v === "home" || v === "aula1" || v === "aula2" || v === "aula3" || v === "aula4" || v === "aula5" || v === "aula6";
}

function App() {
  const [page, setPage] = useState<PageId>(() => {
    const hash = window.location.hash.replace("#", "");
    return isPageId(hash) ? hash : "home";
  });

  useEffect(() => {
    window.location.hash = page;
    window.scrollTo({ top: 0 });
  }, [page]);

  const goTo = (id: string) => {
    if (isPageId(id)) setPage(id);
  };

  return (
    <>
      <div className="topbar">
        <div className="topbar-inner">
          <div className="brand-row">
            <div className="brand">
              <div className="brand-mark">RN</div>
              <div className="brand-text">
                <h1>UC15 · Interface Gráfica Mobile</h1>
                <span>Técnico em Desenvolvimento de Sistemas</span>
              </div>
            </div>
            <span className="uc-tag">React Native · Expo · TypeScript</span>
          </div>
          <nav className="appnav">
            {NAV.map((item) => (
              <button
                key={item.id}
                className={`appicon-btn ${page === item.id ? "active" : ""}`}
                onClick={() => goTo(item.id)}
              >
                <div className="appicon">{item.icon}</div>
                <span className="label">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="shell">
        {page === "home" && <Home goTo={goTo} />}
        {page === "aula1" && <Aula1 goTo={goTo} />}
        {page === "aula2" && <Aula2 goTo={goTo} />}
        {page === "aula3" && <Aula3 goTo={goTo} />}
        {page === "aula4" && <Aula4 goTo={goTo} />}
        {page === "aula5" && <Aula5 goTo={goTo} />}
        {page === "aula6" && <Aula6 goTo={goTo} />}
      </div>
    </>
  );
}

export default App;
