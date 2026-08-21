interface PageProps {
  goTo: (id: string) => void;
}

export default function Home({ goTo }: PageProps) {
  return (
    <div className="page hero">
      <span className="eyebrow">UC15 · Portal de estudos</span>
      <h2 className="title">
        Desenvolver e organizar interface gráfica para dispositivos móveis
      </h2>
      <p className="lede">
        Site vivo da UC — vai crescendo aula a aula. Aqui você aprende a
        construir telas de verdade em React Native: os componentes que
        existem no lugar da div, como estilizar do jeito que o celular
        entende, e como rodar tudo isso no seu próprio aparelho enquanto
        você digita o código.
      </p>

      <div className="hero-devices">
        <div className="mini-phone" style={{ background: "#4ade9e" }}>
          <div className="mp-screen" style={{ color: "#0e0a17" }}>
            RN
          </div>
        </div>
        <div className="mini-phone" style={{ background: "#1d1730" }}>
          <div className="mp-screen" style={{ color: "#ffb84d" }}>
            UI
          </div>
        </div>
        <div className="mini-phone" style={{ background: "#241c3d" }}>
          <div className="mp-screen" style={{ color: "#6fb3ff" }}>
            {"</>"}
          </div>
        </div>
      </div>

      <div className="section" style={{ marginTop: 48 }}>
        <h3>
          <span className="num">trilha</span>Blocos da UC
        </h3>
        <div className="block-list">
          <button
            className="block-card done"
            onClick={() => goTo("aula1")}
            style={{ textAlign: "left", border: "1px solid var(--border-soft)" }}
          >
            <span className="bnum">01</span>
            <div>
              <h4>Bloco 1 — Fundamentos de React Native</h4>
              <p>
                O que é React Native, ambiente com Expo em TypeScript, todos
                os componentes básicos, estilização com Flexbox, props,
                estado, efeitos e consumo de API — do zero até um app de
                verdade.
              </p>
              <div className="aula-chip-row">
                <span className="aula-chip active">Aula 1 · Intro + setup + rodar o app</span>
                <span className="aula-chip active">Aula 2 · Componentes básicos</span>
                <span className="aula-chip active">Aula 3 · Estilização e Flexbox</span>
                <span className="aula-chip active">Aula 4 · Props e desestruturação</span>
                <span className="aula-chip active">Aula 5 · Estado com useState e FlatList</span>
                <span className="aula-chip active">Aula 6 · useEffect</span>
                <span className="aula-chip active">Aula 7 · POST, PUT e DELETE</span>
              </div>
            </div>
          </button>

          <button
            className="block-card done"
            onClick={() => goTo("aula8")}
            style={{ textAlign: "left", border: "1px solid var(--border-soft)" }}
          >
            <span className="bnum">02</span>
            <div>
              <h4>Bloco 2 — Navegação e recursos nativos</h4>
              <p>
                React Navigation: Stack Navigator com parâmetros tipados,
                Bottom Tabs com ícones, câmera e galeria.
              </p>
              <div className="aula-chip-row">
                <span className="aula-chip active">Aula 8 · Stack e Bottom Tabs</span>
                <span className="aula-chip active">Aula 9 · Câmera e galeria</span>
              </div>
            </div>
          </button>

          <div className="block-card" style={{ opacity: 0.4 }}>
            <span className="bnum">03</span>
            <div>
              <h4>Bloco 3 — Persistência e publicação</h4>
              <p>AsyncStorage, autenticação, deploy nas lojas. (em breve)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>
          <span className="num">como usar</span>Antes de começar
        </h3>
        <div className="two-col">
          <p style={{ color: "var(--text-dim)", fontSize: 14.5 }}>
            Este portal acompanha as aulas presenciais — ele não substitui
            a prática no seu próprio editor. Recomendado ter o VS Code
            aberto do lado, com um projeto Expo já rodando, pra ir testando
            cada trecho de código enquanto lê.
          </p>
          <div className="panel">
            <p style={{ margin: 0, fontSize: 13.5, color: "var(--text-dimmer)" }}>
              Node.js instalado, um editor de código, e o app{" "}
              <strong style={{ color: "var(--text)" }}>Expo Go</strong>{" "}
              instalado no seu celular (Android ou iOS) — é tudo que você
              precisa pra acompanhar a partir da Aula 1. Atenção: o projeto
              precisa ser criado no{" "}
              <strong style={{ color: "var(--text)" }}>SDK 54</strong>,
              senão o Expo Go não abre o app (detalhes na Aula 1).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
