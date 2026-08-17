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

export default function Aula6({ goTo }: PageProps) {
  return (
    <div className="page">
      <span className="eyebrow">Bloco 1 · Aula 6</span>
      <h2 className="title">useEffect: fazendo o componente reagir ao mundo</h2>
      <p className="lede">
        <code>useState</code> guarda informação. Mas e quando o componente
        precisa <em>fazer alguma coisa</em> por conta própria — buscar dados
        de uma API assim que a tela abre, iniciar um timer, reagir quando
        um valor muda? É exatamente pra isso que existe o segundo hook
        mais usado do React: o <code>useEffect</code>.
      </p>

      <div className="section">
        <h3>
          <span className="num">1</span>O que é um efeito colateral
        </h3>
        <p>
          Renderizar um componente deveria ser algo "puro": recebe props e
          estado, devolve JSX, ponto final. Só que quase todo app real
          precisa fazer coisas que não cabem nesse fluxo — buscar dados de
          uma API, ler ou escrever em armazenamento local, se inscrever em
          um evento, disparar um timer. Isso tudo se chama{" "}
          <Term note="Qualquer coisa que um componente faz além de simplesmente calcular o que desenhar na tela — conversar com o mundo de fora dele.">
            efeito colateral (side effect)
          </Term>
          , e o React exige que esse tipo de código fique isolado dentro
          de um <code>useEffect</code>, separado da lógica de
          renderização.
        </p>
        <Callout type="dica">
          Regra prática: se a pergunta é "o que eu desenho na tela?", é
          direto no corpo do componente. Se a pergunta é "o que eu preciso{" "}
          <em>fazer</em> quando a tela aparecer, ou quando algo mudar?", é{" "}
          <code>useEffect</code>.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">2</span>Sintaxe: função + array de dependências
        </h3>
        <p>
          <code>useEffect</code> recebe dois argumentos: uma função com o
          que deve rodar, e um array dizendo <strong>quando</strong> rodar
          de novo. Esse segundo argumento muda completamente o
          comportamento — são três casos bem diferentes:
        </p>
        <AnnotatedCode
          filename="trecho"
          lines={[
            [
              t("useEffect", "O hook — importado de 'react', junto com useState."),
              "(() => {"
            ],
            ["  // roda aqui dentro"],
            [
              "}, ",
              t("[]", "Array vazio: o efeito roda uma única vez, logo depois da primeira renderização — nunca mais.", [
                { value: "sem array nenhum", desc: "roda depois de TODA renderização — raro precisar disso" },
                { value: "[]", desc: "roda só uma vez, ao montar o componente" },
                { value: "[algumaCoisa]", desc: "roda ao montar, e de novo toda vez que algumaCoisa mudar" },
              ]),
              ")",
            ],
          ]}
        />
        <PropsTable
          rows={[
            { name: "sem array", type: "—", desc: "Roda depois de toda e qualquer renderização (raro ser o que você quer)" },
            { name: "[]", type: "array vazio", desc: 'Roda uma vez só, quando o componente "monta" na tela' },
            { name: "[variavel]", type: "array com valores", desc: "Roda ao montar, e de novo sempre que qualquer valor listado mudar" },
          ]}
        />
        <Callout type="atencao">
          O array de dependências deve listar <strong>toda</strong>{" "}
          variável de fora do efeito que é usada lá dentro (props, estado).
          O próprio VS Code costuma avisar quando falta alguma — vale
          confiar no aviso.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">3</span>Exemplo completo: buscando dados de uma API
        </h3>
        <div className="two-col">
          <div>
            <p>
              O caso de uso mais comum: assim que a tela abre, buscar uma
              lista vinda de um servidor. O array vazio garante que a
              busca acontece <strong>uma vez só</strong>, não a cada
              renderização.
            </p>
            <AnnotatedCode
              filename="components/ListaProdutos.tsx"
              lines={[
                ["import { useState, useEffect } from 'react'"],
                ["import { FlatList, Text, View, ", t("ActivityIndicator", "Componente pronto do React Native — mostra um spinner de carregamento nativo."), ", StyleSheet } from 'react-native'"],
                [""],
                ["interface Produto {"],
                ["  id: number;"],
                ["  title: string;"],
                ["}"],
                [""],
                ["const ListaProdutos = () => {"],
                ["  const [produtos, setProdutos] = useState<Produto[]>([])"],
                [
                  "  const [carregando, setCarregando] = useState<boolean>(",
                  t("true", "Começa true — assumimos que, ao abrir a tela, os dados ainda não chegaram."),
                  ")",
                ],
                [""],
                [
                  "  ",
                  t("useEffect", "Roda o código de busca."),
                  "(() => {",
                ],
                [
                  "    ",
                  t("fetch", "Função nativa do JavaScript pra fazer requisições HTTP — funciona igual na web e no React Native."),
                  "('https://fakestoreapi.com/products')",
                ],
                ["      .then((resposta) => resposta.json())"],
                ["      .then((dados) => {"],
                ["        setProdutos(dados)"],
                ["        setCarregando(false)"],
                ["      })"],
                [
                  "  }, ",
                  t("[]", "Array vazio: busca só quando o componente aparece na tela pela primeira vez."),
                  ")",
                ],
                [""],
                ["  if (carregando) {"],
                ["    return <ActivityIndicator size=\"large\" />"],
                ["  }"],
                [""],
                ["  return ("],
                ["    <FlatList"],
                ["      data={produtos}"],
                ["      keyExtractor={(item) => String(item.id)}"],
                ["      renderItem={({ item }) => ("],
                ["        <View style={styles.linha}>"],
                ["          <Text>{item.title}</Text>"],
                ["        </View>"],
                ["      )}"],
                ["    />"],
                ["  )"],
                ["}"],
                [""],
                ["export default ListaProdutos"],
                [""],
                ["const styles = StyleSheet.create({"],
                ["  linha: { padding: 14, borderBottomWidth: 1, borderBottomColor: '#eee' },"],
                ["})"],
              ]}
            />
          </div>
          <DeviceFrame caption="ActivityIndicator enquanto carrega, depois a FlatList">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  border: "3px solid #e4e0f5",
                  borderTopColor: "#4ade9e",
                }}
              />
            </div>
          </DeviceFrame>
        </div>
        <Callout type="dica">
          Repare que o efeito nunca é <code>async</code> diretamente
          (<code>useEffect(async () =&gt; ...)</code> dá erro) — por isso
          usamos <code>.then()</code> encadeado em vez de{" "}
          <code>await</code> direto ali dentro. Se quiser usar{" "}
          <code>async/await</code>, o jeito é criar uma função separada
          dentro do efeito e chamá-la na sequência.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">4</span>Reagindo a mudanças: array com dependência
        </h3>
        <div className="two-col">
          <div>
            <p>
              Quando o array tem alguma variável dentro, o efeito roda de
              novo toda vez que ela mudar — perfeito pra reagir a uma
              busca sendo digitada, sem precisar chamar nada manualmente
              no <code>onChangeText</code>.
            </p>
            <AnnotatedCode
              filename="components/Busca.tsx"
              lines={[
                ["import { useState, useEffect } from 'react'"],
                ["import { View, TextInput, Text, StyleSheet } from 'react-native'"],
                [""],
                ["const Busca = () => {"],
                ["  const [termo, setTermo] = useState<string>('')"],
                [""],
                ["  useEffect(() => {"],
                ["    if (termo.length === 0) return"],
                [
                  "    console.log('Buscando por:', termo)",
                ],
                ["    // aqui entraria uma chamada de API, por exemplo"],
                [
                  "  }, ",
                  t("[termo]", "Sempre que 'termo' mudar (a cada letra digitada), o efeito roda de novo."),
                  ")",
                ],
                [""],
                ["  return ("],
                ["    <View>"],
                ["      <TextInput"],
                ["        style={styles.input}"],
                ["        value={termo}"],
                ["        onChangeText={setTermo}"],
                ["        placeholder=\"Buscar produto...\""],
                ["      />"],
                ["    </View>"],
                ["  )"],
                ["}"],
                [""],
                ["export default Busca"],
                [""],
                ["const styles = StyleSheet.create({"],
                ["  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },"],
                ["})"],
              ]}
            />
          </div>
          <DeviceFrame caption="Cada letra digitada dispara o efeito de novo">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10, fontSize: 13 }}>
                tên
              </div>
              <span style={{ fontSize: 11.5, color: "#7d729c", fontFamily: "var(--font-mono)" }}>
                console: Buscando por: tên
              </span>
            </div>
          </DeviceFrame>
        </div>
      </div>

      <div className="section">
        <h3>
          <span className="num">5</span>Função de limpeza (cleanup)
        </h3>
        <div className="two-col">
          <div>
            <p>
              Alguns efeitos criam algo que precisa ser desfeito depois —
              um <code>setInterval</code>, uma inscrição em evento. Pra
              isso, o efeito pode <code>return</code> uma função: o React
              chama ela automaticamente antes de rodar o efeito de novo, e
              também quando o componente sai de tela.
            </p>
            <AnnotatedCode
              filename="components/Relogio.tsx"
              lines={[
                ["import { useState, useEffect } from 'react'"],
                ["import { Text } from 'react-native'"],
                [""],
                ["const Relogio = () => {"],
                ["  const [hora, setHora] = useState<Date>(new Date())"],
                [""],
                ["  useEffect(() => {"],
                [
                  "    const intervalo = ",
                  t("setInterval", "Função nativa do JavaScript — repete uma ação a cada X milissegundos."),
                  "(() => {",
                ],
                ["      setHora(new Date())"],
                ["    }, 1000)"],
                [""],
                [
                  "    ",
                  t("return () => clearInterval(intervalo)", "Função de limpeza: cancela o timer quando o componente sai de tela, evitando vazamento de memória."),
                ],
                ["  }, [])"],
                [""],
                ["  return <Text>{hora.toLocaleTimeString()}</Text>"],
                ["}"],
                [""],
                ["export default Relogio"],
              ]}
            />
            <Callout type="atencao">
              Esquecer o <code>clearInterval</code> na limpeza é um erro
              comum: o timer continua rodando escondido mesmo depois da
              tela sumir, gastando bateria e processamento à toa.
            </Callout>
          </div>
          <DeviceFrame caption="Hora atualizando a cada segundo">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
              <span style={{ fontSize: 26, fontWeight: 700, fontFamily: "var(--font-mono)" }}>
                14:32:07
              </span>
            </div>
          </DeviceFrame>
        </div>
      </div>

      <div className="section">
        <h3>
          <span className="num">6</span>Referência rápida
        </h3>
        <PropsTable
          rows={[
            { name: "useEffect(fn, [])", type: "ao montar", desc: "Roda a função uma vez, quando o componente aparece na tela" },
            { name: "useEffect(fn, [x])", type: "reagindo", desc: "Roda de novo toda vez que x mudar" },
            { name: "useEffect(fn)", type: "toda renderização", desc: "Sem array — roda depois de cada render (raro precisar)" },
            { name: "return () => {...}", type: "cleanup", desc: "Desfaz o que o efeito criou (timers, inscrições) antes de rodar de novo ou desmontar" },
          ]}
        />
      </div>

      <div className="section">
        <h3>
          <span className="num">7</span>Prática
        </h3>
        <Callout type="pratica">
          Pegue o <code>components/Busca.tsx</code> da Aula 5 e adicione um{" "}
          <code>useEffect</code> com <code>[termo]</code> como
          dependência: sempre que <code>termo</code> mudar, use{" "}
          <code>console.log</code> pra mostrar quantos produtos bateram
          com a busca. Depois, crie um <code>components/Relogio.tsx</code>{" "}
          do zero, do jeito visto nesta aula, e coloque ele no topo do seu{" "}
          <code>App.tsx</code>.
        </Callout>
      </div>

      <DocsBox
        links={[
          { label: "useEffect", desc: "react.dev — referência oficial completa do hook", url: "https://react.dev/reference/react/useEffect" },
          { label: "Synchronizing with Effects", desc: "react.dev — guia conceitual de quando (e quando não) usar efeitos", url: "https://react.dev/learn/synchronizing-with-effects" },
          { label: "You Might Not Need an Effect", desc: "react.dev — casos clássicos onde useEffect é usado à toa", url: "https://react.dev/learn/you-might-not-need-an-effect" },
          { label: "ActivityIndicator", desc: "reactnative.dev — o spinner de carregamento nativo", url: "https://reactnative.dev/docs/activityindicator" },
        ]}
      />

      <div className="aula-footer-nav">
        <button className="nav-btn" onClick={() => goTo("aula5")}>
          <span className="nb-label">← Anterior</span>
          Aula 5 · Estado com useState
        </button>
        <button className="nav-btn right" onClick={() => goTo("aula7")}>
          <span className="nb-label">Próxima →</span>
          Aula 7 · POST, PUT e DELETE
        </button>
      </div>
    </div>
  );
}
