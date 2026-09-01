import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Aula1 from "./pages/Aula1";
import Aula2 from "./pages/Aula2";
import Aula3 from "./pages/Aula3";
import Aula4 from "./pages/Aula4";
import Aula5 from "./pages/Aula5";
import Aula6 from "./pages/Aula6";
import Aula7 from "./pages/Aula7";
import Aula8 from "./pages/Aula8";
import Aula9 from "./pages/Aula9";
import Aula10 from "./pages/Aula10";
import Aula11 from "./pages/Aula11";
import Aula12 from "./pages/Aula12";
import Aula13 from "./pages/Aula13";

type PageId =
  | "home"
  | "aula1"
  | "aula2"
  | "aula3"
  | "aula4"
  | "aula5"
  | "aula6"
  | "aula7"
  | "aula8"
  | "aula9"
  | "aula10"
  | "aula11"
  | "aula12"
  | "aula13";

const NAV: { id: PageId; label: string; icon: string }[] = [
  { id: "home", label: "Início", icon: "•" },
  { id: "aula1", label: "Aula 1", icon: "01" },
  { id: "aula2", label: "Aula 2", icon: "02" },
  { id: "aula3", label: "Aula 3", icon: "03" },
  { id: "aula4", label: "Aula 4", icon: "04" },
  { id: "aula5", label: "Aula 5", icon: "05" },
  { id: "aula6", label: "Aula 6", icon: "06" },
  { id: "aula7", label: "Aula 7", icon: "07" },
  { id: "aula8", label: "Aula 8", icon: "08" },
  { id: "aula9", label: "Aula 9", icon: "09" },
  { id: "aula10", label: "Aula 10", icon: "10" },
  { id: "aula11", label: "Aula 11", icon: "11" },
  { id: "aula12", label: "Aula 12", icon: "12" },
  { id: "aula13", label: "Aula 13", icon: "13" },
];

function isPageId(v: string): v is PageId {
  return (
    v === "home" ||
    v === "aula1" ||
    v === "aula2" ||
    v === "aula3" ||
    v === "aula4" ||
    v === "aula5" ||
    v === "aula6" ||
    v === "aula7" ||
    v === "aula8" ||
    v === "aula9" ||
    v === "aula10" ||
    v === "aula11" ||
    v === "aula12" ||
    v === "aula13"
  );
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
        {page === "aula7" && <Aula7 goTo={goTo} />}
        {page === "aula8" && <Aula8 goTo={goTo} />}
        {page === "aula9" && <Aula9 goTo={goTo} />}
        {page === "aula10" && <Aula10 goTo={goTo} />}
        {page === "aula11" && <Aula11 goTo={goTo} />}
        {page === "aula12" && <Aula12 goTo={goTo} />}
        {page === "aula13" && <Aula13 goTo={goTo} />}
      </div>
    </>
  );
}

export default App;
