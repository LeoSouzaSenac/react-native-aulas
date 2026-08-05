import AnnotatedCode from "../components/AnnotatedCode";
import Callout from "../components/Callout";
import PropsTable from "../components/PropsTable";
import DeviceFrame from "../components/DeviceFrame";
import Term from "../components/Term";
import { t } from "../utils/ann";

interface PageProps {
  goTo: (id: string) => void;
}

export default function Aula3({ goTo }: PageProps) {
  return (
    <div className="page">
      <span className="eyebrow">Bloco 1 · Aula 3</span>
      <h2 className="title">Estilização: StyleSheet e Flexbox no React Native</h2>
      <p className="lede">
        Não existe arquivo <code>.css</code> aqui. Toda estilização em
        React Native é feita em TypeScript, com um objeto de estilos — e o{" "}
        <Term note="Modelo de layout unidimensional que organiza elementos em linha ou coluna, distribuindo espaço entre eles.">
          Flexbox
        </Term>{" "}
        que você já conhece da web volta com uma pegadinha importante logo
        de cara: o eixo padrão é outro.
      </p>

      <div className="section">
        <h3>
          <span className="num">1</span>
          <code>StyleSheet.create</code> em vez de CSS
        </h3>
        <p>
          Em vez de classes CSS, você cria um objeto TypeScript com{" "}
          <code>StyleSheet.create</code> e cada propriedade dentro dele é
          um "conjunto de estilos" que pode ser aplicado a qualquer
          componente via a prop <code>style</code>.
        </p>
        <AnnotatedCode
          filename="components/Cartao.tsx"
          lines={[
            ["import { ", t("View", "Container."), ", ", t("Text", "Texto."), ", ", t("StyleSheet", "Cria e valida o objeto de estilos."), " } from 'react-native'"],
            [""],
            ["const Cartao = () => {"],
            ["  return ("],
            ["    <View style={styles.caixa}>"],
            ["      <Text style={styles.titulo}>Título</Text>"],
            ["    </View>"],
            ["  )"],
            ["}"],
            [""],
            [
              "const styles = ",
              t("StyleSheet.create", "Valida as propriedades (erro de digitação aparece no console) e otimiza o estilo internamente."),
              "({",
            ],
            ["  caixa: {"],
            ["    padding: 16,"],
            ["    borderRadius: 12,"],
            ["    backgroundColor: '#1d1730',"],
            ["  },"],
            ["  titulo: {"],
            ["    fontSize: 18,"],
            ["    ", t("fontWeight", "Peso da fonte — aceita 'normal', 'bold' ou string numérica ('600')."), ": '600',"],
            ["    color: '#f2eefb',"],
            ["  },"],
            ["})"],
            [""],
            ["export default Cartao"],
          ]}
        />
        <p>Por que não escrever o estilo direto inline, como um objeto solto? Duas razões práticas:</p>
        <ul style={{ color: "var(--text-dim)", lineHeight: 1.7 }}>
          <li>
            <code>StyleSheet.create</code> valida as propriedades — erros de
            digitação (tipo <code>colr</code> em vez de <code>color</code>)
            aparecem como aviso no console (e, como o projeto é TypeScript,
            muitos desses erros já aparecem antes mesmo de salvar);
          </li>
          <li>
            o React Native otimiza esses estilos internamente (eles viram
            referências numéricas em vez de objetos recriados a cada
            renderização).
          </li>
        </ul>
        <p>
          A prop <code>style</code> também aceita um{" "}
          <strong>array de estilos</strong> — útil pra combinar um estilo
          base com uma variação condicional:
        </p>
        <AnnotatedCode
          filename="trecho"
          lines={[
            [
              "<View style={[styles.caixa, ",
              t("ativo && styles.caixaAtiva", "Só aplica o segundo estilo se a condição 'ativo' for verdadeira — mesmo truque de classes condicionais que se usa na web."),
              "]}>",
            ],
          ]}
        />
        <Callout type="dica">
          Diferente da web, aqui não existem unidades como <code>px</code>{" "}
          ou <code>rem</code>. Todo número (<code>fontSize: 18</code>,{" "}
          <code>padding: 16</code>) é interpretado em pixels
          independentes de densidade — o próprio sistema operacional ajusta
          pra ficar do mesmo tamanho físico em telas diferentes.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">2</span>
          Flexbox — mesma teoria, eixo padrão diferente
        </h3>
        <p>
          A pegadinha mais importante desta aula:{" "}
          <strong>
            todo <code>View</code> já nasce com <code>display: flex</code>{" "}
            e <code>flexDirection: "column"</code>
          </strong>{" "}
          por padrão. Na web, o padrão do Flexbox é <code>row</code> — aqui
          é o oposto. Isso significa que, sem nenhum estilo, componentes
          filhos já se empilham de cima pra baixo.
        </p>
        <div className="demo-row">
          <div>
            <p style={{ fontSize: 14, color: "var(--text-dim)", marginBottom: 8 }}>
              <code>flexDirection: "column"</code> (padrão)
            </p>
            <AnnotatedCode
              filename="trecho"
              lines={[
                ["<View style={styles.linha}>"],
                ["  <Text>A</Text>"],
                ["  <Text>B</Text>"],
                ["  <Text>C</Text>"],
                ["</View>"],
                [""],
                [
                  "// styles.linha: {} ",
                  t("→ nada declarado", "Sem flexDirection nenhum, o View já organiza os filhos em coluna por padrão."),
                ],
              ]}
            />
          </div>
          <DeviceFrame caption='sem flexDirection declarado'>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
              {["A", "B", "C"].map((l) => (
                <div key={l} style={{ padding: "6px 14px", background: "#f2f2f2", borderRadius: 6, fontSize: 13 }}>
                  {l}
                </div>
              ))}
            </div>
          </DeviceFrame>
        </div>

        <div className="demo-row" style={{ marginTop: 28 }}>
          <div>
            <p style={{ fontSize: 14, color: "var(--text-dim)", marginBottom: 8 }}>
              <code>flexDirection: "row"</code> (explícito)
            </p>
            <AnnotatedCode
              filename="trecho"
              lines={[
                ["const styles = StyleSheet.create({"],
                ["  linha: {"],
                [
                  "    ",
                  t("flexDirection", "Define o eixo principal do flexbox.", [
                    { value: "'column'", desc: "empilha de cima pra baixo (padrão no RN)" },
                    { value: "'row'", desc: "enfileira da esquerda pra direita" },
                    { value: "'row-reverse'", desc: "enfileira da direita pra esquerda" },
                    { value: "'column-reverse'", desc: "empilha de baixo pra cima" },
                  ]),
                  ": 'row',",
                ],
                ["    ", t("gap", "Espaçamento entre os filhos, sem precisar de margin manual em cada um."), ": 8,"],
                ["  }"],
                ["})"],
              ]}
            />
          </div>
          <DeviceFrame caption='flexDirection: "row" declarado'>
            <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
              {["A", "B", "C"].map((l) => (
                <div key={l} style={{ padding: "6px 14px", background: "#f2f2f2", borderRadius: 6, fontSize: 13 }}>
                  {l}
                </div>
              ))}
            </div>
          </DeviceFrame>
        </div>

        <p style={{ marginTop: 24 }}>Fora essa inversão do padrão, as propriedades de Flexbox são as mesmas que vocês já usam em CSS na web:</p>
        <PropsTable
          rows={[
            { name: "flexDirection", type: '"column" | "row"', desc: "Direção do eixo principal — column é o padrão do RN" },
            { name: "justifyContent", type: '"flex-start" | "center" | "flex-end" | "space-between" | "space-around"', desc: "Alinhamento no eixo principal" },
            { name: "alignItems", type: '"flex-start" | "center" | "flex-end" | "stretch"', desc: "Alinhamento no eixo cruzado" },
            { name: "flex", type: "number", desc: "Quanto o componente cresce pra ocupar o espaço disponível (flex: 1 = ocupa tudo)" },
            { name: "flexWrap", type: '"wrap" | "nowrap"', desc: "Permite que os filhos quebrem pra próxima linha/coluna" },
            { name: "gap", type: "number", desc: "Espaçamento entre os filhos, sem precisar de margin manual" },
          ]}
        />
      </div>

      <div className="section">
        <h3>
          <span className="num">3</span>
          <code>flex: 1</code> — ocupando o espaço disponível
        </h3>
        <div className="two-col">
          <div>
            <p>
              É comum querer que um container ocupe toda a tela disponível.
              Diferente da web (onde <code>height: 100%</code> ou{" "}
              <code>100vh</code> resolve isso), em React Native o caminho
              mais usado é <code>flex: 1</code> no elemento raiz — ele diz
              "cresça pra preencher todo o espaço que o seu pai te der".
            </p>
            <AnnotatedCode
              filename="App.tsx"
              lines={[
                [
                  "import { ",
                  t("SafeAreaProvider", "Mede as áreas seguras do aparelho — precisa envolver o app uma vez só (ver Aula 2)."),
                  ", ",
                  t("SafeAreaView", "Raiz da tela, respeitando notch e barra de gestos — vem do react-native-safe-area-context."),
                  " } from 'react-native-safe-area-context'",
                ],
                ["import { ", t("View", "Blocos de layout."), ", ", t("StyleSheet", "Cria estilos."), " } from 'react-native'"],
                [""],
                ["const App = () => {"],
                ["  return ("],
                ["    <SafeAreaProvider>"],
                ["      <SafeAreaView style={styles.container}>"],
                ["        <View style={styles.topo} />"],
                ["        <View style={styles.conteudo} />"],
                ["      </SafeAreaView>"],
                ["    </SafeAreaProvider>"],
                ["  )"],
                ["}"],
                [""],
                ["const styles = StyleSheet.create({"],
                ["  container: { ", t("flex", "1 = ocupa todo o espaço vertical disponível da tela."), ": 1 },"],
                ["  topo: { height: 60, backgroundColor: '#241c3d' },"],
                ["  conteudo: { ", t("flex", "Junto com um 'topo' de altura fixa, o conteúdo cresce pra preencher o resto."), ": 1, backgroundColor: '#1d1730' },"],
                ["})"],
                [""],
                ["export default App"],
              ]}
            />
          </div>
          <DeviceFrame caption="topo fixo + conteúdo ocupando o resto (flex: 1)">
            <div style={{ display: "flex", flexDirection: "column", height: "100%", margin: -14, marginTop: -14 }}>
              <div style={{ height: 40, background: "#e4e0f5" }} />
              <div style={{ flex: 1, background: "#f2f2f2" }} />
            </div>
          </DeviceFrame>
        </div>
      </div>

      <div className="section">
        <h3>
          <span className="num">4</span>
          Estilos específicos por plataforma
        </h3>
        <p>
          Às vezes iOS e Android precisam de um ajuste ligeiramente
          diferente (sombra, por exemplo, funciona diferente nos dois). O
          módulo <code>Platform</code> resolve isso:
        </p>
        <AnnotatedCode
          filename="trecho"
          lines={[
            ["import { ", t("Platform", "Módulo que identifica em qual sistema operacional o app está rodando."), ", ", t("StyleSheet", "Cria estilos."), " } from 'react-native'"],
            [""],
            ["const styles = StyleSheet.create({"],
            ["  cartao: {"],
            ["    padding: 16,"],
            [
              "    ...",
              t("Platform.select", "Escolhe um objeto de estilo diferente dependendo da plataforma detectada.", [
                { value: "ios", desc: "aplicado só quando roda em iOS" },
                { value: "android", desc: "aplicado só quando roda em Android" },
              ]),
              "({",
            ],
            ["      ios: {"],
            ["        shadowColor: '#000',"],
            ["        shadowOpacity: 0.15,"],
            ["        shadowRadius: 8,"],
            ["      },"],
            ["      android: {"],
            ["        ", t("elevation", "Equivalente da sombra no Android — um número só, sem as 3 props de shadow do iOS."), ": 4,"],
            ["      },"],
            ["    }),"],
            ["  },"],
            ["})"],
          ]}
        />
        <Callout type="dica">
          <code>Platform.OS</code> retorna <code>"ios"</code> ou{" "}
          <code>"android"</code> — útil também fora de estilos, pra mudar
          comportamento condicional no próprio JSX.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">5</span>Prática
        </h3>
        <Callout type="pratica">
          Pegue o <code>components/CartaoPerfil.tsx</code> que você criou
          na Aula 2 e reorganize com Flexbox: coloque a <code>Image</code>{" "}
          e os dois <code>Text</code> (nome e bio) lado a lado usando{" "}
          <code>flexDirection: "row"</code>, com{" "}
          <code>alignItems: "center"</code> e <code>gap</code> entre eles.
          Depois, deixe o botão "Seguir" alinhado à direita usando{" "}
          <code>justifyContent: "space-between"</code>.
        </Callout>
      </div>

      <div className="aula-footer-nav">
        <button className="nav-btn" onClick={() => goTo("aula2")}>
          <span className="nb-label">← Anterior</span>
          Aula 2 · Componentes básicos
        </button>
        <button className="nav-btn right" onClick={() => goTo("aula4")}>
          <span className="nb-label">Próxima →</span>
          Aula 4 · Props
        </button>
      </div>
    </div>
  );
}
