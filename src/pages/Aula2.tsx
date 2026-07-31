import AnnotatedCode from "../components/AnnotatedCode";
import Callout from "../components/Callout";
import PropsTable from "../components/PropsTable";
import DeviceFrame from "../components/DeviceFrame";
import Term from "../components/Term";
import { t } from "../utils/ann";

interface PageProps {
  goTo: (id: string) => void;
}

export default function Aula2({ goTo }: PageProps) {
  return (
    <div className="page">
      <span className="eyebrow">Bloco 1 · Aula 2</span>
      <h2 className="title">Os componentes básicos: o alfabeto de qualquer tela</h2>
      <p className="lede">
        Se em HTML você monta tela com <code>div</code>, <code>p</code>,{" "}
        <code>img</code> e <code>button</code>, em React Native existe um
        conjunto equivalente — só que nativo. Hoje vamos conhecer todos os
        essenciais, criando cada um dentro da pasta <code>components</code>{" "}
        que já preparamos na Aula 1, usando um atalho que acelera muito o
        dia a dia: o snippet <code>rnfce</code>.
      </p>

      <div className="section">
        <h3>
          <span className="num">0</span>O atalho <code>rnfce</code>
        </h3>
        <p>
          No VS Code, instale a extensão{" "}
          <strong>ES7+ React/Redux/React-Native Snippets</strong>. Com ela,
          crie um arquivo dentro de <code>components/</code> (ex:{" "}
          <code>components/Cartao.tsx</code> — repare na extensão{" "}
          <code>.tsx</code>, não <code>.jsx</code>), digite{" "}
          <code>rnfce</code> e aperte <code>Tab</code>: o editor gera
          sozinho o esqueleto de um componente funcional de React Native,
          já com export incluído. Toque nos termos destacados no código
          abaixo pra entender cada linha:
        </p>
        <AnnotatedCode
          filename="components/Cartao.tsx"
          lines={[
            [
              "import { ",
              t("StyleSheet", "Objeto do React Native usado pra criar e validar estilos — vamos usar o create dele em toda aula."),
              ", ",
              t("Text", "Componente que exibe texto na tela — todo texto em RN precisa estar dentro de um Text."),
              ", ",
              t("View", "Componente container universal — o equivalente à div da web."),
              " } from 'react-native'",
            ],
            [
              "import React from 'react'",
            ],
            [""],
            [
              "const ",
              t("Cartao", "Nome do componente. A extensão nomeia automaticamente igual ao nome do arquivo."),
              " = () => {",
            ],
            ["  return ("],
            ["    <", t("View", "Abre o container que vai envolver o conteúdo do cartão."), ">"],
            ["      <", t("Text", "Texto exibido dentro do container."), ">Cartao</Text>"],
            ["    </View>"],
            ["  )"],
            ["}"],
            [""],
            [
              t("export default Cartao", "Exporta o componente pra poder ser importado em outros arquivos, como o App.tsx."),
            ],
            [""],
            [
              "const styles = ",
              t("StyleSheet.create", "Cria o objeto de estilos do componente — vazio por enquanto, a gente preenche na Aula 3.", ),
              "({})",
            ],
          ]}
        />
        <Callout type="dica">
          Existem variações do snippet: <code>rnfc</code> (sem export, com
          export separado no final), <code>rnfs</code> (class component,
          raramente usado hoje). Fixem o <code>rnfce</code> — é o que vamos
          usar o curso inteiro.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">1</span>
          <code>View</code> — o container universal
        </h3>
        <div className="two-col">
          <div>
            <p>
              Equivalente à <code>&lt;div&gt;</code> da web. Não renderiza
              nada visualmente por si só — serve pra agrupar e organizar
              outros componentes. Por padrão, todo <code>View</code> já usa{" "}
              <Term note="Modelo de layout unidimensional que organiza elementos em linha ou coluna, distribuindo espaço entre eles.">
                flexbox
              </Term>{" "}
              com <code>flexDirection: "column"</code> (na web, flex column
              exige declarar; aqui é o padrão).
            </p>
            <AnnotatedCode
              filename="components/Cartao.tsx"
              lines={[
                ["import { ", t("View", "Container universal, sem aparência própria."), ", ", t("Text", "Exibe texto."), ", ", t("StyleSheet", "Cria estilos validados."), " } from 'react-native'"],
                [""],
                ["const Cartao = () => {"],
                ["  return ("],
                [
                  "    <View ",
                  t("style", "Aceita um objeto de estilo (ou array de objetos) — aqui aponta pro styles.caixa definido embaixo.", [
                    { value: "objeto único", desc: "{ padding: 16 }" },
                    { value: "array", desc: "[styles.a, condicao && styles.b]" },
                  ]),
                  "={styles.caixa}>",
                ],
                ["      <Text>Dentro do container</Text>"],
                ["    </View>"],
                ["  )"],
                ["}"],
                [""],
                ["const styles = StyleSheet.create({"],
                ["  caixa: {"],
                ["    ", t("padding", "Espaçamento interno, igual ao padding do CSS — mas só em número, sem unidade."), ": 16,"],
                ["    ", t("backgroundColor", "Cor de fundo — aceita hexadecimal, rgb(), ou nomes de cor."), ": '#f2f2f2',"],
                ["  }"],
                ["})"],
                [""],
                ["export default Cartao"],
              ]}
            />
            <PropsTable
              rows={[
                { name: "style", type: "objeto | array", desc: "Estilos, aceita um objeto único ou um array de objetos" },
                { name: "pointerEvents", type: "string", desc: '"auto" | "none" | "box-none" | "box-only" — controla se recebe toques' },
                { name: "onLayout", type: "função", desc: "Dispara quando o elemento é medido/posicionado na tela" },
              ]}
            />
          </div>
          <DeviceFrame caption="View com padding e fundo cinza">
            <div style={{ padding: 16, background: "#f2f2f2", borderRadius: 4 }}>
              <span style={{ fontSize: 13 }}>Dentro do container</span>
            </div>
          </DeviceFrame>
        </div>
      </div>

      <div className="section">
        <h3>
          <span className="num">2</span>
          <code>Text</code> — todo texto precisa disso
        </h3>
        <div className="two-col">
          <div>
            <p>
              Diferença importante em relação à web: em React Native{" "}
              <strong>você não pode colocar texto solto dentro de uma{" "}
              <code>View</code></strong> — todo texto precisa estar dentro
              de um componente <code>Text</code>. Escrever{" "}
              <code>&lt;View&gt;Olá&lt;/View&gt;</code> gera erro.
            </p>
            <AnnotatedCode
              filename="components/Titulo.tsx"
              lines={[
                ["import { ", t("Text", "Único componente que pode conter texto diretamente."), ", ", t("StyleSheet", "Cria estilos validados."), " } from 'react-native'"],
                [""],
                ["const Titulo = () => {"],
                ["  return ("],
                [
                  "    <Text style={styles.titulo} ",
                  t("numberOfLines", "Limita a quantidade de linhas exibidas — o resto do texto é cortado.", [
                    { value: "1", desc: "trunca em uma linha só" },
                    { value: "2", desc: "permite quebrar em até duas linhas" },
                  ]),
                  "={1}>",
                ],
                ["      Bem-vindo ao app"],
                ["    </Text>"],
                ["  )"],
                ["}"],
                [""],
                ["const styles = StyleSheet.create({"],
                ["  titulo: {"],
                ["    ", t("fontSize", "Tamanho da fonte, em número — sem unidade."), ": 22,"],
                ["    ", t("fontWeight", "Peso da fonte.", [
                  { value: "'normal'", desc: "peso padrão" },
                  { value: "'bold'", desc: "negrito" },
                  { value: "'600'", desc: "aceita também string numérica" },
                ]), ": 'bold',"],
                ["    ", t("color", "Cor do texto."), ": '#1a1425',"],
                ["  }"],
                ["})"],
                [""],
                ["export default Titulo"],
              ]}
            />
            <PropsTable
              rows={[
                { name: "style", type: "objeto | array", desc: "Aceita fontSize, color, fontWeight, textAlign, etc" },
                { name: "numberOfLines", type: "number", desc: "Limita o texto a N linhas, cortando o resto" },
                { name: "ellipsizeMode", type: "string", desc: '"head" | "middle" | "tail" | "clip" — onde cortar o texto excedente' },
                { name: "onPress", type: "função", desc: "Torna o texto tocável (vira um link, por exemplo)" },
                { name: "selectable", type: "boolean", desc: "Permite que o usuário selecione/copie o texto" },
              ]}
            />
          </div>
          <DeviceFrame caption='"Bem-vindo ao app" como um Text estilizado'>
            <p style={{ fontSize: 22, fontWeight: "bold", margin: 0 }}>
              Bem-vindo ao app
            </p>
          </DeviceFrame>
        </div>
      </div>

      <div className="section">
        <h3>
          <span className="num">3</span>
          <code>Image</code> — exibindo imagens
        </h3>
        <div className="two-col">
          <div>
            <p>
              Recebe a imagem por meio da prop <code>source</code>, de duas
              formas: <code>require("./caminho.png")</code> pra imagens
              locais dentro do projeto, ou <code>{"{ uri: 'https://...' }"}</code>{" "}
              pra imagens vindas da internet. Diferente da web,{" "}
              <strong>largura e altura não são automáticas</strong> — sem
              definir <code>width</code>/<code>height</code> no style, a
              imagem não aparece.
            </p>
            <AnnotatedCode
              filename="components/Avatar.tsx"
              lines={[
                ["import { ", t("Image", "Componente que exibe imagens locais ou remotas."), ", ", t("StyleSheet", "Cria estilos validados."), " } from 'react-native'"],
                [""],
                ["const Avatar = () => {"],
                ["  return ("],
                ["    <Image"],
                [
                  "      ",
                  t("source", "Origem da imagem.", [
                    { value: "require('./foto.png')", desc: "imagem local, dentro do projeto" },
                    { value: "{ uri: 'https://...' }", desc: "imagem remota, vinda da internet" },
                  ]),
                  "={{ uri: 'https://exemplo.com/foto.png' }}",
                ],
                ["      style={styles.foto}"],
                [
                  "      ",
                  t("resizeMode", "Como a imagem se ajusta ao tamanho da caixa definida no style.", [
                    { value: "'cover'", desc: "preenche a caixa toda, cortando o excesso" },
                    { value: "'contain'", desc: "cabe inteira dentro da caixa, sem cortar" },
                    { value: "'stretch'", desc: "estica pra preencher, pode distorcer" },
                    { value: "'center'", desc: "centraliza sem redimensionar" },
                  ]),
                  '="cover"',
                ],
                ["    />"],
                ["  )"],
                ["}"],
                [""],
                ["const styles = StyleSheet.create({"],
                ["  foto: {"],
                ["    ", t("width", "Obrigatório — sem isso a imagem não aparece."), ": 80,"],
                ["    ", t("height", "Obrigatório, junto com width."), ": 80,"],
                ["    ", t("borderRadius", "Metade da largura/altura deixa a imagem redonda."), ": 40,"],
                ["  }"],
                ["})"],
                [""],
                ["export default Avatar"],
              ]}
            />
            <PropsTable
              rows={[
                { name: "source", type: "require(...) | {uri}", desc: "Origem da imagem: local ou remota" },
                { name: "style", type: "objeto", desc: "Precisa incluir width e height, senão a imagem não renderiza" },
                { name: "resizeMode", type: "string", desc: '"cover" | "contain" | "stretch" | "center" — como a imagem se ajusta à caixa' },
                { name: "defaultSource", type: "require(...)", desc: "Imagem exibida enquanto a de verdade carrega (só local)" },
              ]}
            />
          </div>
          <DeviceFrame caption="Image redonda com resizeMode cover">
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                background: "linear-gradient(145deg, #4ade9e, #6fb3ff)",
              }}
            />
          </DeviceFrame>
        </div>
      </div>

      <div className="section">
        <h3>
          <span className="num">4</span>
          <code>ScrollView</code> — quando o conteúdo não cabe na tela
        </h3>
        <div className="two-col">
          <div>
            <p>
              Um <code>View</code> comum não rola — se o conteúdo passar da
              altura da tela, ele simplesmente é cortado. O{" "}
              <code>ScrollView</code> resolve isso, envolvendo o conteúdo
              numa área rolável. Ele renderiza <strong>todos</strong> os
              filhos de uma vez (bom pra listas curtas; pra listas longas,
              o ideal é <code>FlatList</code>, que vamos ver mais adiante
              no curso).
            </p>
            <AnnotatedCode
              filename="components/Feed.tsx"
              lines={[
                ["import { ", t("ScrollView", "Container rolável — envolve conteúdo que pode passar da altura da tela."), ", ", t("Text", "Cada item da lista."), ", ", t("StyleSheet", "Cria estilos validados."), " } from 'react-native'"],
                [""],
                ["const Feed = () => {"],
                ["  return ("],
                ["    <ScrollView"],
                ["      style={styles.container}"],
                [
                  "      ",
                  t("showsVerticalScrollIndicator", "Mostra ou esconde a barrinha de rolagem lateral.", [
                    { value: "true", desc: "mostra a barra (padrão)" },
                    { value: "false", desc: "esconde a barra" },
                  ]),
                  "={false}",
                ],
                ["    >"],
                ["      <Text>Item 1</Text>"],
                ["      <Text>Item 2</Text>"],
                ["      <Text>Item 3</Text>"],
                ["    </ScrollView>"],
                ["  )"],
                ["}"],
                [""],
                ["const styles = StyleSheet.create({"],
                ["  container: { ", t("flex", "Faz o ScrollView ocupar todo o espaço disponível do pai."), ": 1 }"],
                ["})"],
                [""],
                ["export default Feed"],
              ]}
            />
            <PropsTable
              rows={[
                { name: "horizontal", type: "boolean", desc: "Rola na horizontal em vez de vertical" },
                { name: "showsVerticalScrollIndicator", type: "boolean", desc: "Mostra ou esconde a barrinha de rolagem" },
                { name: "contentContainerStyle", type: "objeto", desc: "Estilo aplicado ao conteúdo interno (não ao container externo)" },
                { name: "style", type: "objeto", desc: "Estilo do container externo do ScrollView" },
              ]}
            />
          </div>
          <DeviceFrame caption="ScrollView com 3 itens empilhados">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Item 1", "Item 2", "Item 3"].map((i) => (
                <div key={i} style={{ padding: 10, background: "#f2f2f2", borderRadius: 6, fontSize: 13 }}>
                  {i}
                </div>
              ))}
            </div>
          </DeviceFrame>
        </div>
      </div>

      <div className="section">
        <h3>
          <span className="num">5</span>
          <code>SafeAreaView</code> — respeitando notch e barra de status
        </h3>
        <div className="two-col">
          <div>
            <p>
              Celulares modernos têm{" "}
              <Term note="O recorte na tela onde ficam a câmera frontal e os sensores — comum em iPhones e boa parte dos Androids.">
                notch
              </Term>
              , câmera furo-na-tela e a barra de gestos embaixo. Sem
              cuidado, seu conteúdo pode ficar escondido atrás dessas
              áreas. O <code>SafeAreaView</code> adiciona um espaçamento
              automático pra manter o conteúdo dentro da área "segura" e
              visível da tela.
            </p>
            <AnnotatedCode
              filename="App.tsx"
              lines={[
                ["import { ", t("SafeAreaView", "Container que adiciona espaçamento automático pra fugir do notch e da barra de gestos."), ", ", t("Text", "Conteúdo protegido."), ", ", t("StyleSheet", "Cria estilos validados."), " } from 'react-native'"],
                [""],
                ["const App = () => {"],
                ["  return ("],
                ["    <SafeAreaView style={styles.container}>"],
                ["      <Text>Conteúdo protegido do notch</Text>"],
                ["    </SafeAreaView>"],
                ["  )"],
                ["}"],
                [""],
                ["const styles = StyleSheet.create({"],
                ["  container: { flex: 1 }"],
                ["})"],
                [""],
                ["export default App"],
              ]}
            />
            <PropsTable
              rows={[
                { name: "style", type: "objeto", desc: "Estilo do container, igual a um View comum" },
              ]}
            />
            <Callout type="dica">
              Use <code>SafeAreaView</code> envolvendo a tela inteira,
              geralmente no <code>App.tsx</code> ou logo no componente raiz
              de cada tela do app.
            </Callout>
          </div>
          <DeviceFrame caption="Conteúdo respeitando a área segura">
            <div style={{ paddingTop: 8 }}>
              <span style={{ fontSize: 13 }}>Conteúdo protegido do notch</span>
            </div>
          </DeviceFrame>
        </div>
      </div>

      <div className="section">
        <h3>
          <span className="num">6</span>
          <code>Button</code> — o botão mais simples
        </h3>
        <div className="two-col">
          <div>
            <p>
              O jeito mais direto de ter um botão clicável. É rápido de
              usar, mas tem uma limitação grande: você{" "}
              <strong>não consegue estilizar o botão em si</strong> (nada
              de mudar tamanho, fonte ou formato) — só a cor do texto/fundo
              via <code>color</code>, e mesmo assim o visual muda entre
              iOS e Android.
            </p>
            <AnnotatedCode
              filename="components/BotaoEnviar.tsx"
              lines={[
                ["import { ", t("Button", "Botão pronto do sistema — visual nativo, pouco customizável."), ", ", t("Alert", "API nativa pra mostrar um alerta popup."), " } from 'react-native'"],
                [""],
                ["const BotaoEnviar = () => {"],
                ["  return ("],
                ["    <Button"],
                ["      ", t("title", "Texto exibido no botão — a única forma de por texto nele.", ), '="Enviar"'],
                ["      ", t("color", "Cor do texto (iOS) ou do fundo (Android) — muda de comportamento entre plataformas."), '="#4ade9e"'],
                ["      ", t("onPress", "Função executada quando o botão é tocado."), "={() => Alert.alert('Enviado!')}"],
                ["    />"],
                ["  )"],
                ["}"],
                [""],
                ["export default BotaoEnviar"],
              ]}
            />
            <PropsTable
              rows={[
                { name: "title", type: "string", desc: "Texto exibido no botão (obrigatório)" },
                { name: "onPress", type: "função", desc: "Executada quando o botão é tocado" },
                { name: "color", type: "string", desc: "Cor do texto (iOS) ou do fundo (Android)" },
                { name: "disabled", type: "boolean", desc: "Desativa o botão e deixa visual acinzentado" },
              ]}
            />
          </div>
          <DeviceFrame caption="Button nativo — visual padrão do sistema">
            <button
              style={{
                background: "#4ade9e",
                color: "#0e0a17",
                border: "none",
                borderRadius: 6,
                padding: "10px 16px",
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              ENVIAR
            </button>
          </DeviceFrame>
        </div>
      </div>

      <div className="section">
        <h3>
          <span className="num">7</span>
          <code>TouchableOpacity</code> — botão de verdade, do seu jeito
        </h3>
        <div className="two-col">
          <div>
            <p>
              Quando o <code>Button</code> é limitado demais, a solução é o{" "}
              <code>TouchableOpacity</code>: ele não é um botão pronto, é
              um <strong>wrapper que torna qualquer coisa tocável</strong>{" "}
              — você põe uma <code>View</code> com <code>Text</code>{" "}
              dentro, estiliza como quiser, e ganha de graça o feedback
              visual de toque (a opacidade diminui brevemente ao tocar).
            </p>
            <AnnotatedCode
              filename="components/BotaoCustom.tsx"
              lines={[
                ["import { ", t("TouchableOpacity", "Torna qualquer conteúdo tocável, com feedback de opacidade — estilização 100% livre."), ", ", t("Text", "Texto dentro do botão."), ", ", t("StyleSheet", "Cria estilos validados."), " } from 'react-native'"],
                [""],
                ["const BotaoCustom = () => {"],
                ["  return ("],
                ["    <TouchableOpacity"],
                ["      style={styles.botao}"],
                [
                  "      ",
                  t("activeOpacity", "Opacidade durante o toque — padrão 0.2. Quanto menor, mais escurece ao tocar.", [
                    { value: "0.7", desc: "feedback suave" },
                    { value: "0.2", desc: "feedback bem marcado (padrão)" },
                  ]),
                  "={0.7}",
                ],
                ["      ", t("onPress", "Função executada ao tocar e soltar dentro do componente."), "={() => console.log('tocado')}"],
                ["    >"],
                ["      <Text style={styles.texto}>Continuar</Text>"],
                ["    </TouchableOpacity>"],
                ["  )"],
                ["}"],
                [""],
                ["const styles = StyleSheet.create({"],
                ["  botao: {"],
                ["    backgroundColor: '#ffb84d',"],
                ["    ", t("paddingVertical", "Espaçamento interno só em cima e embaixo."), ": 12,"],
                ["    ", t("paddingHorizontal", "Espaçamento interno só nos lados."), ": 24,"],
                ["    borderRadius: 10,"],
                ["  },"],
                ["  texto: {"],
                ["    color: '#1a1425',"],
                ["    fontWeight: 'bold',"],
                ["    ", t("textAlign", "Alinhamento horizontal do texto dentro do Text."), ": 'center',"],
                ["  }"],
                ["})"],
                [""],
                ["export default BotaoCustom"],
              ]}
            />
            <PropsTable
              rows={[
                { name: "onPress", type: "função", desc: "Executada ao tocar e soltar dentro do componente" },
                { name: "activeOpacity", type: "number (0–1)", desc: "Opacidade durante o toque — padrão 0.2" },
                { name: "disabled", type: "boolean", desc: "Desativa o toque, sem efeito visual de feedback" },
                { name: "style", type: "objeto | array", desc: "Estilização livre, igual a uma View" },
              ]}
            />
            <Callout type="dica">
              Existe também o <code>Pressable</code>, mais novo e mais
              flexível (dá acesso ao estado do toque via função de style).
              Pra essa fase do curso, <code>TouchableOpacity</code> já
              resolve o essencial — vamos revisitar <code>Pressable</code>{" "}
              mais adiante.
            </Callout>
          </div>
          <DeviceFrame caption="TouchableOpacity com estilo próprio">
            <div
              style={{
                background: "#ffb84d",
                padding: "12px 24px",
                borderRadius: 10,
                display: "inline-block",
              }}
            >
              <span style={{ color: "#1a1425", fontWeight: 700, fontSize: 13 }}>
                Continuar
              </span>
            </div>
          </DeviceFrame>
        </div>
      </div>

      <div className="section">
        <h3>
          <span className="num">8</span>Prática
        </h3>
        <Callout type="pratica">
          Crie um componente <code>components/CartaoPerfil.tsx</code> usando{" "}
          <code>rnfce</code>. Dentro dele, monte: uma{" "}
          <code>SafeAreaView</code> envolvendo tudo, uma <code>Image</code>{" "}
          circular (use uma URL de foto qualquer), um <code>Text</code> com
          o nome, outro <code>Text</code> menor com uma bio curta, e um{" "}
          <code>TouchableOpacity</code> estilizado como botão "Seguir".
          Teste no seu celular pelo Expo Go antes de mostrar pro professor.
        </Callout>
      </div>

      <div className="aula-footer-nav">
        <button className="nav-btn" onClick={() => goTo("aula1")}>
          <span className="nb-label">← Anterior</span>
          Aula 1 · Intro + setup
        </button>
        <button className="nav-btn right" onClick={() => goTo("aula3")}>
          <span className="nb-label">Próxima →</span>
          Aula 3 · Estilização e Flexbox
        </button>
      </div>
    </div>
  );
}
