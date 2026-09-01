import AnnotatedCode from "../components/AnnotatedCode";
import Callout from "../components/Callout";
import PropsTable from "../components/PropsTable";
import DeviceFrame from "../components/DeviceFrame";
import DocsBox from "../components/DocsBox";
import Term from "../components/Term";
import { t } from "../utils/ann";

interface PageProps {
  goTo: (id: string) => void;
}

export default function Aula13({ goTo }: PageProps) {
  return (
    <div className="page">
      <span className="eyebrow">Bloco 2 · Aula 13</span>
      <h2 className="title">React Native Paper: componentes prontos, bonitos, de fábrica</h2>
      <p className="lede">
        Crie um projeto novo pra essa aula. Até agora, todo componente
        visual — botão, cartão, campo de texto — vocês construíram do
        zero com <code>StyleSheet</code>. Hoje conhecemos uma{" "}
        <Term note="Um conjunto de componentes prontos, já estilizados e testados, que você importa e usa — em vez de desenhar tudo do zero.">
          biblioteca de componentes
        </Term>{" "}
        que resolve isso: o React Native Paper.
      </p>

      <div className="section">
        <h3>
          <span className="num">1</span>Por que usar uma biblioteca de componentes
        </h3>
        <p>
          Nada do que uma biblioteca faz é mágico — por baixo, ainda é{" "}
          <code>View</code>, <code>Text</code>, <code>TouchableOpacity</code>{" "}
          e <code>StyleSheet</code>, exatamente como vocês já escrevem.
          A diferença é que alguém já escreveu, testou e refinou isso
          antes: sombra certa, espaçamento consistente, estado de
          "pressionado", acessibilidade — tudo pronto. Você ganha
          velocidade e consistência visual; perde um pouco de controle
          fino sobre cada detalhe.
        </p>
        <p>
          <strong>React Native Paper</strong> implementa o{" "}
          <Term note="Sistema de design do Google, usado no Android e em muitos produtos — define como botões, cartões, cores e tipografia devem se comportar.">
            Material Design
          </Term>{" "}
          (versão 3) — é uma das bibliotecas mais usadas do ecossistema,
          madura, bem documentada, e funciona liso com Expo.
        </p>
      </div>

      <div className="section">
        <h3>
          <span className="num">2</span>Instalando e configurando
        </h3>
        <AnnotatedCode
          filename="terminal"
          lines={[
            [
              "npx expo install ",
              t("react-native-paper", "A biblioteca em si."),
              " ",
              t("react-native-safe-area-context", "Dependência exigida pelo Paper — se já instalaram na Aula 2, esse comando só confirma a versão."),
            ],
          ]}
        />
        <p>
          Todo componente do Paper precisa estar dentro de um{" "}
          <code>PaperProvider</code> — ele distribui o tema (cores,
          tipografia) pra tudo que está dentro dele. Coloca no{" "}
          <code>App.tsx</code>, envolvendo o app inteiro:
        </p>
        <AnnotatedCode
          filename="App.tsx"
          lines={[
            [
              "import { ",
              t("PaperProvider", "Componente raiz do Paper — sem ele, os componentes não recebem tema nenhum e quebram."),
              " } from 'react-native-paper'",
            ],
            ["import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'"],
            [""],
            ["export default function App() {"],
            ["  return ("],
            ["    <PaperProvider>"],
            ["      <SafeAreaProvider>"],
            ["        <SafeAreaView style={{ flex: 1 }}>"],
            ["          {/* o resto do app */}"],
            ["        </SafeAreaView>"],
            ["      </SafeAreaProvider>"],
            ["    </PaperProvider>"],
            ["  )"],
            ["}"],
          ]}
        />
        <Callout type="dica">
          Usando Expo, os ícones (Material Community Icons) que o Paper
          precisa já vêm prontos — nada de instalar ou linkar biblioteca
          de ícone à parte, diferente de um projeto React Native puro.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">3</span>Botões: <code>Button</code>
        </h3>
        <div className="two-col">
          <div>
            <AnnotatedCode
              filename="trecho"
              lines={[
                ["import { Button } from 'react-native-paper'"],
                [""],
                ["<Button"],
                [
                  "  ",
                  t("mode", "Estilo visual do botão.", [
                    { value: "'text'", desc: "só texto, sem fundo (o mais discreto)" },
                    { value: "'outlined'", desc: "borda, sem preenchimento" },
                    { value: "'contained'", desc: "preenchido — o mais chamativo" },
                  ]),
                  '="contained"',
                ],
                ["  onPress={() => console.log('tocado')}"],
                [
                  "  ",
                  t("icon", "Ícone à esquerda do texto — nome do Material Community Icons."),
                  '="heart"',
                ],
                [">"],
                ["  Comprar"],
                ["</Button>"],
              ]}
            />
            <PropsTable
              rows={[
                { name: "mode", type: "string", desc: "'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal'" },
                { name: "onPress", type: "função", desc: "Igual a qualquer outro botão que vocês já usaram" },
                { name: "icon", type: "string", desc: "Nome do ícone (Material Community Icons)" },
                { name: "loading", type: "boolean", desc: "Mostra um spinner no lugar do ícone" },
                { name: "disabled", type: "boolean", desc: "Desativa o botão, com visual acinzentado automático" },
              ]}
            />
          </div>
          <DeviceFrame caption="Button contained, com ícone">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
              <div style={{ background: "#6750A4", color: "#fff", padding: "10px 22px", borderRadius: 20, fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                <span>♥</span> Comprar
              </div>
            </div>
          </DeviceFrame>
        </div>
      </div>

      <div className="section">
        <h3>
          <span className="num">4</span>Campo de texto: <code>TextInput</code>
        </h3>
        <div className="two-col">
          <div>
            <p>
              Não é o mesmo <code>TextInput</code> do React Native — o
              Paper reexporta um com visual próprio (label flutuante,
              contorno, ícones).
            </p>
            <AnnotatedCode
              filename="trecho"
              lines={[
                ["import { useState } from 'react'"],
                ["import { TextInput } from 'react-native-paper'"],
                [""],
                ["const [texto, setTexto] = useState('')"],
                [""],
                ["<TextInput"],
                [
                  "  ",
                  t("label", "O texto que 'flutua' pra cima quando o campo é preenchido — substitui o placeholder tradicional."),
                  '="Nome do produto"',
                ],
                ["  value={texto}"],
                ["  onChangeText={setTexto}"],
                [
                  "  ",
                  t("mode", "Estilo visual do contorno.", [
                    { value: "'flat'", desc: "linha só embaixo" },
                    { value: "'outlined'", desc: "contorno completo ao redor" },
                  ]),
                  '="outlined"',
                ],
                ["/>"],
              ]}
            />
          </div>
          <DeviceFrame caption="TextInput outlined, com label flutuante">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
              <div style={{ position: "relative", border: "1.5px solid #79747E", borderRadius: 4, padding: "14px 12px 8px", width: 160 }}>
                <span style={{ position: "absolute", top: -8, left: 8, background: "#fff", padding: "0 4px", fontSize: 10, color: "#6750A4" }}>
                  Nome do produto
                </span>
                <span style={{ fontSize: 13 }}>Tênis Runner</span>
              </div>
            </div>
          </DeviceFrame>
        </div>
      </div>

      <div className="section">
        <h3>
          <span className="num">5</span>Cartão de produto: <code>Card</code>
        </h3>
        <div className="two-col">
          <div>
            <p>
              O <code>Card</code> já resolve boa parte do que vocês
              construíram manualmente no <code>CartaoProduto</code> desde
              a Aula 2 — mas com sombra, espaçamento e subcomponentes
              prontos (<code>Card.Cover</code> pra imagem,{" "}
              <code>Card.Title</code>, <code>Card.Content</code>,{" "}
              <code>Card.Actions</code> pros botões).
            </p>
            <AnnotatedCode
              filename="trecho"
              lines={[
                ["import { Card, Button, Text } from 'react-native-paper'"],
                [""],
                ["<Card>"],
                ["  <Card.Cover source={{ uri: 'https://exemplo.com/foto.png' }} />"],
                ["  <Card.Title title=\"Tênis Runner\" subtitle=\"R$ 299\" />"],
                ["  <Card.Content>"],
                ["    <Text variant=\"bodyMedium\">Confortável, leve, ótimo pra corrida.</Text>"],
                ["  </Card.Content>"],
                [
                  "  <",
                  t("Card.Actions", "Área reservada pros botões do cartão — já vem com o espaçamento certo."),
                  ">",
                ],
                ["    <Button>Comprar</Button>"],
                ["  </Card.Actions>"],
                ["</Card>"],
              ]}
            />
          </div>
          <DeviceFrame caption="Card com imagem, título, texto e botão">
            <div style={{ border: "1px solid #eee", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
              <div style={{ height: 80, background: "linear-gradient(145deg, #ffb84d, #ff6b6b)" }} />
              <div style={{ padding: 12 }}>
                <p style={{ fontWeight: 700, fontSize: 14, margin: "0 0 2px" }}>Tênis Runner</p>
                <span style={{ fontSize: 12, color: "#666" }}>R$ 299</span>
                <p style={{ fontSize: 12, color: "#444", margin: "8px 0" }}>Confortável, leve, ótimo pra corrida.</p>
                <div style={{ color: "#6750A4", fontWeight: 700, fontSize: 12 }}>COMPRAR</div>
              </div>
            </div>
          </DeviceFrame>
        </div>
      </div>

      <div className="section">
        <h3>
          <span className="num">6</span>Mais componentes úteis, em rajada
        </h3>
        <PropsTable
          rows={[
            { name: "Chip", type: "componente", desc: "Etiqueta pequena — categoria, filtro, tag" },
            { name: "Avatar.Image / Avatar.Text", type: "componente", desc: "Foto de perfil circular, ou iniciais quando não há foto" },
            { name: "Snackbar", type: "componente", desc: "Aviso temporário no rodapé (\"Produto adicionado!\")" },
            { name: "Dialog", type: "componente", desc: "Um modal já pronto, com título, conteúdo e ações" },
            { name: "ActivityIndicator", type: "componente", desc: "Versão do Paper do spinner de carregamento, com tema aplicado" },
            { name: "Switch / Checkbox / RadioButton", type: "componente", desc: "Controles de formulário prontos, com tema aplicado" },
            { name: "FAB", type: "componente", desc: "Botão circular flutuante, ancorado num canto da tela" },
            { name: "Appbar", type: "componente", desc: "Barra de topo com título e ações — combina bem com a navegação da Aula 8" },
          ]}
        />
      </div>

      <div className="section">
        <h3>
          <span className="num">7</span>Personalizando o tema
        </h3>
        <p>
          Todo o visual — cor primária, secundária, etc — é configurável
          num objeto de tema, passado pro <code>PaperProvider</code>.
        </p>
        <AnnotatedCode
          filename="App.tsx"
          lines={[
            [
              "import { ",
              t("PaperProvider", "Recebe o tema customizado via prop theme."),
              ", ",
              t("MD3LightTheme", "Tema padrão claro do Material Design 3 — usado como base pra espalhar sobre ele.", ),
              " } from 'react-native-paper'",
            ],
            [""],
            ["const tema = {"],
            ["  ...MD3LightTheme,"],
            ["  colors: {"],
            ["    ...MD3LightTheme.colors,"],
            [
              "    ",
              t("primary", "Cor principal — usada em botões contained, indicadores, links."),
              ": '#4ade9e',",
            ],
            ["  },"],
            ["}"],
            [""],
            ["<PaperProvider theme={tema}>"],
            ["  {/* app */}"],
            ["</PaperProvider>"],
          ]}
        />
      </div>

      <div className="section">
        <h3>
          <span className="num">8</span>Outras bibliotecas do ecossistema
        </h3>
        <p>
          Paper não é a única opção — vale conhecer o cenário, mesmo sem
          se aprofundar em todas:
        </p>
        <PropsTable
          rows={[
            { name: "React Native Paper", type: "Material Design", desc: "A que vimos hoje — madura, bem documentada, ótima pra começar" },
            { name: "Gluestack UI", type: "utility-first", desc: "Sucessor do NativeBase — componentes flexíveis, estilo parecido com Tailwind" },
            { name: "Tamagui", type: "performance", desc: "Focado em velocidade e apps universais (mobile + web no mesmo código)" },
            { name: "UI Kitten", type: "Eva Design System", desc: "Visual customizável por tema, bom suporte a dark mode" },
            { name: "React Native Elements", type: "genérica", desc: "Simples de aprender, boa pra projetos pequenos" },
          ]}
        />
        <Callout type="dica">
          Não dá (nem faz sentido) misturar várias bibliotecas de
          componentes no mesmo projeto — cada uma traz seu próprio
          sistema de tema. Escolha uma por projeto, e explore as outras
          em projetos futuros pra sentir a diferença.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">9</span>Prática
        </h3>
        <Callout type="pratica">
          Refaça o <code>CartaoProduto</code> das aulas anteriores usando{" "}
          <code>Card</code> do Paper, com <code>Card.Cover</code>,{" "}
          <code>Card.Title</code> e um <code>Button mode="contained"</code>{" "}
          dentro de <code>Card.Actions</code>. Adicione um{" "}
          <code>TextInput mode="outlined"</code> de busca acima da lista,
          e personalize o tema do <code>PaperProvider</code> com uma cor
          primária à sua escolha.
        </Callout>
      </div>

      <DocsBox
        links={[
          { label: "Getting Started", desc: "reactnativepaper.com — instalação e configuração oficial", url: "https://callstack.github.io/react-native-paper/docs/guides/getting-started" },
          { label: "Components", desc: "callstack.github.io — todos os componentes do Paper, com exemplos", url: "https://callstack.github.io/react-native-paper/docs/components/ActivityIndicator/" },
          { label: "Theming", desc: "callstack.github.io — customizando cores e tipografia", url: "https://callstack.github.io/react-native-paper/docs/guides/theming" },
          { label: "React Native Directory", desc: "reactnative.directory — compare bibliotecas de UI e outras libs do ecossistema", url: "https://reactnative.directory/" },
        ]}
      />

      <div className="aula-footer-nav">
        <button className="nav-btn" onClick={() => goTo("aula12")}>
          <span className="nb-label">← Anterior</span>
          Aula 12 · Áudio, animação e modal
        </button>
        <button className="nav-btn right" onClick={() => goTo("home")}>
          <span className="nb-label">Voltar</span>
          Início
        </button>
      </div>
    </div>
  );
}
