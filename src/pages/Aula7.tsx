import AnnotatedCode from "../components/AnnotatedCode";
import Callout from "../components/Callout";
import PropsTable from "../components/PropsTable";
import DeviceFrame from "../components/DeviceFrame";
import DocsBox from "../components/DocsBox";
import { t } from "../utils/ann";

interface PageProps {
  goTo: (id: string) => void;
}

export default function Aula7({ goTo }: PageProps) {
  return (
    <div className="page">
      <span className="eyebrow">Bloco 1 · Aula 7</span>
      <h2 className="title">Além do GET: criando, atualizando e apagando dados</h2>
      <p className="lede">
        Na Aula 6 buscamos dados prontos de uma API. Hoje o app deixa de
        só <em>ler</em> e passa a <em>escrever</em>: criar um produto
        novo, editar um que já existe, apagar um da lista — os três
        verbos que faltavam pra fechar o CRUD completo.
      </p>

      <div className="section">
        <h3>
          <span className="num">1</span>Uma diferença importante de fluxo
        </h3>
        <p>
          O <code>GET</code> da Aula 6 rodava dentro de um{" "}
          <code>useEffect</code>, porque acontecia sozinho, assim que a
          tela abria. <code>POST</code>, <code>PUT</code> e{" "}
          <code>DELETE</code> são diferentes: eles quase sempre acontecem
          por causa de uma <strong>ação do usuário</strong> — tocar em
          "Salvar", tocar em "Excluir". Por isso, em vez de morar dentro
          de um efeito, essas chamadas moram dentro de uma função normal,
          chamada pelo <code>onPress</code> de um botão.
        </p>
        <Callout type="dica">
          Bom momento pra usar <code>async/await</code> de verdade: como
          não estamos mais presos dentro de um <code>useEffect</code> (que
          não aceita ser <code>async</code> direto), a função do{" "}
          <code>onPress</code> pode ser <code>async</code> sem problema
          nenhum.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">2</span>Anatomia de um <code>fetch</code> que envia dados
        </h3>
        <p>
          Pra um <code>GET</code>, bastava a URL. Pra enviar dados,{" "}
          <code>fetch</code> recebe um segundo argumento: um objeto de
          configuração com o método, os cabeçalhos e o corpo da
          requisição.
        </p>
        <AnnotatedCode
          filename="trecho"
          lines={[
            ["await fetch('https://api.exemplo.com/produtos', {"],
            [
              "  ",
              t("method", "Qual operação HTTP executar.", [
                { value: "'GET'", desc: "buscar dados (padrão, nem precisa escrever)" },
                { value: "'POST'", desc: "criar um novo registro" },
                { value: "'PUT'", desc: "atualizar um registro existente por completo" },
                { value: "'DELETE'", desc: "remover um registro" },
              ]),
              ": 'POST',",
            ],
            [
              "  ",
              t("headers", "Metadados da requisição — aqui, avisando o servidor que o corpo enviado é JSON."),
              ": { 'Content-Type': 'application/json' },",
            ],
            [
              "  ",
              t("body", "O dado enviado de fato. Precisa ser texto — por isso o JSON.stringify.", ),
              ": JSON.stringify({ titulo: 'Tênis Runner', preco: 299 }),",
            ],
            ["})"],
          ]}
        />
        <Callout type="atencao">
          <code>body</code> sempre precisa ser um <strong>texto</strong>,
          nunca um objeto JavaScript direto — por isso o{" "}
          <code>JSON.stringify(...)</code> envolvendo os dados. Esquecer
          isso é o erro mais comum ao começar com POST.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">3</span>Exemplo completo: criando um produto (POST)
        </h3>
        <div className="two-col">
          <div>
            <p>
              Um formulário simples: dois campos controlados por estado
              (Aula 5), e um botão que dispara a criação de verdade.
              Usamos o <code>jsonplaceholder</code>, uma API pública feita
              exatamente pra prática — ela aceita as requisições e
              devolve uma resposta de mentirinha, sem salvar nada de
              verdade.
            </p>
            <AnnotatedCode
              filename="components/NovoProduto.tsx"
              lines={[
                ["import { useState } from 'react'"],
                ["import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native'"],
                [""],
                ["const NovoProduto = () => {"],
                ["  const [titulo, setTitulo] = useState<string>('')"],
                ["  const [enviando, setEnviando] = useState<boolean>(false)"],
                [""],
                [
                  "  const ",
                  t("criarProduto", "Função async — só chamada quando o botão é tocado, não sozinha."),
                  " = async () => {",
                ],
                ["    setEnviando(true)"],
                ["    try {"],
                ["      const resposta = await fetch('https://jsonplaceholder.typicode.com/posts', {"],
                ["        method: 'POST',"],
                ["        headers: { 'Content-Type': 'application/json' },"],
                ["        body: JSON.stringify({ title: titulo }),"],
                ["      })"],
                ["      const criado = await resposta.json()"],
                ["      console.log('Criado com id:', criado.id)"],
                ["      setTitulo('')"],
                ["    } catch (erro) {"],
                ["      console.log('Deu ruim ao criar:', erro)"],
                ["    } finally {"],
                [
                  "      ",
                  t("setEnviando(false)", "O finally roda sempre, deu certo ou não — garante que o botão nunca fica travado em 'enviando'."),
                ],
                ["    }"],
                ["  }"],
                [""],
                ["  return ("],
                ["    <View style={styles.container}>"],
                ["      <TextInput"],
                ["        style={styles.input}"],
                ["        value={titulo}"],
                ["        onChangeText={setTitulo}"],
                ["        placeholder=\"Nome do produto\""],
                ["      />"],
                ["      <TouchableOpacity"],
                ["        style={styles.botao}"],
                ["        onPress={criarProduto}"],
                [
                  "        ",
                  t("disabled", "Impede toques repetidos enquanto a requisição ainda está em andamento."),
                  "={enviando}",
                ],
                ["      >"],
                ["        <Text style={styles.botaoTexto}>"],
                ["          {enviando ? 'Enviando...' : 'Criar produto'}"],
                ["        </Text>"],
                ["      </TouchableOpacity>"],
                ["    </View>"],
                ["  )"],
                ["}"],
                [""],
                ["export default NovoProduto"],
                [""],
                ["const styles = StyleSheet.create({"],
                ["  container: { gap: 10 },"],
                ["  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },"],
                ["  botao: { backgroundColor: '#4ade9e', padding: 12, borderRadius: 10, alignItems: 'center' },"],
                ["  botaoTexto: { fontWeight: 'bold' },"],
                ["})"],
              ]}
            />
          </div>
          <DeviceFrame caption="Formulário de criação, com estado de envio">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10, fontSize: 13 }}>
                Tênis Runner
              </div>
              <div style={{ background: "#4ade9e", padding: 12, borderRadius: 10, textAlign: "center", fontWeight: 700, fontSize: 13 }}>
                Enviando...
              </div>
            </div>
          </DeviceFrame>
        </div>
      </div>

      <div className="section">
        <h3>
          <span className="num">4</span>Exemplo completo: atualizando um produto (PUT)
        </h3>
        <p>
          <code>PUT</code> segue o mesmo esqueleto do <code>POST</code>,
          com duas diferenças: a URL aponta pro item específico (com o{" "}
          <code>id</code> no final), e o método muda.
        </p>
        <AnnotatedCode
          filename="components/EditarProduto.tsx"
          lines={[
            ["interface EditarProdutoProps {"],
            ["  id: number;"],
            ["  tituloAtual: string;"],
            ["}"],
            [""],
            ["const EditarProduto = ({ id, tituloAtual }: EditarProdutoProps) => {"],
            ["  const [titulo, setTitulo] = useState<string>(tituloAtual)"],
            [""],
            ["  const salvarEdicao = async () => {"],
            ["    try {"],
            [
              "      await fetch(",
              t("`https://jsonplaceholder.typicode.com/posts/${id}`", "Template string — o id do item entra direto na URL, apontando pro registro específico."),
              ", {",
            ],
            [
              "        ",
              t("method: 'PUT'", "Diz ao servidor que é uma atualização, não uma criação nova."),
              ",",
            ],
            ["        headers: { 'Content-Type': 'application/json' },"],
            ["        body: JSON.stringify({ title: titulo }),"],
            ["      })"],
            ["      console.log('Produto atualizado!')"],
            ["    } catch (erro) {"],
            ["      console.log('Erro ao atualizar:', erro)"],
            ["    }"],
            ["  }"],
            [""],
            ["  // ...TextInput + botão \"Salvar\" chamando salvarEdicao, igual ao POST"],
            ["}"],
          ]}
        />
        <Callout type="dica">
          Existe também o <code>PATCH</code>, um primo do <code>PUT</code>{" "}
          — a diferença é que <code>PUT</code> assume que você está
          reenviando o objeto inteiro, enquanto <code>PATCH</code> é pra
          mandar só os campos que mudaram. Pra essa fase do curso,{" "}
          <code>PUT</code> já resolve bem.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">5</span>Exemplo completo: removendo um produto (DELETE)
        </h3>
        <div className="two-col">
          <div>
            <p>
              <code>DELETE</code> não precisa de <code>body</code> — só a
              URL do item já basta. E o pulo do gato de UX: depois que o
              servidor confirma, atualizamos a lista{" "}
              <strong>local</strong> filtrando o item removido, em vez de
              buscar tudo de novo do servidor.
            </p>
            <AnnotatedCode
              filename="components/ListaProdutos.tsx"
              lines={[
                ["const removerProduto = async (id: number) => {"],
                ["  try {"],
                [
                  "    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {",
                ],
                ["      method: 'DELETE',"],
                ["    })"],
                [
                  "    ",
                  t("setProdutos", "Atualiza o estado local sem precisar rebuscar a lista inteira do servidor."),
                  "((atual) => atual.filter((p) => p.id !== id))",
                ],
                ["  } catch (erro) {"],
                ["    console.log('Erro ao remover:', erro)"],
                ["  }"],
                ["}"],
                [""],
                ["// dentro do renderItem do FlatList:"],
                ["<TouchableOpacity onPress={() => removerProduto(item.id)}>"],
                ["  <Text style={styles.remover}>Excluir</Text>"],
                ["</TouchableOpacity>"],
              ]}
            />
            <Callout type="atencao">
              <code>atual.filter((p) =&gt; p.id !== id)</code> só some com
              o item na tela do celular. Se o app fechar e abrir de novo
              sem refazer o <code>GET</code>, o item "volta" — porque o
              filtro só mudou o estado local, não o servidor de verdade
              (embora aqui, com o jsonplaceholder, o servidor nem chega a
              apagar nada mesmo).
            </Callout>
          </div>
          <DeviceFrame caption="Cada item com um botão de excluir">
            <div style={{ display: "flex", flexDirection: "column" }}>
              {["Tênis Runner", "Mochila Trail"].map((p) => (
                <div key={p} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, borderBottom: "1px solid #eee" }}>
                  <span style={{ fontSize: 13 }}>{p}</span>
                  <span style={{ fontSize: 12, color: "#ff6b6b", fontWeight: 700 }}>Excluir</span>
                </div>
              ))}
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
            { name: "GET", type: "leitura", desc: "Busca dados — sem body, geralmente dentro de useEffect" },
            { name: "POST", type: "criação", desc: "Cria um registro novo — precisa de body" },
            { name: "PUT", type: "atualização completa", desc: "Substitui o registro inteiro — precisa de body e do id na URL" },
            { name: "PATCH", type: "atualização parcial", desc: "Atualiza só alguns campos — menos comum no dia a dia do curso" },
            { name: "DELETE", type: "remoção", desc: "Remove o registro — geralmente sem body, só o id na URL" },
          ]}
        />
      </div>

      <div className="section">
        <h3>
          <span className="num">7</span>Prática
        </h3>
        <Callout type="pratica">
          No <code>components/ListaProdutos.tsx</code> das Aulas 6 e 7,
          junte tudo: o <code>GET</code> inicial (Aula 6) pra carregar a
          lista, o <code>NovoProduto</code> desta aula no topo da tela pra
          criar itens novos, e um botão de excluir em cada linha do{" "}
          <code>FlatList</code>. Bônus: ao criar um produto novo com
          sucesso, adicione ele direto no estado <code>produtos</code>{" "}
          (com <code>setProdutos</code>), sem precisar buscar a lista
          inteira de novo.
        </Callout>
      </div>

      <DocsBox
        links={[
          { label: "Using Fetch (MDN)", desc: "developer.mozilla.org — guia completo da Fetch API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" },
          { label: "Networking", desc: "reactnative.dev — fetch e networking no React Native", url: "https://reactnative.dev/docs/network" },
          { label: "JSON.stringify (MDN)", desc: "developer.mozilla.org — referência completa do método", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify" },
          { label: "JSONPlaceholder — Guide", desc: "jsonplaceholder.typicode.com — a API fake usada nos exemplos", url: "https://jsonplaceholder.typicode.com/guide/" },
        ]}
      />

      <div className="aula-footer-nav">
        <button className="nav-btn" onClick={() => goTo("aula6")}>
          <span className="nb-label">← Anterior</span>
          Aula 6 · useEffect
        </button>
        <button className="nav-btn right" onClick={() => goTo("home")}>
          <span className="nb-label">Fim do Bloco 1</span>
          Voltar ao início
        </button>
      </div>
    </div>
  );
}
