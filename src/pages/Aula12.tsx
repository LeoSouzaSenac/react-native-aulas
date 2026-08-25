import AnnotatedCode from "../components/AnnotatedCode";
import Callout from "../components/Callout";
import PropsTable from "../components/PropsTable";
import DeviceFrame from "../components/DeviceFrame";
import DocsBox from "../components/DocsBox";
import { t } from "../utils/ann";

interface PageProps {
  goTo: (id: string) => void;
}

export default function Aula12({ goTo }: PageProps) {
  return (
    <div className="page">
      <span className="eyebrow">Bloco 2 · Aula 12</span>
      <h2 className="title">Áudio, animação e modal: o "Botão Zoeira"</h2>
      <p className="lede">
        Crie um projeto novo pra essa aula. Hoje juntamos três peças
        soltas — tocar um som, animar um componente, abrir um modal — no
        mesmo botão: toca, o botão "pulsa", toca um som, e sobe um modal
        com um GIF, um texto e mais botões.
      </p>
      <Callout type="dica">
        Nos exemplos abaixo, troque <code>assets/som.mp3</code> e{" "}
        <code>assets/reacao.gif</code> pelos arquivos que vocês quiserem
        — qualquer som e GIF que já tenham os direitos de usar. A
        mecânica é a mesma não importa o conteúdo.
      </Callout>

      <div className="section">
        <h3>
          <span className="num">1</span>As três peças
        </h3>
        <ul style={{ color: "var(--text-dim)", lineHeight: 1.8 }}>
          <li>
            <code>expo-audio</code> — toca o som (o antigo{" "}
            <code>expo-av</code> foi descontinuado; a partir da SDK 54 o
            caminho certo é esse);
          </li>
          <li>
            <code>Animated</code> — já vem embutido no React Native, sem
            instalar nada — faz o botão "pulsar" ao ser tocado;
          </li>
          <li>
            <code>Modal</code> — também embutido — a tela que sobe por
            cima de tudo com o conteúdo extra.
          </li>
        </ul>
        <AnnotatedCode
          filename="terminal"
          lines={[
            [
              "npx expo install ",
              t("expo-audio", "Pacote oficial do Expo pra tocar som — substituiu o expo-av, que está sendo removido."),
            ],
          ]}
        />
      </div>

      <div className="section">
        <h3>
          <span className="num">2</span>Tocando um som
        </h3>
        <p>
          O jeito atual é um hook: <code>useAudioPlayer</code> já cria e
          gerencia o player pra você — sem precisar chamar{" "}
          <code>load</code>/<code>unload</code> manualmente.
        </p>
        <AnnotatedCode
          filename="trecho"
          lines={[
            [
              "import { ",
              t("useAudioPlayer", "Hook que recebe a fonte do áudio e devolve um player pronto pra usar."),
              " } from 'expo-audio'",
            ],
            [""],
            ["const BotaoSom = () => {"],
            [
              "  const player = ",
              t("useAudioPlayer(require('../assets/som.mp3'))", "Arquivo local, dentro da pasta assets — funciona igual ao require() de imagem."),
            ],
            [""],
            ["  const tocar = () => {"],
            [
              "    player.",
              t("seekTo(0)", "Volta o áudio pro início — sem isso, tocar de novo rápido demais não reinicia o som."),
              "(0)",
            ],
            [
              "    player.",
              t("play()", "Inicia (ou retoma) a reprodução."),
              "()",
            ],
            ["  }"],
            [""],
            ["  return <TouchableOpacity onPress={tocar}><Text>Tocar</Text></TouchableOpacity>"],
            ["}"],
          ]}
        />
        <Callout type="atencao">
          Áudio, igual câmera, não funciona direito em todo emulador —
          teste sempre no celular físico pelo Expo Go pra ouvir de
          verdade.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">3</span>Animando o botão ao tocar
        </h3>
        <div className="two-col">
          <div>
            <p>
              <code>Animated</code> funciona assim: você cria um{" "}
              <code>Animated.Value</code> (um número "vivo", observável),
              conecta ele a uma propriedade de estilo (como{" "}
              <code>transform: scale</code>), e manda ele mudar de valor
              com uma transição suave — <code>Animated.timing</code> ou{" "}
              <code>Animated.spring</code>.
            </p>
            <AnnotatedCode
              filename="components/BotaoAnimado.tsx"
              lines={[
                ["import { useRef } from 'react'"],
                ["import { Animated, TouchableOpacity, Text, StyleSheet } from 'react-native'"],
                [""],
                ["const BotaoAnimado = () => {"],
                [
                  "  const escala = useRef(new ",
                  t("Animated.Value(1)", "Começa em 1 (tamanho normal, 100%)."),
                  ").current",
                ],
                [""],
                ["  const animarToque = () => {"],
                [
                  "    ",
                  t("Animated.sequence", "Roda uma animação depois da outra, em ordem — aqui, encolhe e depois volta ao tamanho normal."),
                  "([",
                ],
                [
                  "      ",
                  t("Animated.spring", "Animação com efeito de mola — mais orgânica que uma transição linear.", [
                    { value: "toValue", desc: "valor final que a animação persegue" },
                    { value: "useNativeDriver", desc: "true = roda a animação na thread nativa, mais fluida" },
                  ]),
                  "(escala, { toValue: 0.85, useNativeDriver: true }),",
                ],
                ["      Animated.spring(escala, { toValue: 1, useNativeDriver: true }),"],
                ["    ]).start()"],
                ["  }"],
                [""],
                ["  return ("],
                ["    <TouchableOpacity onPress={animarToque} activeOpacity={0.9}>"],
                [
                  "      <Animated.View style={[styles.botao, { ",
                  t("transform: [{ scale: escala }]", "Conecta o valor animado direto ao estilo — toda mudança em 'escala' já redesenha o componente."),
                  " }]}>",
                ],
                ["        <Text style={styles.texto}>Toca aqui</Text>"],
                ["      </Animated.View>"],
                ["    </TouchableOpacity>"],
                ["  )"],
                ["}"],
                [""],
                ["export default BotaoAnimado"],
                [""],
                ["const styles = StyleSheet.create({"],
                ["  botao: { backgroundColor: '#4ade9e', padding: 18, borderRadius: 16 },"],
                ["  texto: { fontWeight: 'bold', fontSize: 16 },"],
                ["})"],
              ]}
            />
          </div>
          <DeviceFrame caption="Botão 'pulsando' ao ser tocado">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
              <div style={{ background: "#4ade9e", padding: "16px 26px", borderRadius: 16, fontWeight: 700, transform: "scale(0.92)" }}>
                Toca aqui
              </div>
            </div>
          </DeviceFrame>
        </div>
        <Callout type="dica">
          <code>useNativeDriver: true</code> deixa a animação bem mais
          fluida — só funciona pra propriedades como <code>opacity</code>{" "}
          e <code>transform</code>, não pra coisas como{" "}
          <code>backgroundColor</code> ou <code>width</code>.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">4</span>GIF animado: nem precisa de pacote novo
        </h3>
        <p>
          O <code>Image</code> que vocês já usam desde a Aula 2 já toca
          GIF animado sozinho — local (<code>require</code>) ou remoto (
          <code>uri</code>), sem nenhuma configuração extra.
        </p>
        <AnnotatedCode
          filename="trecho"
          lines={[
            [
              "<Image source={require('../assets/reacao.gif')} style={{ width: 200, height: 200 }} />",
            ],
          ]}
        />
      </div>

      <div className="section">
        <h3>
          <span className="num">5</span>O modal
        </h3>
        <p>
          <code>Modal</code> é um componente embutido — tudo dentro dele
          fica flutuando por cima da tela atual. Controlado, como sempre,
          por estado: um booleano diz se ele está visível ou não.
        </p>
        <AnnotatedCode
          filename="trecho"
          lines={[
            ["import { useState } from 'react'"],
            ["import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native'"],
            [""],
            ["const [visivel, setVisivel] = useState<boolean>(false)"],
            [""],
            ["<Modal"],
            [
              "  ",
              t("visible", "Controla se o modal aparece — igual qualquer outra renderização condicional."),
              "={visivel}",
            ],
            [
              "  ",
              t("animationType", "Como o modal entra na tela.", [
                { value: "'slide'", desc: "sobe de baixo pra cima" },
                { value: "'fade'", desc: "aparece com um fade" },
                { value: "'none'", desc: "aparece instantaneamente" },
              ]),
              '="slide"',
            ],
            [
              "  ",
              t("transparent", "Deixa o fundo por trás do modal ver-se através, em vez de cobrir com uma cor sólida."),
              "={true}",
            ],
            [
              "  ",
              t("onRequestClose", "No Android, chamada quando o usuário aperta o botão físico de voltar."),
              "={() => setVisivel(false)}",
            ],
            [">"],
            ["  <View style={styles.fundo}>"],
            ["    <View style={styles.caixa}>"],
            ["      <Text>Conteúdo do modal aqui</Text>"],
            ["      <TouchableOpacity onPress={() => setVisivel(false)}>"],
            ["        <Text>Fechar</Text>"],
            ["      </TouchableOpacity>"],
            ["    </View>"],
            ["  </View>"],
            ["</Modal>"],
          ]}
        />
      </div>

      <div className="section">
        <h3>
          <span className="num">6</span>Tudo junto: o Botão Zoeira
        </h3>
        <div className="two-col">
          <div>
            <AnnotatedCode
              filename="components/BotaoZoeira.tsx"
              lines={[
                ["import { useRef, useState } from 'react'"],
                ["import {"],
                ["  View, Text, Image, Modal, Animated,"],
                ["  TouchableOpacity, StyleSheet,"],
                ["} from 'react-native'"],
                ["import { useAudioPlayer } from 'expo-audio'"],
                [""],
                ["const BotaoZoeira = () => {"],
                ["  const [modalAberto, setModalAberto] = useState<boolean>(false)"],
                ["  const escala = useRef(new Animated.Value(1)).current"],
                ["  const player = useAudioPlayer(require('../assets/som.mp3'))"],
                [""],
                ["  const aoTocar = () => {"],
                ["    Animated.sequence(["],
                ["      Animated.spring(escala, { toValue: 0.85, useNativeDriver: true }),"],
                ["      Animated.spring(escala, { toValue: 1, useNativeDriver: true }),"],
                ["    ]).start()"],
                [""],
                ["    player.seekTo(0)"],
                ["    player.play()"],
                [""],
                [
                  "    ",
                  t("setModalAberto(true)", "As três coisas acontecem juntas — animação, som e modal — todas disparadas pelo mesmo toque."),
                ],
                ["  }"],
                [""],
                ["  const tocarDeNovo = () => {"],
                ["    player.seekTo(0)"],
                ["    player.play()"],
                ["  }"],
                [""],
                ["  return ("],
                ["    <View style={styles.container}>"],
                ["      <TouchableOpacity onPress={aoTocar} activeOpacity={0.9}>"],
                ["        <Animated.View style={[styles.botao, { transform: [{ scale: escala }] }]}>"],
                ["          <Text style={styles.botaoTexto}>Toca aqui</Text>"],
                ["        </Animated.View>"],
                ["      </TouchableOpacity>"],
                [""],
                ["      <Modal visible={modalAberto} animationType=\"slide\" transparent>"],
                ["        <View style={styles.fundo}>"],
                ["          <View style={styles.caixa}>"],
                ["            <Image"],
                ["              source={require('../assets/reacao.gif')}"],
                ["              style={styles.gif}"],
                ["            />"],
                ["            <Text style={styles.mensagem}>Aeeee, isso aí!</Text>"],
                [""],
                ["            <View style={styles.linhaBotoes}>"],
                ["              <TouchableOpacity style={styles.botaoSecundario} onPress={tocarDeNovo}>"],
                ["                <Text>Tocar de novo</Text>"],
                ["              </TouchableOpacity>"],
                ["              <TouchableOpacity"],
                ["                style={styles.botaoSecundario}"],
                ["                onPress={() => setModalAberto(false)}"],
                ["              >"],
                ["                <Text>Fechar</Text>"],
                ["              </TouchableOpacity>"],
                ["            </View>"],
                ["          </View>"],
                ["        </View>"],
                ["      </Modal>"],
                ["    </View>"],
                ["  )"],
                ["}"],
                [""],
                ["export default BotaoZoeira"],
                [""],
                ["const styles = StyleSheet.create({"],
                ["  container: { alignItems: 'center', justifyContent: 'center', flex: 1 },"],
                ["  botao: { backgroundColor: '#4ade9e', padding: 18, borderRadius: 16 },"],
                ["  botaoTexto: { fontWeight: 'bold', fontSize: 16 },"],
                ["  fundo: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },"],
                ["  caixa: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, alignItems: 'center' },"],
                ["  gif: { width: 180, height: 180, borderRadius: 12, marginBottom: 14 },"],
                ["  mensagem: { fontSize: 18, fontWeight: 'bold', marginBottom: 18 },"],
                ["  linhaBotoes: { flexDirection: 'row', gap: 12 },"],
                ["  botaoSecundario: { backgroundColor: '#eee', padding: 12, borderRadius: 10 },"],
                ["})"],
              ]}
            />
          </div>
          <DeviceFrame caption="Modal subindo com GIF, texto e dois botões">
            <div style={{ position: "relative", height: "100%", margin: -14 }}>
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 18, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ width: 90, height: 90, borderRadius: 10, background: "linear-gradient(145deg, #ffb84d, #ff6b6b)" }} />
                <span style={{ fontWeight: 700, fontSize: 14 }}>Aeeee, isso aí!</span>
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ background: "#eee", padding: "8px 12px", borderRadius: 8, fontSize: 11 }}>Tocar de novo</div>
                  <div style={{ background: "#eee", padding: "8px 12px", borderRadius: 8, fontSize: 11 }}>Fechar</div>
                </div>
              </div>
            </div>
          </DeviceFrame>
        </div>
      </div>

      <div className="section">
        <h3>
          <span className="num">7</span>Referência rápida
        </h3>
        <PropsTable
          rows={[
            { name: "useAudioPlayer(fonte)", type: "expo-audio", desc: "Cria o player — .play(), .pause(), .seekTo(segundos)" },
            { name: "Animated.Value(inicial)", type: "Animated", desc: "Um número observável, conectado a um estilo" },
            { name: "Animated.timing / .spring", type: "Animated", desc: "Anima o valor até um toValue, de forma linear ou com mola" },
            { name: "Animated.sequence([...])", type: "Animated", desc: "Roda várias animações em ordem" },
            { name: "useNativeDriver", type: "Animated", desc: "true deixa mais fluido — só pra opacity/transform" },
            { name: "visible", type: "Modal", desc: "Controla se o modal aparece" },
            { name: "animationType", type: "Modal", desc: "'slide' | 'fade' | 'none'" },
            { name: "transparent", type: "Modal", desc: "Deixa o fundo por trás visível através do modal" },
          ]}
        />
      </div>

      <div className="section">
        <h3>
          <span className="num">8</span>Prática
        </h3>
        <Callout type="pratica">
          Adicione um terceiro botão dentro do modal: "Compartilhar" (por
          enquanto, só um <code>console.log('compartilhando...')</code> —
          isso vira aula de verdade mais pra frente). Depois, troque a
          animação de <code>Animated.spring</code> pra{" "}
          <code>Animated.timing</code> com uma <code>duration</code>{" "}
          bem longa (uns 2000ms) só pra sentir a diferença de sensação
          entre as duas.
        </Callout>
      </div>

      <DocsBox
        links={[
          { label: "expo-audio", desc: "docs.expo.dev — referência completa do useAudioPlayer", url: "https://docs.expo.dev/versions/latest/sdk/audio/" },
          { label: "Animated", desc: "reactnative.dev — guia completo da API de animação embutida", url: "https://reactnative.dev/docs/animated" },
          { label: "Modal", desc: "reactnative.dev — todas as props do componente Modal", url: "https://reactnative.dev/docs/modal" },
          { label: "Image", desc: "reactnative.dev — suporte a GIF e outros formatos", url: "https://reactnative.dev/docs/image" },
        ]}
      />

      <div className="aula-footer-nav">
        <button className="nav-btn" onClick={() => goTo("aula11")}>
          <span className="nb-label">← Anterior</span>
          Aula 11 · Geolocalização
        </button>
        <button className="nav-btn right" onClick={() => goTo("home")}>
          <span className="nb-label">Voltar</span>
          Início
        </button>
      </div>
    </div>
  );
}
