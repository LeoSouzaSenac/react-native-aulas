import AnnotatedCode from "../components/AnnotatedCode";
import Callout from "../components/Callout";
import PropsTable from "../components/PropsTable";
import DeviceFrame from "../components/DeviceFrame";
import DocsBox from "../components/DocsBox";
import { t } from "../utils/ann";

interface PageProps {
  goTo: (id: string) => void;
}

export default function Aula9({ goTo }: PageProps) {
  return (
    <div className="page">
      <span className="eyebrow">Bloco 2 · Aula 9</span>
      <h2 className="title">Câmera e galeria: colocando fotos de verdade no app</h2>
      <p className="lede">
        Crie um projeto novo pra essa aula (<code>--template blank-typescript@sdk-54</code>,
        igual sempre). Hoje o app aprende a acessar duas fontes de imagem que
        já existem no celular do usuário: a galeria de fotos e a câmera —
        e também a construir uma tela de câmera 100% customizada, se
        precisar de mais controle.
      </p>

      <div className="section">
        <h3>
          <span className="num">1</span>O que dá pra fazer
        </h3>
        <p>Existem três caminhos, cada um com um nível diferente de controle:</p>
        <ul style={{ color: "var(--text-dim)", lineHeight: 1.8 }}>
          <li>
            <strong>Abrir a galeria</strong> — o usuário escolhe uma foto
            já existente no rolo de câmera dele;
          </li>
          <li>
            <strong>Abrir a câmera do sistema</strong> — abre o app de
            câmera nativo do celular (a mesma tela que ele já conhece),
            tira a foto, e devolve pro seu app;
          </li>
          <li>
            <strong>Construir sua própria tela de câmera</strong> — uma
            visualização ao vivo da câmera dentro do seu próprio app, com
            botões e overlay customizados (mais trabalho, mais controle).
          </li>
        </ul>
        <p>
          Os dois primeiros caminhos usam o pacote{" "}
          <code>expo-image-picker</code>. O terceiro usa o{" "}
          <code>expo-camera</code> — vemos ele no fim da aula, como bônus.
        </p>
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
              t("expo-image-picker", "Pacote oficial do Expo pra abrir a galeria e a câmera do sistema, e devolver a imagem escolhida pro seu app."),
            ],
          ]}
        />
      </div>

      <div className="section">
        <h3>
          <span className="num">3</span>Permissão
        </h3>
        <p>
          Abrir a <strong>galeria</strong> geralmente nem pede permissão
          explícita (o próprio seletor do sistema já cuida disso). Já a{" "}
          <strong>câmera</strong> sempre exige — o usuário precisa
          autorizar antes do app conseguir usá-la.
        </p>
        <AnnotatedCode
          filename="trecho"
          lines={[
            [
              "const { status } = await ",
              t("ImagePicker.requestCameraPermissionsAsync()", "Mostra o popup nativo do sistema pedindo autorização pra usar a câmera."),
              "()",
            ],
            [
              "if (status !== ",
              t("'granted'", "Valor retornado quando o usuário autoriza. Qualquer outra coisa significa que ele negou ou ainda não decidiu."),
              ") {",
            ],
            ["  Alert.alert('Precisamos da câmera pra continuar')"],
            ["  return"],
            ["}"],
          ]}
        />
        <Callout type="dica">
          Existe também um hook pronto, <code>ImagePicker.useCameraPermissions()</code>,
          que devolve o status atual e uma função pra pedir a permissão —
          útil quando você quer mostrar na tela se a permissão já foi
          concedida ou não, sem chamar a função toda hora.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">4</span>Abrindo a galeria
        </h3>
        <div className="two-col">
          <div>
            <AnnotatedCode
              filename="components/EscolherFoto.tsx"
              lines={[
                ["import { useState } from 'react'"],
                ["import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native'"],
                ["import * as ImagePicker from 'expo-image-picker'"],
                [""],
                ["const EscolherFoto = () => {"],
                ["  const [foto, setFoto] = useState<string | null>(null)"],
                [""],
                [
                  "  const escolherDaGaleria = async () => {",
                ],
                [
                  "    const resultado = await ",
                  t("ImagePicker.launchImageLibraryAsync", "Abre o seletor nativo de fotos do sistema."),
                  "({",
                ],
                [
                  "      ",
                  t("mediaTypes", "Que tipo de arquivo o usuário pode escolher.", [
                    { value: "['images']", desc: "só fotos (o mais comum)" },
                    { value: "['videos']", desc: "só vídeos" },
                    { value: "['images', 'videos']", desc: "os dois tipos" },
                  ]),
                  ": ['images'],",
                ],
                [
                  "      ",
                  t("allowsEditing", "Permite recortar a imagem antes de confirmar."),
                  ": true,",
                ],
                [
                  "      ",
                  t("aspect", "Proporção do recorte, quando allowsEditing é true — [largura, altura]."),
                  ": [1, 1],",
                ],
                [
                  "      ",
                  t("quality", "De 0 a 1 — quanto menor, menor o arquivo final."),
                  ": 0.8,",
                ],
                ["    })"],
                [""],
                [
                  "    if (!",
                  t("resultado.canceled", "true quando o usuário fecha o seletor sem escolher nada."),
                  ") {",
                ],
                [
                  "      setFoto(",
                  t("resultado.assets[0].uri", "O caminho local da imagem escolhida — é isso que vai dentro de um <Image source={{ uri }} />."),
                  ")",
                ],
                ["    }"],
                ["  }"],
                [""],
                ["  return ("],
                ["    <View style={styles.container}>"],
                ["      <TouchableOpacity style={styles.botao} onPress={escolherDaGaleria}>"],
                ["        <Text style={styles.botaoTexto}>Escolher da galeria</Text>"],
                ["      </TouchableOpacity>"],
                ["      {foto && <Image source={{ uri: foto }} style={styles.preview} />}"],
                ["    </View>"],
                ["  )"],
                ["}"],
                [""],
                ["export default EscolherFoto"],
                [""],
                ["const styles = StyleSheet.create({"],
                ["  container: { alignItems: 'center', gap: 14 },"],
                ["  botao: { backgroundColor: '#4ade9e', padding: 12, borderRadius: 10 },"],
                ["  botaoTexto: { fontWeight: 'bold' },"],
                ["  preview: { width: 200, height: 200, borderRadius: 12 },"],
                ["})"],
              ]}
            />
          </div>
          <DeviceFrame caption="Preview 1:1 depois de escolher da galeria">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <div style={{ background: "#4ade9e", padding: "10px 16px", borderRadius: 10, fontWeight: 700, fontSize: 13 }}>
                Escolher da galeria
              </div>
              <div style={{ width: 140, height: 140, borderRadius: 12, background: "linear-gradient(145deg, #ffb84d, #ff6b6b)" }} />
            </div>
          </DeviceFrame>
        </div>
      </div>

      <div className="section">
        <h3>
          <span className="num">5</span>Abrindo a câmera do sistema
        </h3>
        <p>
          É praticamente a mesma função, trocando só o nome — e, dessa
          vez, checando a permissão antes:
        </p>
        <AnnotatedCode
          filename="trecho"
          lines={[
            ["const tirarFoto = async () => {"],
            ["  const { status } = await ImagePicker.requestCameraPermissionsAsync()"],
            ["  if (status !== 'granted') {"],
            ["    Alert.alert('Precisamos da câmera pra continuar')"],
            ["    return"],
            ["  }"],
            [""],
            [
              "  const resultado = await ",
              t("ImagePicker.launchCameraAsync", "Abre o app de câmera nativo do sistema — a mesma tela do app de Câmera do celular."),
              "({",
            ],
            ["    mediaTypes: ['images'],"],
            ["    allowsEditing: true,"],
            ["    quality: 0.8,"],
            ["  })"],
            [""],
            ["  if (!resultado.canceled) {"],
            ["    setFoto(resultado.assets[0].uri)"],
            ["  }"],
            ["}"],
          ]}
        />
        <Callout type="atencao">
          A câmera não funciona no simulador/emulador (não existe câmera
          de verdade ali) nem no modo <code>--web</code>. Pra testar de
          verdade, use o celular físico pelo Expo Go.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">6</span>Selecionando várias imagens de uma vez
        </h3>
        <AnnotatedCode
          filename="trecho"
          lines={[
            ["const resultado = await ImagePicker.launchImageLibraryAsync({"],
            ["  mediaTypes: ['images'],"],
            [
              "  ",
              t("allowsMultipleSelection", "Permite marcar várias fotos antes de confirmar — o resultado vem em resultado.assets, um array."),
              ": true,",
            ],
            [
              "  ",
              t("selectionLimit", "Quantas fotos no máximo — 0 significa sem limite."),
              ": 5,",
            ],
            ["  quality: 0.8,"],
            ["})"],
            [""],
            ["if (!resultado.canceled) {"],
            [
              "  const uris = resultado.assets.map((",
              t("item", "Cada posição do array tem o mesmo formato: uri, width, height, fileName..."),
              ") => item.uri)",
            ],
            ["}"],
          ]}
        />
        <Callout type="dica">
          <code>allowsEditing</code> (recorte) não funciona junto com{" "}
          <code>allowsMultipleSelection</code> — dá pra recortar uma foto
          de cada vez, não várias ao mesmo tempo.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">7</span>Referência rápida das opções
        </h3>
        <PropsTable
          rows={[
            { name: "mediaTypes", type: "string[]", desc: "['images'] | ['videos'] | ['images', 'videos']" },
            { name: "allowsEditing", type: "boolean", desc: "Permite recortar antes de confirmar" },
            { name: "aspect", type: "[number, number]", desc: "Proporção do recorte, ex: [1, 1] ou [4, 3]" },
            { name: "quality", type: "number (0–1)", desc: "Compressão — 1 é qualidade máxima" },
            { name: "allowsMultipleSelection", type: "boolean", desc: "Selecionar várias imagens de uma vez (só galeria)" },
            { name: "selectionLimit", type: "number", desc: "Máximo de imagens quando allowsMultipleSelection é true" },
            { name: "base64", type: "boolean", desc: "Também devolve a imagem em base64, além da uri" },
          ]}
        />
        <p>Formato do resultado, nos dois casos:</p>
        <AnnotatedCode
          filename="trecho"
          lines={[
            ["{"],
            ["  canceled: boolean,"],
            ["  assets: ["],
            ["    {"],
            [
              "      ",
              t("uri", "Caminho local do arquivo — use direto num <Image source={{ uri }} />."),
              ": string,",
            ],
            ["      width: number,"],
            ["      height: number,"],
            ["      fileName: string | null,"],
            ["      fileSize: number | null,"],
            ["    }"],
            ["  ]"],
            ["}"],
          ]}
        />
      </div>

      <div className="section">
        <h3>
          <span className="num">8</span>Bônus: uma tela de câmera 100% sua com <code>expo-camera</code>
        </h3>
        <p>
          Quando o app de câmera do sistema não é suficiente — por
          exemplo, se você quer um overlay customizado, um botão próprio,
          ou capturar sem sair da sua tela — o pacote{" "}
          <code>expo-camera</code> mostra a câmera ao vivo dentro do
          próprio componente.
        </p>
        <AnnotatedCode
          filename="terminal"
          lines={[["npx expo install expo-camera"]]}
        />
        <AnnotatedCode
          filename="components/CameraCustom.tsx"
          lines={[
            ["import { useRef, useState } from 'react'"],
            ["import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'"],
            [
              "import { ",
              t("CameraView", "Componente que mostra a imagem da câmera ao vivo, ocupando o espaço que você definir no style."),
              ", ",
              t("useCameraPermissions", "Hook que já cuida de checar e pedir a permissão de câmera."),
              " } from 'expo-camera'",
            ],
            [""],
            ["const CameraCustom = () => {"],
            ["  const [permissao, pedirPermissao] = useCameraPermissions()"],
            [
              "  const ",
              t("cameraRef", "Referência pro componente CameraView, usada pra chamar takePictureAsync() de fora."),
              " = useRef<CameraView>(null)",
            ],
            [""],
            ["  if (!permissao?.granted) {"],
            ["    return ("],
            ["      <TouchableOpacity onPress={pedirPermissao}>"],
            ["        <Text>Permitir câmera</Text>"],
            ["      </TouchableOpacity>"],
            ["    )"],
            ["  }"],
            [""],
            [
              "  const tirarFoto = async () => {",
            ],
            [
              "    const foto = await ",
              t("cameraRef.current?.takePictureAsync()", "Captura a foto no momento em que é chamada — diferente do launchCameraAsync, aqui você controla o exato instante do clique."),
            ],
            ["    console.log(foto?.uri)"],
            ["  }"],
            [""],
            ["  return ("],
            ["    <View style={styles.container}>"],
            ["      <CameraView ref={cameraRef} style={styles.camera} facing=\"back\" />"],
            ["      <TouchableOpacity style={styles.botao} onPress={tirarFoto}>"],
            ["        <Text style={styles.botaoTexto}>Capturar</Text>"],
            ["      </TouchableOpacity>"],
            ["    </View>"],
            ["  )"],
            ["}"],
            [""],
            ["export default CameraCustom"],
            [""],
            ["const styles = StyleSheet.create({"],
            ["  container: { flex: 1 },"],
            ["  camera: { flex: 1 },"],
            ["  botao: { backgroundColor: '#4ade9e', padding: 16, alignItems: 'center' },"],
            ["  botaoTexto: { fontWeight: 'bold' },"],
            ["})"],
          ]}
        />
        <Callout type="dica">
          Pra essa fase do curso, <code>expo-image-picker</code> já
          resolve a maioria dos casos — reserve o <code>expo-camera</code>{" "}
          pra quando o app realmente precisar de uma experiência de
          câmera customizada (ex: leitor de código de barras, filtro em
          tempo real).
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">9</span>Prática
        </h3>
        <Callout type="pratica">
          Crie um componente <code>components/FotoPerfil.tsx</code> com{" "}
          <code>rnfes</code>: dois botões — "Tirar foto" e "Escolher da
          galeria" — e um círculo de preview (<code>borderRadius</code>{" "}
          na metade da largura/altura) mostrando a imagem escolhida.
          Enquanto nenhuma foto for escolhida, mostre um círculo cinza no
          lugar. Teste os dois caminhos no seu celular pelo Expo Go.
        </Callout>
      </div>

      <DocsBox
        links={[
          { label: "ImagePicker", desc: "docs.expo.dev — referência completa da API", url: "https://docs.expo.dev/versions/latest/sdk/imagepicker/" },
          { label: "Use an image picker", desc: "docs.expo.dev — tutorial oficial passo a passo", url: "https://docs.expo.dev/tutorial/image-picker/" },
          { label: "expo-camera", desc: "docs.expo.dev — referência da CameraView e captura ao vivo", url: "https://docs.expo.dev/versions/latest/sdk/camera/" },
          { label: "Permissions", desc: "docs.expo.dev — como o Expo lida com permissões de sistema", url: "https://docs.expo.dev/guides/permissions/" },
        ]}
      />

      <div className="aula-footer-nav">
        <button className="nav-btn" onClick={() => goTo("aula8")}>
          <span className="nb-label">← Anterior</span>
          Aula 8 · Navegação
        </button>
        <button className="nav-btn right" onClick={() => goTo("aula10")}>
          <span className="nb-label">Próxima →</span>
          Aula 10 · AsyncStorage
        </button>
      </div>
    </div>
  );
}
