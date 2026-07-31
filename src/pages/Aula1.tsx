import CodeBlock from "../components/CodeBlock";
import AnnotatedCode from "../components/AnnotatedCode";
import TerminalBlock from "../components/TerminalBlock";
import Callout from "../components/Callout";
import DeviceFrame from "../components/DeviceFrame";
import Term from "../components/Term";
import { t } from "../utils/ann";

interface PageProps {
  goTo: (id: string) => void;
}

export default function Aula1({ goTo }: PageProps) {
  return (
    <div className="page">
      <span className="eyebrow">Bloco 1 · Aula 1</span>
      <h2 className="title">O que é React Native, e como colocar um app rodando no seu celular</h2>
      <p className="lede">
        Hoje a gente sai do navegador. Você já sabe React — agora vamos usar
        o mesmo raciocínio (componentes, props, estado) pra desenhar telas
        que rodam de verdade dentro de um celular, sem passar por navegador
        nenhum. E já vamos fazer isso do jeito certo, com{" "}
        <Term note="Superset de JavaScript que adiciona tipagem estática. Ajuda a pegar erros (tipo passar um número onde o componente espera um texto) antes mesmo de rodar o app.">
          TypeScript
        </Term>
        .
      </p>

      <div className="section">
        <h3>
          <span className="num">1</span>React Native não é "React dentro do navegador do celular"
        </h3>
        <p>
          Esse é o erro mais comum. Quando você escreve React pra web, o
          resultado final é HTML: uma <code>&lt;div&gt;</code> vira uma{" "}
          <code>&lt;div&gt;</code> de verdade no DOM, e o navegador desenha
          isso na tela. O React Native funciona parecido por fora — você
          ainda escreve componentes,{" "}
          <Term note="Sintaxe que mistura HTML com JavaScript dentro do componente — o que já é familiar de React na web.">
            JSX
          </Term>
          , usa <code>useState</code>, <code>useEffect</code> — mas por
          dentro é outra história completamente.
        </p>
        <p>
          Em vez de gerar HTML, o React Native manda instruções pra uma{" "}
          <Term note="Camada de comunicação entre o código JavaScript que você escreve e o código nativo (Swift/Kotlin) que o sistema operacional entende de verdade.">
            ponte (bridge)
          </Term>{" "}
          que conversa com o sistema operacional do celular. Quando você
          escreve <code>&lt;Text&gt;</code>, isso vira um{" "}
          <code>UILabel</code> de verdade no iOS ou um{" "}
          <code>TextView</code> de verdade no Android — componente nativo,
          o mesmo que um app feito em Swift ou Kotlin usaria. Não existe{" "}
          <code>&lt;div&gt;</code>, não existe <code>&lt;span&gt;</code>,
          não existe CSS de arquivo <code>.css</code>. A gente troca tudo
          isso por um conjunto próprio de componentes.
        </p>
        <Callout type="dica">
          Pensa assim: React ensinou você a raciocinar em componentes e
          estado. React Native reaproveita esse raciocínio, mas troca o
          "alfabeto" — os elementos que você usa pra desenhar a tela são
          outros.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">2</span>
          <Term note="Conjunto de ferramentas construído em cima do React Native que resolve boa parte da configuração nativa (Android/iOS) pra você.">
            Expo
          </Term>
          : o jeito mais rápido de começar
        </h3>
        <p>
          Existem dois caminhos pra criar um projeto React Native: o{" "}
          <strong>React Native CLI</strong> puro (exige configurar Android
          Studio e/ou Xcode na sua máquina antes de escrever a primeira
          linha) e o <strong>Expo</strong>, que permite testar o app no
          celular físico em minutos, sem instalar emulador nenhum. Nesta UC
          vamos usar Expo, com{" "}
          <Term note="Sigla de Software Development Kit — no Expo, é a versão do conjunto de bibliotecas nativas que o seu projeto usa. Precisa bater com a versão instalada do app Expo Go.">
            SDK
          </Term>{" "}
          fixado na versão 54.
        </p>

        <Callout type="atencao">
          <strong>Isso aqui é obrigatório:</strong> o app <strong>Expo Go</strong>{" "}
          que vocês instalam na loja de aplicativos só abre projetos criados
          com uma versão de SDK compatível com a versão publicada nas lojas
          — hoje, isso é a <strong>SDK 54</strong>. Se o projeto for criado
          numa SDK diferente (mais nova, por exemplo), o QR Code carrega e o
          Expo Go simplesmente recusa abrir o projeto. Por isso vamos fixar
          a versão explicitamente no comando de criação, em vez de deixar no
          automático.
        </Callout>

        <p>Pra criar um projeto novo, já em TypeScript e já preso na SDK 54:</p>
        <AnnotatedCode
          filename="terminal"
          lines={[
            [
              "npx ",
              t("create-expo-app@latest", "Ferramenta oficial que gera um projeto Expo novo, já com toda a estrutura de pastas e configuração inicial."),
              " meu-primeiro-app ",
              t("--template", "Flag que escolhe o modelo (template) de projeto, em vez de deixar o comando perguntar interativamente."),
              " ",
              t("blank-typescript@sdk-54", "Modelo \"em branco\" (um único App.tsx, sem navegação pronta) + TypeScript, travado na versão 54 do SDK.", [
                { value: "blank", desc: "mesmo modelo, mas em JavaScript — não é o nosso caso" },
                { value: "blank-typescript", desc: "modelo em branco com TypeScript — o que vamos usar" },
                { value: "default", desc: "vem com Expo Router (navegação por pastas) já configurado — avançado demais por enquanto" },
              ]),
            ],
          ]}
        />
        <p style={{ marginTop: -8 }}>Depois, entre na pasta do projeto:</p>
        <TerminalBlock
          lines={[
            { text: "cd meu-primeiro-app" },
          ]}
        />

        <Callout type="atencao">
          Precisa ter o <strong>Node.js</strong> instalado antes (versão 18
          ou superior). Se o comando <code>node -v</code> no terminal não
          responder, instale o Node primeiro.
        </Callout>

        <p>Estrutura que esse template cria pra você:</p>
        <CodeBlock filename="meu-primeiro-app/">
{`meu-primeiro-app/
├─ App.tsx         ← componente raiz, o primeiro que roda
├─ app.json        ← configurações do app (nome, ícone, splash...)
├─ assets/         ← imagens, fontes, ícones
├─ tsconfig.json   ← configuração do TypeScript
├─ package.json
└─ node_modules/`}
        </CodeBlock>
        <p>
          O <code>App.tsx</code> é o seu ponto de entrada — o equivalente ao{" "}
          <code>main.tsx</code> + <code>App.tsx</code> que vocês já usam em
          projetos Vite, só que tudo junto num arquivo só, de cara.
        </p>
      </div>

      <div className="section">
        <h3>
          <span className="num">3</span>Organizando: uma pasta pra componentes
        </h3>
        <p>
          Antes de criar o primeiro componente (já na Aula 2), crie uma
          pasta <code>components</code> na raiz do projeto. A partir de
          agora, <strong>todo componente novo nasce dentro dela</strong> —
          nada de arquivo solto ao lado do <code>App.tsx</code>. Isso evita
          que o projeto vire uma bagunça assim que o app crescer.
        </p>
        <CodeBlock filename="meu-primeiro-app/">
{`meu-primeiro-app/
├─ App.tsx
├─ components/      ← criar essa pasta agora
│  └─ (vazia por enquanto)
├─ app.json
├─ tsconfig.json
└─ package.json`}
        </CodeBlock>
      </div>

      <div className="section">
        <h3>
          <span className="num">4</span>Instalando o Expo Go no celular
        </h3>
        <p>
          Instale o app <strong>Expo Go</strong> na loja de aplicativos do
          seu celular (Play Store ou App Store). É por meio dele que o seu
          celular vai "abrir" o projeto que está rodando no seu computador,
          em tempo real — cada vez que você salvar um arquivo, a tela do
          celular atualiza sozinha.
        </p>
      </div>

      <div className="section">
        <h3>
          <span className="num">5</span>Rodando o app: modo padrão (mesma rede Wi-Fi)
        </h3>
        <p>Dentro da pasta do projeto, rode:</p>
        <TerminalBlock
          lines={[
            {
              text: (
                <>
                  npx expo{" "}
                  <Term note="Sobe o servidor de desenvolvimento (Metro Bundler) e mostra o QR Code pra abrir o app." kind="code">
                    start
                  </Term>
                </>
              ),
            },
          ]}
        />
        <p>
          Isso abre um painel no terminal (o <strong>Metro Bundler</strong>)
          com um <strong>QR Code</strong>. O funcionamento por trás: seu
          computador sobe um servidor local na sua rede, e o QR Code
          contém o endereço desse servidor. Basta que:
        </p>
        <ul style={{ color: "var(--text-dim)", lineHeight: 1.7 }}>
          <li>o celular esteja no <strong>mesmo Wi-Fi</strong> do computador;</li>
          <li>
            você abra a câmera do celular (iOS) ou o próprio Expo Go
            (Android) e aponte pro QR Code.
          </li>
        </ul>
        <p>
          O app abre dentro do Expo Go, já rodando seu código. Edite algo
          no <code>App.tsx</code>, salve, e a tela do celular atualiza
          sozinha em segundos — isso se chama{" "}
          <Term note="Recurso do Metro Bundler que reenvia só o código alterado pro app já aberto, sem precisar recarregar tudo do zero.">
            Fast Refresh
          </Term>
          .
        </p>
        <Callout type="atencao">
          Esse modo só funciona porque celular e computador enxergam um ao
          outro na mesma rede local. Em redes de escola/empresa é comum
          cada dispositivo ficar "isolado" dos outros por segurança — é
          nesse cenário que o modo a seguir resolve o problema.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">6</span>Rodando com tunnel (quando a rede não colabora)
        </h3>
        <p>
          Se o QR Code não carregar — geralmente porque o Wi-Fi da sala
          bloqueia conexão direta entre aparelhos, ou porque o celular está
          usando dados móveis em vez de Wi-Fi — use o modo túnel:
        </p>
        <TerminalBlock
          lines={[
            {
              text: (
                <>
                  npx expo start{" "}
                  <Term note="Cria um túnel público (via ngrok, por baixo dos panos) que redireciona a conexão até o seu computador, não importa a rede." kind="code">
                    --tunnel
                  </Term>
                </>
              ),
            },
          ]}
        />
        <p>
          Em vez de expor um endereço só válido dentro da rede local, o
          Expo cria um túnel público que redireciona a conexão do celular
          até o seu computador, não importa em que rede cada um esteja. O
          celular só precisa de internet — Wi-Fi ou dados móveis, tanto
          faz.
        </p>
        <Callout type="dica">
          Tunnel é mais lento pra carregar (o tráfego dá uma volta maior) e
          depende de internet estável dos dois lados. Use o modo padrão
          sempre que celular e computador estiverem na mesma rede — guarde
          o <code>--tunnel</code> pra quando o QR Code simplesmente não
          conectar.
        </Callout>
        <p>
          Dá pra alternar entre os modos sem reiniciar tudo: com o Metro
          Bundler já aberto, pressione <code>s</code> no terminal pra trocar
          o modo de conexão (LAN / tunnel / local).
        </p>
      </div>

      <div className="section">
        <h3>
          <span className="num">7</span>Rodando emulado no navegador
        </h3>
        <p>
          Também dá pra abrir o app direto no navegador do computador, sem
          precisar do celular. Com o Metro Bundler rodando, pressione{" "}
          <code>w</code> no terminal — ou já suba direto nesse modo:
        </p>
        <TerminalBlock
          lines={[
            {
              text: (
                <>
                  npx expo start{" "}
                  <Term note="Compila os componentes React Native para equivalentes web (via react-native-web) e abre direto numa aba do navegador." kind="code">
                    --web
                  </Term>
                </>
              ),
            },
          ]}
        />
        <p>
          O Expo compila os componentes React Native pra equivalentes web
          e abre numa aba do navegador, numa janela com proporção de
          celular.
        </p>
        <Callout type="atencao">
          Útil pra testar layout rápido, mas não é 100% fiel: recursos
          nativos (câmera, sensores, algumas animações e gestos) não
          funcionam ou se comportam diferente no navegador. Pra validar o
          app de verdade, sempre teste no celular físico também.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">8</span>Resumo dos comandos
        </h3>
        <div className="two-col">
          <div className="panel">
            <TerminalBlock
              lines={[
                { text: "npx create-expo-app@latest nome-do-app --template blank-typescript@sdk-54" },
                { type: "out", text: "cria um projeto novo, TS, preso na SDK 54" },
                { text: "npx expo start" },
                { type: "out", text: "roda em modo padrão (mesma rede)" },
                { text: "npx expo start --tunnel" },
                { type: "out", text: "roda via túnel (redes diferentes)" },
                { text: "npx expo start --web" },
                { type: "out", text: "abre emulado no navegador" },
              ]}
            />
          </div>
          <DeviceFrame caption="Expo Go abrindo o projeto via QR Code">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 96,
                  height: 96,
                  background:
                    "repeating-conic-gradient(#1a1425 0% 25%, #fdfcff 0% 50%) 0 0/16px 16px",
                  borderRadius: 8,
                }}
              />
              <span style={{ fontSize: 12, color: "#7d729c", fontFamily: "var(--font-mono)" }}>
                aponte a câmera aqui
              </span>
            </div>
          </DeviceFrame>
        </div>
      </div>

      <div className="aula-footer-nav">
        <div />
        <button className="nav-btn right" onClick={() => goTo("aula2")}>
          <span className="nb-label">Próxima →</span>
          Aula 2 · Componentes básicos
        </button>
      </div>
    </div>
  );
}
