import AnnotatedCode from "../components/AnnotatedCode";
import Callout from "../components/Callout";
import PropsTable from "../components/PropsTable";
import DeviceFrame from "../components/DeviceFrame";
import DocsBox from "../components/DocsBox";
import { t } from "../utils/ann";

interface PageProps {
  goTo: (id: string) => void;
}

export default function Aula11({ goTo }: PageProps) {
  return (
    <div className="page">
      <span className="eyebrow">Bloco 2 · Aula 11</span>
      <h2 className="title">Geolocalização: pegando a posição do usuário e mostrando num mapa</h2>
      <p className="lede">
        Crie um projeto novo pra essa aula. Hoje juntamos duas peças: o{" "}
        <code>expo-location</code>, que pergunta pro sistema operacional
        onde o usuário está, e o <code>react-native-maps</code>, que
        desenha um mapa de verdade na tela — com pin, região centralizada
        e tudo.
      </p>

      <div className="section">
        <h3>
          <span className="num">1</span>Duas peças, dois pacotes
        </h3>
        <p>
          <code>expo-location</code> responde "onde estou?" — devolve
          latitude e longitude. <code>react-native-maps</code> responde
          "como eu desenho isso na tela?" — mostra um mapa de verdade
          (Apple Maps no iOS, Google Maps no Android), com pins, zoom e
          gestos de arrastar.
        </p>
        <AnnotatedCode
          filename="terminal"
          lines={[
            [
              "npx expo install ",
              t("expo-location", "Pede a localização do dispositivo pro sistema operacional."),
              " ",
              t("react-native-maps", "Componente de mapa nativo — funciona direto no Expo Go, sem precisar de build customizado nem chave de API pra testar."),
            ],
          ]}
        />
        <Callout type="dica">
          Testando pelo Expo Go, o mapa já aparece sem precisar de nenhuma
          chave do Google — a chave só é necessária quando o app for
          publicado de verdade nas lojas.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">2</span>Pedindo permissão de localização
        </h3>
        <AnnotatedCode
          filename="trecho"
          lines={[
            ["import * as Location from 'expo-location'"],
            [""],
            [
              "const { status } = await ",
              t("Location.requestForegroundPermissionsAsync()", "Pede autorização pra usar a localização enquanto o app está aberto na tela (em primeiro plano)."),
              "()",
            ],
            [
              "if (status !== 'granted') {",
            ],
            ["  Alert.alert('Precisamos da localização pra continuar')"],
            ["  return"],
            ["}"],
          ]}
        />
        <Callout type="atencao">
          Existe também <code>requestBackgroundPermissionsAsync</code>,
          pra rastrear localização mesmo com o app minimizado — muito mais
          delicado (exige uma explicação clara pro usuário) e fora do
          escopo desta aula. Fiquem só com a permissão em primeiro plano.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">3</span>Pegando a posição atual
        </h3>
        <AnnotatedCode
          filename="trecho"
          lines={[
            [
              "const posicao = await ",
              t("Location.getCurrentPositionAsync", "Pega a posição atual uma única vez — bom pra 'onde estou agora', não pra rastreamento contínuo."),
              "({})",
            ],
            [""],
            ["console.log(posicao.coords.latitude)"],
            ["console.log(posicao.coords.longitude)"],
          ]}
        />
        <p>O formato completo do retorno:</p>
        <AnnotatedCode
          filename="trecho"
          lines={[
            ["{"],
            ["  coords: {"],
            ["    latitude: number,"],
            ["    longitude: number,"],
            [
              "    ",
              t("accuracy", "Precisão da leitura, em metros — quanto menor, mais preciso."),
              ": number,",
            ],
            ["    altitude: number | null,"],
            ["    speed: number | null,"],
            ["  },"],
            ["  timestamp: number,"],
            ["}"],
          ]}
        />
      </div>

      <div className="section">
        <h3>
          <span className="num">4</span>Mostrando num mapa, com pin
        </h3>
        <div className="two-col">
          <div>
            <AnnotatedCode
              filename="components/MapaUsuario.tsx"
              lines={[
                ["import { useState, useEffect } from 'react'"],
                ["import { View, StyleSheet, ActivityIndicator } from 'react-native'"],
                [
                  "import ",
                  t("MapView", "O componente do mapa em si — ocupa o espaço definido no style, igual qualquer outra View."),
                  ", { ",
                  t("Marker", "O pin — um filho do MapView, posicionado pela prop coordinate."),
                  " } from 'react-native-maps'",
                ],
                ["import * as Location from 'expo-location'"],
                [""],
                ["const MapaUsuario = () => {"],
                [
                  "  const [regiao, setRegiao] = useState<",
                  t("Region", "Tipo do react-native-maps: descreve o centro e o quanto de \"zoom\" o mapa mostra."),
                  " | null>(null)",
                ],
                [""],
                ["  useEffect(() => {"],
                ["    const carregar = async () => {"],
                ["      const { status } = await Location.requestForegroundPermissionsAsync()"],
                ["      if (status !== 'granted') return"],
                [""],
                ["      const posicao = await Location.getCurrentPositionAsync({})"],
                ["      setRegiao({"],
                ["        latitude: posicao.coords.latitude,"],
                ["        longitude: posicao.coords.longitude,"],
                [
                  "        ",
                  t("latitudeDelta", "Quanto de área o mapa mostra — quanto menor, mais 'zoom'.", [
                    { value: "0.01", desc: "bem próximo, nível de rua" },
                    { value: "0.5", desc: "visão de bairro/cidade" },
                  ]),
                  ": 0.01,",
                ],
                ["        longitudeDelta: 0.01,"],
                ["      })"],
                ["    }"],
                ["    carregar()"],
                ["  }, [])"],
                [""],
                ["  if (!regiao) {"],
                ["    return <ActivityIndicator size=\"large\" style={styles.loading} />"],
                ["  }"],
                [""],
                ["  return ("],
                ["    <MapView"],
                ["      style={styles.mapa}"],
                [
                  "      ",
                  t("initialRegion", "Onde o mapa começa centralizado — só é lido na primeira renderização."),
                  "={regiao}",
                ],
                [
                  "      ",
                  t("showsUserLocation", "Mostra o ponto azul padrão do sistema na posição do usuário, além do seu próprio pin."),
                  "={true}",
                ],
                ["    >"],
                ["      <Marker"],
                [
                  "        ",
                  t("coordinate", "Onde o pin fica — objeto com latitude e longitude."),
                  "={{ latitude: regiao.latitude, longitude: regiao.longitude }}",
                ],
                [
                  "        ",
                  t("title", "Texto exibido quando o usuário toca no pin."),
                  '="Você está aqui"',
                ],
                ["      />"],
                ["    </MapView>"],
                ["  )"],
                ["}"],
                [""],
                ["export default MapaUsuario"],
                [""],
                ["const styles = StyleSheet.create({"],
                ["  mapa: { flex: 1 },"],
                ["  loading: { flex: 1 },"],
                ["})"],
              ]}
            />
          </div>
          <DeviceFrame caption="Mapa centralizado na posição do usuário, com pin">
            <div style={{ position: "relative", height: "100%", background: "#dfe9df", overflow: "hidden", margin: -14 }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(#c9d9c4 1px, transparent 1px), linear-gradient(90deg, #c9d9c4 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -100%)" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50% 50% 50% 0", background: "#ff6b6b", transform: "rotate(-45deg)", border: "2px solid #fff", boxShadow: "0 2px 6px rgba(0,0,0,0.3)" }} />
              </div>
            </div>
          </DeviceFrame>
        </div>
      </div>

      <div className="section">
        <h3>
          <span className="num">5</span>Vários pins de uma vez
        </h3>
        <p>
          Pra mostrar uma lista de lugares (produtores, lojas, pontos de
          entrega), é só percorrer um array e renderizar um{" "}
          <code>Marker</code> pra cada item — o mesmo raciocínio do{" "}
          <code>.map()</code>/<code>FlatList</code> das Aulas 5 a 7,
          aplicado dentro do mapa.
        </p>
        <AnnotatedCode
          filename="trecho"
          lines={[
            ["interface Lugar {"],
            ["  id: string;"],
            ["  nome: string;"],
            ["  latitude: number;"],
            ["  longitude: number;"],
            ["}"],
            [""],
            ["<MapView style={styles.mapa} initialRegion={regiao}>"],
            [
              "  {lugares.map((",
              t("lugar", "Cada posição do array vira um Marker próprio, com sua própria coordenada."),
              ") => ("
            ],
            ["    <Marker"],
            ["      key={lugar.id}"],
            ["      coordinate={{ latitude: lugar.latitude, longitude: lugar.longitude }}"],
            ["      title={lugar.nome}"],
            ["    />"],
            ["  ))}"],
            ["</MapView>"],
          ]}
        />
      </div>

      <div className="section">
        <h3>
          <span className="num">6</span>Bônus: observando a posição mudar em tempo real
        </h3>
        <p>
          <code>getCurrentPositionAsync</code> pega a posição uma vez só.
          Pra acompanhar o usuário se movendo (tipo um app de entrega),
          existe o <code>watchPositionAsync</code> — segue o mesmo padrão
          de <em>cleanup</em> visto na Aula 6, porque cria algo (uma
          inscrição) que precisa ser cancelado depois.
        </p>
        <AnnotatedCode
          filename="trecho"
          lines={[
            ["useEffect(() => {"],
            [
              "  let inscricao: ",
              t("Location.LocationSubscription", "Objeto devolvido pelo watchPositionAsync — guarda a função de cancelamento."),
              " | null = null",
            ],
            [""],
            ["  const iniciar = async () => {"],
            ["    const { status } = await Location.requestForegroundPermissionsAsync()"],
            ["    if (status !== 'granted') return"],
            [""],
            [
              "    inscricao = await ",
              t("Location.watchPositionAsync", "Chama a função de callback toda vez que a posição muda o suficiente.", [
                { value: "timeInterval", desc: "de quanto em quanto tempo checar, em ms" },
                { value: "distanceInterval", desc: "distância mínima (em metros) pra disparar de novo" },
              ]),
              "(",
            ],
            ["      { timeInterval: 5000, distanceInterval: 10 },"],
            ["      (posicao) => {"],
            ["        setRegiao((atual) => ({ ...atual!, ...posicao.coords }))"],
            ["      }"],
            ["    )"],
            ["  }"],
            ["  iniciar()"],
            [""],
            [
              "  return () => ",
              t("inscricao?.remove()", "Cancela a observação quando o componente sai de tela — igual ao clearInterval da Aula 6."),
            ],
            ["}, [])"],
          ]}
        />
      </div>

      <div className="section">
        <h3>
          <span className="num">7</span>Referência rápida
        </h3>
        <PropsTable
          rows={[
            { name: "requestForegroundPermissionsAsync()", type: "expo-location", desc: "Pede permissão de localização em primeiro plano" },
            { name: "getCurrentPositionAsync(opções)", type: "expo-location", desc: "Pega a posição atual, uma vez" },
            { name: "watchPositionAsync(opções, callback)", type: "expo-location", desc: "Observa a posição mudando — precisa de cleanup" },
            { name: "initialRegion", type: "MapView", desc: "Centro + zoom inicial do mapa (latitude, longitude, latitudeDelta, longitudeDelta)" },
            { name: "showsUserLocation", type: "MapView", desc: "Mostra o ponto azul padrão do sistema na posição do usuário" },
            { name: "coordinate", type: "Marker", desc: "Onde o pin fica — { latitude, longitude }" },
            { name: "title / description", type: "Marker", desc: "Texto exibido ao tocar no pin" },
          ]}
        />
      </div>

      <div className="section">
        <h3>
          <span className="num">8</span>Prática
        </h3>
        <Callout type="pratica">
          Crie um componente <code>components/MapaLugares.tsx</code> com{" "}
          <code>rnfes</code>: mostre o mapa centralizado na posição do
          usuário (com <code>showsUserLocation</code>), e adicione um
          array fixo de 3 "lugares favoritos" (nome + coordenadas
          próximas à sua localização), cada um com seu próprio{" "}
          <code>Marker</code> e <code>title</code>.
        </Callout>
      </div>

      <DocsBox
        links={[
          { label: "expo-location", desc: "docs.expo.dev — referência completa da API de localização", url: "https://docs.expo.dev/versions/latest/sdk/location/" },
          { label: "react-native-maps", desc: "github.com — documentação e exemplos do componente de mapa", url: "https://github.com/react-native-maps/react-native-maps" },
          { label: "expo-maps", desc: "docs.expo.dev — alternativa mais nova, ainda em alpha", url: "https://docs.expo.dev/versions/latest/sdk/maps/" },
          { label: "Permissions", desc: "docs.expo.dev — como o Expo lida com permissões de sistema", url: "https://docs.expo.dev/guides/permissions/" },
        ]}
      />

      <div className="aula-footer-nav">
        <button className="nav-btn" onClick={() => goTo("aula10")}>
          <span className="nb-label">← Anterior</span>
          Aula 10 · AsyncStorage
        </button>
        <button className="nav-btn right" onClick={() => goTo("home")}>
          <span className="nb-label">Voltar</span>
          Início
        </button>
      </div>
    </div>
  );
}
