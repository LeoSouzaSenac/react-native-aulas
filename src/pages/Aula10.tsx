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

export default function Aula10({ goTo }: PageProps) {
  return (
    <div className="page">
      <span className="eyebrow">Bloco 2 · Aula 10</span>
      <h2 className="title">AsyncStorage: fazendo o app lembrar depois de fechado</h2>
      <p className="lede">
        Crie um projeto novo pra essa aula. Até agora, todo estado (
        <code>useState</code>) some assim que o app fecha. Hoje isso muda:
        vamos guardar informação de verdade no aparelho — uma foto
        escolhida, um nome digitado, uma lista de favoritos — pra ela
        continuar lá na próxima vez que o usuário abrir o app.
      </p>

      <div className="section">
        <h3>
          <span className="num">1</span>O que é o AsyncStorage
        </h3>
        <p>
          <Term note="Um sistema de armazenamento local, no formato chave → valor, que persiste entre uma abertura do app e outra — diferente do useState, que reseta toda vez que o app fecha.">
            AsyncStorage
          </Term>{" "}
          é uma gaveta simples dentro do próprio celular: você guarda um
          valor associado a uma chave (tipo um dicionário), e esse valor
          continua lá mesmo se o usuário fechar o app, desligar o celular,
          ou passar dias sem abrir de novo.
        </p>
        <Callout type="atencao">
          Ele só guarda <strong>texto</strong>, sem criptografia. Não é o
          lugar certo pra senha, token de login ou qualquer dado sensível
          — pra isso existe o <code>expo-secure-store</code>, que
          criptografa o conteúdo. AsyncStorage é pra coisas como
          preferências, um carrinho, uma lista de favoritos, ou a última
          foto escolhida.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">2</span>Instalando
        </h3>
        <AnnotatedCode
          filename="terminal"
          lines={[
            [
              "npx expo install ",
              t("@react-native-async-storage/async-storage", "O pacote padrão do mercado pra esse tipo de armazenamento — mantido pela comunidade, mas é o que o próprio Expo recomenda."),
            ],
          ]}
        />
      </div>

      <div className="section">
        <h3>
          <span className="num">3</span>Salvando e lendo um texto simples
        </h3>
        <div className="two-col">
          <div>
            <p>
              As duas funções que você vai usar o tempo todo:{" "}
              <code>setItem</code> (salvar) e <code>getItem</code>{" "}
              (recuperar). As duas são assíncronas — sempre com{" "}
              <code>await</code>.
            </p>
            <AnnotatedCode
              filename="components/CampoNome.tsx"
              lines={[
                ["import { useState, useEffect } from 'react'"],
                ["import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'"],
                [
                  "import ",
                  t("AsyncStorage", "Import default — não usa chaves { }, diferente da maioria dos outros pacotes que vimos."),
                  " from '@react-native-async-storage/async-storage'",
                ],
                [""],
                ["const CampoNome = () => {"],
                ["  const [nome, setNome] = useState<string>('')"],
                [""],
                [
                  "  ",
                  t("useEffect", "Assim que o componente aparece, busca o nome salvo da última vez (Aula 6)."),
                  "(() => {",
                ],
                ["    const carregar = async () => {"],
                [
                  "      const salvo = await ",
                  t("AsyncStorage.getItem('nome')", "Devolve o texto salvo, ou null se nunca foi salvo nada com essa chave."),
                ],
                ["      if (salvo) setNome(salvo)"],
                ["    }"],
                ["    carregar()"],
                ["  }, [])"],
                [""],
                ["  const salvar = async () => {"],
                [
                  "    await ",
                  t("AsyncStorage.setItem('nome', nome)", "Salva o texto atual com a chave 'nome' — sobrescreve o que já existia."),
                ],
                ["  }"],
                [""],
                ["  return ("],
                ["    <View style={styles.container}>"],
                ["      <TextInput style={styles.input} value={nome} onChangeText={setNome} />"],
                ["      <TouchableOpacity style={styles.botao} onPress={salvar}>"],
                ["        <Text style={styles.botaoTexto}>Salvar</Text>"],
                ["      </TouchableOpacity>"],
                ["    </View>"],
                ["  )"],
                ["}"],
                [""],
                ["export default CampoNome"],
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
          <DeviceFrame caption="Nome salvo continua lá após fechar e abrir o app">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10, fontSize: 13 }}>
                Maria
              </div>
              <div style={{ background: "#4ade9e", padding: 12, borderRadius: 10, textAlign: "center", fontWeight: 700, fontSize: 13 }}>
                Salvar
              </div>
            </div>
          </DeviceFrame>
        </div>
        <Callout type="dica">
          Repare no padrão: <strong>carregar</strong> vive dentro de um{" "}
          <code>useEffect</code> com <code>[]</code> (roda ao abrir a
          tela); <strong>salvar</strong> vive numa função separada,
          chamada por um botão ou outro evento. É esse par que vocês vão
          repetir pro resto da aula.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">4</span>Salvando a foto escolhida (objeto/URI)
        </h3>
        <div className="two-col">
          <div>
            <p>
              AsyncStorage só guarda texto — mas a <code>uri</code> de uma
              imagem (Aula 9) já é uma string, então salva direto, sem
              transformação nenhuma.
            </p>
            <AnnotatedCode
              filename="components/FotoPerfil.tsx"
              lines={[
                ["import { useState, useEffect } from 'react'"],
                ["import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native'"],
                ["import * as ImagePicker from 'expo-image-picker'"],
                ["import AsyncStorage from '@react-native-async-storage/async-storage'"],
                [""],
                [
                  "const CHAVE_FOTO = ",
                  t("'@app:foto_perfil'", "Boa prática: prefixar a chave com o nome do app, evitando colisão com chaves de outras bibliotecas."),
                ],
                [""],
                ["const FotoPerfil = () => {"],
                ["  const [foto, setFoto] = useState<string | null>(null)"],
                [""],
                ["  useEffect(() => {"],
                ["    const carregar = async () => {"],
                ["      const salva = await AsyncStorage.getItem(CHAVE_FOTO)"],
                ["      if (salva) setFoto(salva)"],
                ["    }"],
                ["    carregar()"],
                ["  }, [])"],
                [""],
                ["  const escolherFoto = async () => {"],
                ["    const resultado = await ImagePicker.launchImageLibraryAsync({"],
                ["      mediaTypes: ['images'],"],
                ["      quality: 0.8,"],
                ["    })"],
                ["    if (!resultado.canceled) {"],
                ["      const uri = resultado.assets[0].uri"],
                ["      setFoto(uri)"],
                [
                  "      await ",
                  t("AsyncStorage.setItem(CHAVE_FOTO, uri)", "Salva a URI assim que o usuário escolhe — sem precisar de um botão 'Salvar' separado."),
                ],
                ["    }"],
                ["  }"],
                [""],
                ["  return ("],
                ["    <View style={styles.container}>"],
                ["      {foto ? ("],
                ["        <Image source={{ uri: foto }} style={styles.foto} />"],
                ["      ) : ("],
                ["        <View style={styles.placeholder} />"],
                ["      )}"],
                ["      <TouchableOpacity style={styles.botao} onPress={escolherFoto}>"],
                ["        <Text style={styles.botaoTexto}>Trocar foto</Text>"],
                ["      </TouchableOpacity>"],
                ["    </View>"],
                ["  )"],
                ["}"],
                [""],
                ["export default FotoPerfil"],
                [""],
                ["const styles = StyleSheet.create({"],
                ["  container: { alignItems: 'center', gap: 14 },"],
                ["  foto: { width: 120, height: 120, borderRadius: 60 },"],
                ["  placeholder: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#eee' },"],
                ["  botao: { backgroundColor: '#4ade9e', padding: 10, borderRadius: 10 },"],
                ["  botaoTexto: { fontWeight: 'bold' },"],
                ["})"],
              ]}
            />
          </div>
          <DeviceFrame caption="A mesma foto reaparece ao reabrir o app">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <div style={{ width: 100, height: 100, borderRadius: 50, background: "linear-gradient(145deg, #ffb84d, #ff6b6b)" }} />
              <div style={{ background: "#4ade9e", padding: "8px 14px", borderRadius: 10, fontWeight: 700, fontSize: 13 }}>
                Trocar foto
              </div>
            </div>
          </DeviceFrame>
        </div>
      </div>

      <div className="section">
        <h3>
          <span className="num">5</span>Salvando objetos e listas (JSON)
        </h3>
        <p>
          Pra qualquer coisa que não seja texto puro — um objeto, um
          array, um número — é preciso converter pra string antes de
          salvar, e converter de volta ao ler. É exatamente o{" "}
          <code>JSON.stringify</code> / <code>JSON.parse</code> que vocês
          já usam pra ler resposta de API (Aula 6 e 7).
        </p>
        <AnnotatedCode
          filename="components/ListaFavoritos.tsx"
          lines={[
            ["import { useState, useEffect } from 'react'"],
            ["import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'"],
            ["import AsyncStorage from '@react-native-async-storage/async-storage'"],
            [""],
            ["const CHAVE_FAVORITOS = '@app:favoritos'"],
            [""],
            ["const ListaFavoritos = () => {"],
            ["  const [favoritos, setFavoritos] = useState<string[]>([])"],
            [""],
            ["  useEffect(() => {"],
            ["    const carregar = async () => {"],
            ["      const salvos = await AsyncStorage.getItem(CHAVE_FAVORITOS)"],
            [
              "      if (salvos) setFavoritos(",
              t("JSON.parse(salvos)", "Transforma o texto salvo de volta num array de verdade."),
              ")",
            ],
            ["    }"],
            ["    carregar()"],
            ["  }, [])"],
            [""],
            ["  const adicionarFavorito = async (produto: string) => {"],
            ["    const atualizados = [...favoritos, produto]"],
            ["    setFavoritos(atualizados)"],
            [
              "    await AsyncStorage.setItem(CHAVE_FAVORITOS, ",
              t("JSON.stringify(atualizados)", "Transforma o array numa string antes de salvar — AsyncStorage não aceita array direto."),
              ")",
            ],
            ["  }"],
            [""],
            ["  return ("],
            ["    <FlatList"],
            ["      data={favoritos}"],
            ["      keyExtractor={(item, index) => String(index)}"],
            ["      renderItem={({ item }) => <Text>{item}</Text>}"],
            ["    />"],
            ["  )"],
            ["}"],
            [""],
            ["export default ListaFavoritos"],
          ]}
        />
        <Callout type="dica">
          O mesmo vale pra um objeto único (tipo as preferências de um
          usuário): <code>JSON.stringify({"{ tema: 'escuro' }"})</code> pra
          salvar, <code>JSON.parse(...)</code> pra ler de volta.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">6</span>Removendo dados
        </h3>
        <AnnotatedCode
          filename="trecho"
          lines={[
            [
              "await ",
              t("AsyncStorage.removeItem('nome')", "Apaga só a chave indicada — as outras continuam intactas."),
            ],
            [""],
            [
              "await ",
              t("AsyncStorage.clear()", "Apaga TUDO que o app guardou — use com cuidado, geralmente só num botão de 'sair' ou 'resetar app'."),
            ],
          ]}
        />
      </div>

      <div className="section">
        <h3>
          <span className="num">7</span>Referência rápida
        </h3>
        <PropsTable
          rows={[
            { name: "setItem(chave, valor)", type: "Promise<void>", desc: "Salva um valor (sempre string) associado à chave" },
            { name: "getItem(chave)", type: "Promise<string | null>", desc: "Lê o valor salvo — null se a chave nunca foi usada" },
            { name: "removeItem(chave)", type: "Promise<void>", desc: "Apaga só aquela chave" },
            { name: "clear()", type: "Promise<void>", desc: "Apaga tudo que o app guardou no AsyncStorage" },
            { name: "getAllKeys()", type: "Promise<string[]>", desc: "Lista todas as chaves já usadas" },
            { name: "JSON.stringify(valor)", type: "string", desc: "Necessário antes de salvar objetos/arrays" },
            { name: "JSON.parse(texto)", type: "any", desc: "Necessário depois de ler objetos/arrays de volta" },
          ]}
        />
      </div>

      <div className="section">
        <h3>
          <span className="num">8</span>Prática
        </h3>
        <Callout type="pratica">
          Combine tudo num só componente <code>components/Perfil.tsx</code>:
          um campo de nome, uma foto (galeria ou câmera), e uma lista de
          até 3 "interesses" que o usuário digita um por vez. Salve os
          três no AsyncStorage (nome e foto como texto simples, interesses
          como JSON), carregue tudo de volta ao abrir a tela, e adicione
          um botão "Esquecer meus dados" que chama{" "}
          <code>AsyncStorage.clear()</code>.
        </Callout>
      </div>

      <DocsBox
        links={[
          { label: "AsyncStorage", desc: "docs.expo.dev — referência completa da API", url: "https://docs.expo.dev/versions/latest/sdk/async-storage/" },
          { label: "API Reference", desc: "react-native-async-storage.github.io — todos os métodos em detalhe", url: "https://react-native-async-storage.github.io/async-storage/docs/api" },
          { label: "expo-secure-store", desc: "docs.expo.dev — para dados sensíveis (senhas, tokens)", url: "https://docs.expo.dev/versions/latest/sdk/securestore/" },
          { label: "JSON.stringify (MDN)", desc: "developer.mozilla.org — referência completa do método", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify" },
        ]}
      />

      <div className="aula-footer-nav">
        <button className="nav-btn" onClick={() => goTo("aula9")}>
          <span className="nb-label">← Anterior</span>
          Aula 9 · Câmera e galeria
        </button>
        <button className="nav-btn right" onClick={() => goTo("aula11")}>
          <span className="nb-label">Próxima →</span>
          Aula 11 · Geolocalização
        </button>
      </div>
    </div>
  );
}
