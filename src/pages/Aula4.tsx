import AnnotatedCode from "../components/AnnotatedCode";
import Callout from "../components/Callout";
import PropsTable from "../components/PropsTable";
import DeviceFrame from "../components/DeviceFrame";
import Term from "../components/Term";
import { t } from "../utils/ann";

interface PageProps {
  goTo: (id: string) => void;
}

export default function Aula4({ goTo }: PageProps) {
  return (
    <div className="page">
      <span className="eyebrow">Bloco 1 · Aula 4</span>
      <h2 className="title">Props: fazendo um componente receber informação de fora</h2>
      <p className="lede">
        Até agora todo componente que vocês criaram é fixo — o texto, a
        cor, a imagem, tudo escrito direto dentro dele. Hoje isso muda:
        vamos aprender a fazer um componente receber dados de quem o usa,
        pra poder reaproveitar o mesmo <code>Cartao</code> pra mostrar 6
        produtos diferentes, por exemplo.
      </p>

      <div className="section">
        <h3>
          <span className="num">1</span>O que é uma prop
        </h3>
        <p>
          <Term note="Abreviação de 'properties' (propriedades). É como um componente recebe informação de fora, do mesmo jeito que uma tag HTML recebe atributos.">
            Props
          </Term>{" "}
          são pros seus componentes o que os atributos são pra uma tag
          HTML: <code>&lt;img src="foto.png" width="80"&gt;</code> — o{" "}
          <code>src</code> e o <code>width</code> são informações que você
          passa de fora pra dentro da tag. Em React (e React Native é
          igual nisso), um componente recebe essas informações como um
          único objeto, tradicionalmente chamado <code>props</code>.
        </p>
        <p>Sem destruturação — do jeito "por extenso" — ficaria assim:</p>
        <AnnotatedCode
          filename="components/Cartao.tsx"
          lines={[
            ["import { View, Text, StyleSheet } from 'react-native'"],
            [""],
            [
              "const Cartao = (",
              t("props", "Objeto único que chega pro componente, contendo todas as props passadas por quem o usa.", ),
              ") => {",
            ],
            ["  return ("],
            ["    <View style={styles.caixa}>"],
            ["      <Text style={styles.titulo}>{", t("props.titulo", "Pra usar qualquer prop, precisa sempre escrever props. na frente."), "}</Text>"],
            ["      <Text>{props.preco}</Text>"],
            ["    </View>"],
            ["  )"],
            ["}"],
          ]}
        />
        <Callout type="atencao">
          Funciona, mas repare que toda prop usada precisa do prefixo{" "}
          <code>props.</code> na frente — <code>props.titulo</code>,{" "}
          <code>props.preco</code>. Isso é o que vamos eliminar agora com
          desestruturação.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">2</span>
          <Term note="Sintaxe do JavaScript/TypeScript que 'quebra' um objeto em variáveis soltas, pegando direto as chaves que você quer.">
            Desestruturação
          </Term>{" "}
          — o jeito que vamos usar sempre
        </h3>
        <p>
          Em vez de receber o objeto <code>props</code> inteiro e escrever{" "}
          <code>props.algumaCoisa</code> toda hora, a gente já "abre" esse
          objeto direto no parâmetro da função, extraindo só os nomes que
          interessam. É mais curto, mais legível, e é o padrão que vocês
          vão ver na esmagadora maioria do código React por aí.
        </p>
        <AnnotatedCode
          filename="components/Cartao.tsx"
          lines={[
            ["import { View, Text, StyleSheet } from 'react-native'"],
            [""],
            [
              "const Cartao = ({ ",
              t("titulo", "Extraída direto do objeto de props — usar só o nome, sem prefixo nenhum."),
              ", ",
              t("preco", "Mesma ideia — outra prop extraída na hora."),
              " }",
              t(": CartaoProps", "Anotação de tipo do TypeScript — diz exatamente quais props existem e de que tipo é cada uma."),
              ") => {",
            ],
            ["  return ("],
            ["    <View style={styles.caixa}>"],
            ["      <Text style={styles.titulo}>{titulo}</Text>"],
            ["      <Text>{preco}</Text>"],
            ["    </View>"],
            ["  )"],
            ["}"],
          ]}
        />
        <p>
          Repare: dentro do componente, <code>titulo</code> e{" "}
          <code>preco</code> já são variáveis normais — sem prefixo, sem
          nada na frente. A "mágica" toda acontece só na linha do
          parâmetro.
        </p>
      </div>

      <div className="section">
        <h3>
          <span className="num">3</span>Tipando as props com uma <code>interface</code>
        </h3>
        <div className="two-col">
          <div>
            <p>
              Como o projeto é TypeScript, o React sozinho não sabe quais
              props um componente aceita nem de que tipo elas são — quem
              define isso é você, com uma <code>interface</code> (ou{" "}
              <code>type</code>, dá no mesmo aqui). Ela funciona como um
              contrato: quem for usar o <code>Cartao</code> é obrigado a
              passar exatamente essas props, com esses tipos.
            </p>
            <AnnotatedCode
              filename="components/Cartao.tsx"
              lines={[
                ["import { View, Text, StyleSheet } from 'react-native'"],
                [""],
                [
                  "interface ",
                  t("CartaoProps", "Nome da interface — por convenção, nome do componente + Props."),
                  " {",
                ],
                ["  ", t("titulo", "Nome da prop."), ": ", t("string", "Tipo esperado: um texto."), ";"],
                ["  ", t("preco", "Outra prop."), ": ", t("number", "Tipo esperado: um número."), ";"],
                ["}"],
                [""],
                ["const Cartao = ({ titulo, preco }: CartaoProps) => {"],
                ["  return ("],
                ["    <View style={styles.caixa}>"],
                ["      <Text style={styles.titulo}>{titulo}</Text>"],
                ["      <Text>R$ {preco}</Text>"],
                ["    </View>"],
                ["  )"],
                ["}"],
                [""],
                ["export default Cartao"],
                [""],
                ["const styles = StyleSheet.create({"],
                ["  caixa: { padding: 16, backgroundColor: '#f2f2f2', borderRadius: 8 },"],
                ["  titulo: { fontSize: 16, fontWeight: 'bold' },"],
                ["})"],
              ]}
            />
            <Callout type="dica">
              Se você tentar usar o <code>Cartao</code> sem passar{" "}
              <code>preco</code>, ou passando um texto no lugar de número,
              o TypeScript já avisa o erro no editor — antes de você nem
              testar no celular.
            </Callout>
          </div>
          <DeviceFrame caption="Cartao recebendo titulo e preco de fora">
            <div style={{ padding: 16, background: "#f2f2f2", borderRadius: 8 }}>
              <p style={{ fontSize: 16, fontWeight: "bold", margin: "0 0 4px" }}>Tênis Runner</p>
              <span style={{ fontSize: 13 }}>R$ 299</span>
            </div>
          </DeviceFrame>
        </div>
      </div>

      <div className="section">
        <h3>
          <span className="num">4</span>Usando o componente e passando as props
        </h3>
        <p>
          Do lado de quem usa o <code>Cartao</code>, cada prop vira um
          atributo JSX — a mesma sintaxe que vocês já usam pra passar{" "}
          <code>style</code>, <code>source</code>, <code>onPress</code>,
          etc, porque no fim das contas são todas props também.
        </p>
        <AnnotatedCode
          filename="App.tsx"
          lines={[
            ["import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'"],
            ["import { ScrollView, StyleSheet } from 'react-native'"],
            ["import Cartao from './components/Cartao'"],
            [""],
            ["export default function App() {"],
            ["  return ("],
            ["    <SafeAreaProvider>"],
            ["      <SafeAreaView style={styles.container}>"],
            ["        <ScrollView contentContainerStyle={styles.scrollContent}>"],
            [
              "          <Cartao ",
              t("titulo", "Cada atributo JSX vira uma entrada no objeto de props recebido pelo Cartao."),
              '="Tênis Runner" ',
              t("preco", "O valor entre chaves é avaliado como JavaScript — aqui, um número de verdade, não texto."),
              "={299} />",
            ],
            ["          <Cartao titulo=\"Mochila Trail\" preco={189} />"],
            ["          <Cartao titulo=\"Garrafa Térmica\" preco={79} />"],
            ["        </ScrollView>"],
            ["      </SafeAreaView>"],
            ["    </SafeAreaProvider>"],
            ["  )"],
            ["}"],
            [""],
            ["const styles = StyleSheet.create({"],
            ["  container: { flex: 1 },"],
            ["  scrollContent: { padding: 10, gap: 10 },"],
            ["})"],
          ]}
        />
        <Callout type="dica">
          É exatamente esse pulo do gato que resolve o "6 cartões
          repetidos" da Aula 2 — em vez de copiar e colar o mesmo{" "}
          <code>Cartao</code> seis vezes, agora cada um recebe dados
          diferentes e mostra algo diferente.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">5</span>Props opcionais e valor padrão
        </h3>
        <div className="two-col">
          <div>
            <p>
              Nem toda prop precisa ser obrigatória. Marcando com{" "}
              <code>?</code> na interface, ela vira opcional — e dá pra
              definir um valor padrão direto na desestruturação, caso quem
              use o componente não passe nada.
            </p>
            <AnnotatedCode
              filename="components/Cartao.tsx"
              lines={[
                ["interface CartaoProps {"],
                ["  titulo: string;"],
                ["  preco: number;"],
                [
                  "  ",
                  t("emPromocao", "O ? deixa a prop opcional — o componente funciona com ou sem ela."),
                  "?: boolean;",
                ],
                ["}"],
                [""],
                [
                  "const Cartao = ({ titulo, preco, ",
                  t("emPromocao = false", "Se ninguém passar emPromocao, ela assume false automaticamente — sem precisar checar undefined dentro do componente."),
                  " }: CartaoProps) => {",
                ],
                ["  return ("],
                ["    <View style={styles.caixa}>"],
                ["      <Text style={styles.titulo}>{titulo}</Text>"],
                ["      <Text>R$ {preco}</Text>"],
                ["      {emPromocao && <Text style={styles.selo}>Promoção</Text>}"],
                ["    </View>"],
                ["  )"],
                ["}"],
              ]}
            />
          </div>
          <DeviceFrame caption="emPromocao=true exibindo o selo extra">
            <div style={{ padding: 16, background: "#f2f2f2", borderRadius: 8 }}>
              <p style={{ fontSize: 16, fontWeight: "bold", margin: "0 0 4px" }}>Mochila Trail</p>
              <span style={{ fontSize: 13 }}>R$ 189</span>
              <div style={{ marginTop: 6, display: "inline-block", background: "#ffb84d", color: "#1a1425", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 100 }}>
                Promoção
              </div>
            </div>
          </DeviceFrame>
        </div>
      </div>

      <div className="section">
        <h3>
          <span className="num">6</span>Prop função: avisando o componente pai
        </h3>
        <p>
          Props não precisam ser só texto ou número — também podem ser{" "}
          <strong>funções</strong>. É assim que um componente filho avisa o
          pai que algo aconteceu (um toque, por exemplo), sem precisar
          saber o que o pai vai fazer com essa informação.
        </p>
        <AnnotatedCode
          filename="components/Cartao.tsx"
          lines={[
            ["import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'"],
            [""],
            ["interface CartaoProps {"],
            ["  titulo: string;"],
            ["  preco: number;"],
            [
              "  ",
              t("onComprar", "Prop do tipo função — quem usa o Cartao decide o que acontece quando ela é chamada.", ),
              ": () => void;",
            ],
            ["}"],
            [""],
            ["const Cartao = ({ titulo, preco, onComprar }: CartaoProps) => {"],
            ["  return ("],
            ["    <View style={styles.caixa}>"],
            ["      <Text style={styles.titulo}>{titulo}</Text>"],
            ["      <Text>R$ {preco}</Text>"],
            [
              "      <TouchableOpacity ",
              t("onPress={onComprar}", "Quando o botão é tocado, o Cartao simplesmente chama a função que recebeu de fora."),
              ">",
            ],
            ["        <Text style={styles.botaoTexto}>Comprar</Text>"],
            ["      </TouchableOpacity>"],
            ["    </View>"],
            ["  )"],
            ["}"],
          ]}
        />
        <p>E do lado de quem usa, define o que essa função faz de fato:</p>
        <AnnotatedCode
          filename="App.tsx"
          lines={[
            [
              "<Cartao",
            ],
            ["  titulo=\"Tênis Runner\""],
            ["  preco={299}"],
            [
              "  ",
              t("onComprar={() => console.log('comprou o tênis!')}", "Quem usa o Cartao decide a ação de verdade — o componente filho não precisa saber o que acontece."),
            ],
            ["/>"],
          ]}
        />
        <Callout type="dica">
          Repare no tipo <code>() {"=>"} void</code>: significa "uma função que
          não recebe nada e não retorna nada". É a assinatura mais comum
          pra props do tipo <code>onAlgumaCoisa</code>.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">7</span>Referência rápida
        </h3>
        <PropsTable
          rows={[
            { name: "{ titulo, preco }", type: "desestruturação", desc: "Extrai as props direto no parâmetro — nada de props. na frente" },
            { name: "interface XProps { ... }", type: "tipagem", desc: "Define o contrato: quais props existem e de que tipo é cada uma" },
            { name: "campo?: tipo", type: "prop opcional", desc: "O ? torna a prop opcional para quem usa o componente" },
            { name: "{ campo = valor }", type: "valor padrão", desc: "Usado quando a prop opcional não é passada" },
            { name: "campo: () => void", type: "prop função", desc: "Callback — o filho chama, o pai decide o que acontece" },
          ]}
        />
      </div>

      <div className="section">
        <h3>
          <span className="num">8</span>Prática
        </h3>
        <Callout type="pratica">
          Volte no <code>components/CartaoPerfil.tsx</code> (Aulas 2 e 3) e
          transforme ele num componente com props: crie uma{" "}
          <code>CartaoPerfilProps</code> com <code>nome: string</code>,{" "}
          <code>bio: string</code>, <code>fotoUrl: string</code> e{" "}
          <code>onSeguir: () =&gt; void</code>. Depois, no{" "}
          <code>App.tsx</code>, use o <code>ScrollView</code> da Aula 2
          pra renderizar 3 ou 4 <code>CartaoPerfil</code> diferentes, cada
          um com nome, bio e foto próprios.
        </Callout>
      </div>

      <div className="aula-footer-nav">
        <button className="nav-btn" onClick={() => goTo("aula3")}>
          <span className="nb-label">← Anterior</span>
          Aula 3 · Estilização e Flexbox
        </button>
        <button className="nav-btn right" onClick={() => goTo("home")}>
          <span className="nb-label">Fim do Bloco 1</span>
          Voltar ao início
        </button>
      </div>
    </div>
  );
}
