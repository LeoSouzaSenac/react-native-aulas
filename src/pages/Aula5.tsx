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

export default function Aula5({ goTo }: PageProps) {
  return (
    <div className="page">
      <span className="eyebrow">Bloco 1 · Aula 5</span>
      <h2 className="title">Estado: fazendo o componente lembrar das coisas</h2>
      <p className="lede">
        Props resolvem "de fora pra dentro". Mas e quando a informação
        nasce <em>dentro</em> do próprio componente — um contador que
        aumenta a cada toque, um texto que o usuário está digitando? Pra
        isso existe o estado, e a porta de entrada pra ele é o primeiro
        hook que vocês vão usar: o <code>useState</code>.
      </p>

      <div className="section">
        <h3>
          <span className="num">1</span>O que é um hook, afinal
        </h3>
        <p>
          <Term note="Função especial do React que só pode ser chamada dentro de um componente (ou de outro hook), e sempre começa com o prefixo 'use'.">
            Hook
          </Term>{" "}
          é o nome que o React dá pra um grupo de funções especiais que
          "conectam" o seu componente a recursos do próprio React — guardar
          informação, reagir a mudanças, acessar coisas do sistema. Todo
          hook começa com <code>use</code>: <code>useState</code>,{" "}
          <code>useEffect</code>, <code>useRef</code>, e por aí vai. Vocês
          já usaram hooks em React na web — no React Native é exatamente a
          mesma API, sem nenhuma diferença.
        </p>
        <p>Duas regras que valem pra qualquer hook, sem exceção:</p>
        <ul style={{ color: "var(--text-dim)", lineHeight: 1.7 }}>
          <li>
            só chame hooks <strong>no topo</strong> do componente — nunca
            dentro de um <code>if</code>, de um <code>for</code>, ou dentro
            de uma função aninhada;
          </li>
          <li>
            só chame hooks dentro de <strong>componentes</strong> (ou de
            outros hooks) — nunca dentro de uma função comum qualquer.
          </li>
        </ul>
        <Callout type="dica">
          Se o VS Code sublinhar um hook com erro reclamando de "ordem dos
          hooks" ou "hook condicional", é quase sempre uma dessas duas
          regras sendo quebrada. Suba o hook pro topo do componente.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">2</span>
          <code>useState</code> — a peça central
        </h3>
        <p>
          <code>useState</code> dá ao componente uma "caixinha" de memória
          que sobrevive entre as renderizações. Ele devolve sempre um par
          de coisas: o <strong>valor atual</strong> e uma{" "}
          <strong>função pra atualizar esse valor</strong>. A convenção é
          desestruturar os dois de uma vez, num array:
        </p>
        <AnnotatedCode
          filename="trecho"
          lines={[
            [
              "const [",
              t("contador", "O valor atual do estado — só de ler essa variável, o componente já usa o dado mais recente."),
              ", ",
              t("setContador", "Função que atualiza o estado. Por convenção, sempre 'set' + o nome da variável.", ),
              "] = ",
              t("useState", "O hook em si — importado de 'react'."),
              "<",
              t("number", "Tipo genérico do TypeScript: diz qual é o tipo do valor guardado."),
              ">(",
              t("0", "Valor inicial — usado só na primeira renderização do componente."),
              ")",
            ],
          ]}
        />
        <Callout type="atencao">
          Nunca mude o estado direto (<code>contador = 5</code>) — isso não
          avisa o React que algo mudou, e a tela não atualiza. Sempre use a
          função <code>set</code> (<code>setContador(5)</code>). É essa
          chamada que faz o componente renderizar de novo com o valor
          novo.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">3</span>Exemplo completo: um contador
        </h3>
        <div className="two-col">
          <div>
            <p>
              O clássico dos clássicos — mas ótimo pra ver o ciclo
              completo: estado guarda o número, os botões chamam{" "}
              <code>setContador</code>, o <code>Text</code> sempre mostra o
              valor mais atual.
            </p>
            <AnnotatedCode
              filename="components/Contador.tsx"
              lines={[
                ["import { useState } from 'react'"],
                ["import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'"],
                [""],
                ["const Contador = () => {"],
                [
                  "  const [contador, setContador] = ",
                  t("useState<number>(0)", "Estado numérico, começando em zero."),
                ],
                [""],
                ["  return ("],
                ["    <View style={styles.linha}>"],
                ["      <TouchableOpacity"],
                ["        style={styles.botao}"],
                [
                  "        ",
                  t("onPress={() => setContador(contador - 1)}", "Toda vez que tocar, calcula o novo valor a partir do valor atual e manda pro setContador."),
                ],
                ["      >"],
                ["        <Text style={styles.botaoTexto}>-</Text>"],
                ["      </TouchableOpacity>"],
                [""],
                ["      <Text style={styles.numero}>{contador}</Text>"],
                [""],
                ["      <TouchableOpacity"],
                ["        style={styles.botao}"],
                ["        onPress={() => setContador(contador + 1)}"],
                ["      >"],
                ["        <Text style={styles.botaoTexto}>+</Text>"],
                ["      </TouchableOpacity>"],
                ["    </View>"],
                ["  )"],
                ["}"],
                [""],
                ["export default Contador"],
                [""],
                ["const styles = StyleSheet.create({"],
                ["  linha: {"],
                ["    flexDirection: 'row',"],
                ["    alignItems: 'center',"],
                ["    gap: 18,"],
                ["  },"],
                ["  botao: {"],
                ["    width: 40,"],
                ["    height: 40,"],
                ["    borderRadius: 20,"],
                ["    backgroundColor: '#4ade9e',"],
                ["    alignItems: 'center',"],
                ["    justifyContent: 'center',"],
                ["  },"],
                ["  botaoTexto: { fontSize: 20, fontWeight: 'bold' },"],
                ["  numero: { fontSize: 24, fontWeight: 'bold', minWidth: 36, textAlign: 'center' },"],
                ["})"],
              ]}
            />
          </div>
          <DeviceFrame caption="Contador em ação">
            <div style={{ display: "flex", alignItems: "center", gap: 18, justifyContent: "center", height: "100%" }}>
              <div style={{ width: 40, height: 40, borderRadius: 20, background: "#4ade9e", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18 }}>
                −
              </div>
              <span style={{ fontSize: 24, fontWeight: 700, minWidth: 24, textAlign: "center" }}>3</span>
              <div style={{ width: 40, height: 40, borderRadius: 20, background: "#4ade9e", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18 }}>
                +
              </div>
            </div>
          </DeviceFrame>
        </div>
      </div>

      <div className="section">
        <h3>
          <span className="num">4</span>Exemplo completo: guardando o que foi digitado
        </h3>
        <div className="two-col">
          <div>
            <p>
              Pra capturar texto digitado, usamos o componente{" "}
              <code>TextInput</code> junto com estado — isso se chama um{" "}
              <Term note="Um input cujo valor exibido é controlado pelo estado do React, e não pelo próprio campo. Toda letra digitada passa pelo estado antes de aparecer na tela.">
                input controlado
              </Term>
              : o valor mostrado no campo vem do estado, e cada letra
              digitada atualiza esse estado de novo.
            </p>
            <AnnotatedCode
              filename="components/CampoNome.tsx"
              lines={[
                ["import { useState } from 'react'"],
                ["import { View, Text, TextInput, StyleSheet } from 'react-native'"],
                [""],
                ["const CampoNome = () => {"],
                [
                  "  const [nome, setNome] = ",
                  t("useState<string>('')", "Estado de texto, começando vazio."),
                ],
                [""],
                ["  return ("],
                ["    <View style={styles.container}>"],
                ["      <TextInput"],
                ["        style={styles.input}"],
                [
                  "        ",
                  t("value", "O que o campo exibe — sempre lido do estado, nunca de dentro do próprio TextInput."),
                  "={nome}",
                ],
                [
                  "        ",
                  t("onChangeText", "Disparada a cada letra digitada — recebe o texto novo já pronto, sem precisar ler evento.target.value como na web."),
                  "={setNome}",
                ],
                [
                  "        ",
                  t("placeholder", "Texto de dica exibido quando o campo está vazio."),
                  '="Digite seu nome"',
                ],
                ["      />"],
                ["      <Text>Você digitou: {nome}</Text>"],
                ["    </View>"],
                ["  )"],
                ["}"],
                [""],
                ["export default CampoNome"],
                [""],
                ["const styles = StyleSheet.create({"],
                ["  container: { gap: 10 },"],
                ["  input: {"],
                ["    borderWidth: 1,"],
                ["    borderColor: '#ccc',"],
                ["    borderRadius: 8,"],
                ["    padding: 10,"],
                ["  },"],
                ["})"],
              ]}
            />
            <PropsTable
              rows={[
                { name: "value", type: "string", desc: "Valor exibido — vem do estado" },
                { name: "onChangeText", type: "(texto: string) => void", desc: "Chamada a cada mudança, já recebe o texto novo pronto" },
                { name: "placeholder", type: "string", desc: "Texto de dica quando o campo está vazio" },
                { name: "secureTextEntry", type: "boolean", desc: "Esconde o texto digitado — usado em campos de senha" },
                { name: "keyboardType", type: "string", desc: '"default" | "numeric" | "email-address" | "phone-pad" — troca o teclado exibido' },
                { name: "multiline", type: "boolean", desc: "Permite múltiplas linhas, como um textarea" },
              ]}
            />
            <Callout type="dica">
              Repare que <code>onChangeText={"{setNome}"}</code> passa a
              função direto, sem escrever{" "}
              <code>{"(texto) => setNome(texto)"}</code> — como as
              assinaturas batem (uma função que recebe uma string), dá pra
              simplificar assim.
            </Callout>
          </div>
          <DeviceFrame caption="Input controlado refletindo no Text abaixo">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10, fontSize: 13 }}>
                Maria
              </div>
              <span style={{ fontSize: 13 }}>Você digitou: Maria</span>
            </div>
          </DeviceFrame>
        </div>
      </div>

      <div className="section">
        <h3>
          <span className="num">5</span>Renderizando várias coisas: <code>FlatList</code>
        </h3>
        <p>
          Na Aula 2 usamos <code>ScrollView</code> com componentes escritos
          um por um, à mão. Isso funciona pra pouca coisa fixa, mas quebra
          na primeira lista que vem de dados (um array de produtos vindo
          de uma API, por exemplo). Dá pra resolver isso repetindo
          componentes com <code>.map()</code>, só que no React Native
          existe um componente feito exatamente pra isso, e que já nasce
          otimizado: o <code>FlatList</code>.
        </p>
        <Callout type="dica">
          Diferença que importa: um <code>ScrollView</code> com{" "}
          <code>.map()</code> renderiza <strong>todos</strong> os itens de
          uma vez, mesmo os que estão fora da tela. O{" "}
          <code>FlatList</code> renderiza só o que está visível (mais uma
          margem pequena) e vai criando o resto conforme você rola —
          isso se chama{" "}
          <Term note="Técnica de só criar/manter na memória os componentes que estão realmente visíveis na tela, descartando o resto — essencial pra listas longas não travarem o app.">
            virtualização
          </Term>
          . Pra listas com muitos itens, use sempre <code>FlatList</code>{" "}
          em vez de <code>ScrollView</code> + <code>.map()</code>.
        </Callout>
        <div className="two-col">
          <div>
            <AnnotatedCode
              filename="components/ListaProdutos.tsx"
              lines={[
                ["import { ", t("FlatList", "Lista otimizada — renderiza só os itens visíveis na tela."), ", ", t("Text", "Texto de cada item."), ", ", t("View", "Container de cada item."), ", ", t("StyleSheet", "Cria estilos."), " } from 'react-native'"],
                [""],
                [
                  "interface ",
                  t("Produto", "Formato de cada item da lista de dados."),
                  " {",
                ],
                ["  id: string;"],
                ["  titulo: string;"],
                ["  preco: number;"],
                ["}"],
                [""],
                [
                  "const produtos: Produto[] = [",
                ],
                ["  { id: '1', titulo: 'Tênis Runner', preco: 299 },"],
                ["  { id: '2', titulo: 'Mochila Trail', preco: 189 },"],
                ["  { id: '3', titulo: 'Garrafa Térmica', preco: 79 },"],
                ["]"],
                [""],
                ["const ListaProdutos = () => {"],
                ["  return ("],
                ["    <FlatList"],
                [
                  "      ",
                  t("data", "O array de dados que vai virar a lista — cada posição vira um item na tela."),
                  "={produtos}",
                ],
                [
                  "      ",
                  t("keyExtractor", "Diz ao FlatList como pegar uma chave única de cada item — essencial pra performance, igual ao key do .map() na web.", ),
                  "={(item) => item.id}",
                ],
                [
                  "      ",
                  t("renderItem", "Função chamada pra cada item — recebe { item } e retorna o JSX daquela linha.", ),
                  "={({ item }) => ("
                ],
                ["        <View style={styles.linha}>"],
                ["          <Text style={styles.titulo}>{item.titulo}</Text>"],
                ["          <Text>R$ {item.preco}</Text>"],
                ["        </View>"],
                ["      )}"],
                ["    />"],
                ["  )"],
                ["}"],
                [""],
                ["export default ListaProdutos"],
                [""],
                ["const styles = StyleSheet.create({"],
                ["  linha: {"],
                ["    padding: 14,"],
                ["    borderBottomWidth: 1,"],
                ["    borderBottomColor: '#eee',"],
                ["  },"],
                ["  titulo: { fontWeight: 'bold' },"],
                ["})"],
              ]}
            />
            <PropsTable
              rows={[
                { name: "data", type: "T[]", desc: "Array com os dados — um item vira uma linha renderizada" },
                { name: "renderItem", type: "({item}) => JSX", desc: "Como desenhar cada item — recebe o item e devolve o componente da linha" },
                { name: "keyExtractor", type: "(item) => string", desc: "Chave única de cada item, pro React saber identificar cada linha" },
                { name: "horizontal", type: "boolean", desc: "Rola na horizontal em vez de vertical" },
                { name: "ListEmptyComponent", type: "componente", desc: "O que mostrar quando data está vazio" },
                { name: "contentContainerStyle", type: "objeto", desc: "Estilo do conteúdo interno, igual ao do ScrollView" },
              ]}
            />
          </div>
          <DeviceFrame caption="FlatList renderizando 3 produtos">
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                { titulo: "Tênis Runner", preco: 299 },
                { titulo: "Mochila Trail", preco: 189 },
                { titulo: "Garrafa Térmica", preco: 79 },
              ].map((p) => (
                <div key={p.titulo} style={{ padding: 14, borderBottom: "1px solid #eee" }}>
                  <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 13 }}>{p.titulo}</p>
                  <span style={{ fontSize: 12.5 }}>R$ {p.preco}</span>
                </div>
              ))}
            </div>
          </DeviceFrame>
        </div>
        <p>
          Repare como o <code>ListaProdutos</code> combina tudo que vimos
          até aqui: uma <code>interface</code> tipando o formato do dado
          (Aula 4), e agora o <code>FlatList</code> lendo esse array e
          gerando um <code>Cartao</code> — ou qualquer componente com
          props — pra cada posição.
        </p>
        <Callout type="pratica">
          Troque o <code>&lt;View style={"{styles.linha}"}&gt;...&lt;/View&gt;</code>{" "}
          de dentro do <code>renderItem</code> pelo <code>Cartao</code> que
          vocês criaram na Aula 4, passando <code>titulo</code> e{" "}
          <code>preco</code> a partir do <code>item</code>. No fim, a
          lista inteira de produtos deve aparecer usando o componente que
          já existe, sem repetir <code>&lt;Cartao /&gt;</code> na mão.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">6</span>Prática final da aula
        </h3>
        <Callout type="pratica">
          Crie um componente <code>components/Busca.tsx</code> com{" "}
          <code>rnfes</code>: um <code>TextInput</code> controlado por
          estado (<code>termo</code>), e logo abaixo um <code>FlatList</code>{" "}
          exibindo apenas os produtos cujo <code>titulo</code> contenha o
          texto digitado (dica: filtre o array com{" "}
          <code>.filter()</code> antes de passar pro <code>data</code> do
          FlatList).
        </Callout>
      </div>

      <DocsBox
        links={[
          { label: "useState", desc: "react.dev — referência oficial completa do hook", url: "https://react.dev/reference/react/useState" },
          { label: "Hooks (visão geral)", desc: "react.dev — todos os hooks embutidos do React", url: "https://react.dev/reference/react/hooks" },
          { label: "TextInput", desc: "reactnative.dev — todas as props de campos de texto", url: "https://reactnative.dev/docs/textinput" },
          { label: "FlatList", desc: "reactnative.dev — referência completa, incluindo performance", url: "https://reactnative.dev/docs/flatlist" },
          { label: "Rendering Lists", desc: "react.dev — o porquê da keyExtractor/key explicado a fundo", url: "https://react.dev/learn/rendering-lists" },
        ]}
      />

      <div className="aula-footer-nav">
        <button className="nav-btn" onClick={() => goTo("aula4")}>
          <span className="nb-label">← Anterior</span>
          Aula 4 · Props
        </button>
        <button className="nav-btn right" onClick={() => goTo("aula6")}>
          <span className="nb-label">Próxima →</span>
          Aula 6 · useEffect
        </button>
      </div>
    </div>
  );
}
