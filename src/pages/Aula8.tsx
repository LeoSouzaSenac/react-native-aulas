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

export default function Aula8({ goTo }: PageProps) {
  return (
    <div className="page">
      <span className="eyebrow">Bloco 2 · Aula 8</span>
      <h2 className="title">Navegação: colocando mais de uma tela no app</h2>
      <p className="lede">
        Todo o Bloco 1 viveu dentro de uma tela só. Hoje isso muda: vamos
        usar o <strong>React Navigation</strong>, a biblioteca padrão do
        mercado, pra empilhar telas, voltar entre elas, e organizar um app
        com abas — tudo tipado com TypeScript, sem usar <code>any</code>.
      </p>

      <div className="section">
        <h3>
          <span className="num">1</span>Por que precisamos de uma biblioteca pra isso
        </h3>
        <p>
          Na web, trocar de página é o navegador cuidando de URL e
          histórico. Num app, não existe navegador nem URL — quem cuida de
          "que tela está visível agora" e "pra onde eu volto" é a própria
          navegação do app, e é isso que o React Navigation resolve: ele
          empilha telas como uma pilha de cartas, um por cima do outro, e
          te dá funções pra empilhar mais uma, ou tirar a de cima.
        </p>
      </div>

      <div className="section">
        <h3>
          <span className="num">2</span>Instalando
        </h3>
        <p>
          Pacote principal, mais o navegador em pilha que vamos usar
          primeiro:
        </p>
        <AnnotatedCode
          filename="terminal"
          lines={[
            [
              "npx expo install ",
              t("@react-navigation/native", "Pacote núcleo — container de navegação e a lógica compartilhada por todos os tipos de navegador."),
              " @react-navigation/native-stack",
            ],
          ]}
        />
        <p>Mais as dependências nativas que o React Navigation precisa por baixo dos panos:</p>
        <AnnotatedCode
          filename="terminal"
          lines={[
            [
              "npx expo install react-native-screens ",
              t("react-native-safe-area-context", "Se você já instalou na Aula 2, o comando só confirma que a versão está compatível — sem duplicar nada."),
              " react-native-gesture-handler",
            ],
          ]}
        />
        <Callout type="dica">
          Repare que usamos <code>npx expo install</code>, não{" "}
          <code>npm install</code>. Pra pacotes com código nativo, o Expo
          escolhe automaticamente a versão certa pra bater com a nossa SDK
          54 — evita o clássico "funciona no tutorial, quebra no meu
          projeto" por causa de versão incompatível.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">3</span>
          <Term note="Um dos vários tipos de navegador do React Navigation — organiza as telas como uma pilha, onde cada nova tela entra por cima da anterior.">
            Stack Navigator
          </Term>{" "}
          — a pilha de telas
        </h3>
        <p>
          O tipo de navegação mais comum: uma tela abre outra por cima, e
          um botão de voltar (nativo, no cabeçalho) desempilha. Três peças
          formam a base de qualquer app com React Navigation:
        </p>
        <AnnotatedCode
          filename="App.tsx"
          lines={[
            [
              "import { ",
              t("NavigationContainer", "Componente raiz — precisa envolver toda a navegação do app, uma vez só, geralmente no App.tsx."),
              " } from '@react-navigation/native'",
            ],
            [
              "import { ",
              t("createNativeStackNavigator", "Função que cria um Stack Navigator novo — devolve um par { Navigator, Screen }."),
              " } from '@react-navigation/native-stack'",
            ],
            ["import HomeScreen from './screens/HomeScreen'"],
            ["import ProfileScreen from './screens/ProfileScreen'"],
            [""],
            [
              "const Stack = ",
              t("createNativeStackNavigator()", "Cria o par Stack.Navigator + Stack.Screen usado logo abaixo."),
            ],
            [""],
            ["export default function App() {"],
            ["  return ("],
            ["    <NavigationContainer>"],
            [
              "      <",
              t("Stack.Navigator", "Gerencia a pilha em si — quem está em cima, quem está embaixo."),
              " ",
              t("initialRouteName", "Qual tela aparece primeiro quando o app abre."),
              '="Home">',
            ],
            [
              "        <",
              t("Stack.Screen", "Registra uma tela na pilha — precisa de name (o identificador) e component (o componente de verdade)."),
              ' name="Home" component={HomeScreen} />',
            ],
            ["        <Stack.Screen name=\"Profile\" component={ProfileScreen} />"],
            ["      </Stack.Navigator>"],
            ["    </NavigationContainer>"],
            ["  )"],
            ["}"],
          ]}
        />
        <Callout type="atencao">
          <code>SafeAreaProvider</code> (Aula 2) continua necessário — ele
          fica por fora até do <code>NavigationContainer</code>, envolvendo
          tudo.
        </Callout>

        <p>
          Só isso ainda não navega — só empilha as duas telas registradas.
          A navegação de verdade acontece dentro de cada tela, chamando{" "}
          <code>navigation.navigate('NomeDaTela')</code>. Pra fechar o
          exemplo, eis o <code>HomeScreen</code> com um botão que leva pra{" "}
          <code>Profile</code>:
        </p>
        <AnnotatedCode
          filename="screens/HomeScreen.tsx"
          lines={[
            ["import { View, Text, Button, StyleSheet } from 'react-native'"],
            [""],
            ["export default function HomeScreen({ ", t("navigation", "Prop especial — todo componente registrado como Stack.Screen recebe ele automaticamente, sem você passar nada."), " }: any) {"],
            ["  return ("],
            ["    <View style={styles.container}>"],
            ["      <Text>HomeScreen</Text>"],
            ["      <Button"],
            ["        title=\"Ir para Profile\""],
            [
              "        ",
              t("onPress={() => navigation.navigate('Profile')}", "É essa chamada que de fato navega: empilha a tela 'Profile' por cima da atual."),
            ],
            ["      />"],
            ["    </View>"],
            ["  )"],
            ["}"],
            [""],
            ["const styles = StyleSheet.create({"],
            ["  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },"],
            ["})"],
          ]}
        />
        <Callout type="dica">
          Usei <code>{"{ navigation }: any"}</code> aqui só pra ir direto
          ao ponto. Daqui a pouco, na seção 4, a gente troca esse{" "}
          <code>any</code> por uma tipagem de verdade — mas a chamada{" "}
          <code>navigation.navigate(...)</code> que realmente navega é
          exatamente essa mesma, com ou sem tipo.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">3.1</span>Voltando pra tela anterior
        </h3>
        <p>
          Do lado do <code>ProfileScreen</code>, o caminho de volta usa o
          mesmo <code>navigation</code>, só que com <code>goBack()</code>{" "}
          em vez de <code>navigate</code>:
        </p>
        <AnnotatedCode
          filename="screens/ProfileScreen.tsx"
          lines={[
            ["import { View, Text, Button } from 'react-native'"],
            [""],
            ["export default function ProfileScreen({ navigation }: any) {"],
            ["  return ("],
            ["    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>"],
            ["      <Text>ProfileScreen</Text>"],
            ["      <Button"],
            ["        title=\"Voltar\""],
            [
              "        ",
              t("onPress={() => navigation.goBack()}", "Desempilha a tela atual, voltando pra que estava embaixo — nesse caso, a Home."),
            ],
            ["      />"],
            ["    </View>"],
            ["  )"],
            ["}"],
          ]}
        />
        <Callout type="dica">
          Repare que <code>Profile</code> já ganha de graça um botão de
          voltar no cabeçalho nativo, criado automaticamente pelo Stack
          Navigator — o <code>Button</code> com <code>goBack()</code> aqui
          é só pra deixar explícito como funciona por trás dos panos.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">4</span>
          <code>navigation</code> e <code>route</code>: o que toda tela ganha de graça
        </h3>
        <p>
          Todo componente registrado como <code>Stack.Screen</code> recebe
          automaticamente dois props especiais, sem você precisar passar
          nada manualmente:
        </p>
        <PropsTable
          rows={[
            { name: "navigation", type: "objeto", desc: "Controla a navegação: navigate, goBack, push, replace..." },
            { name: "route", type: "objeto", desc: "Representa a tela atual — route.name e route.params" },
          ]}
        />
        <p>
          Tipar isso com uma <code>interface</code> genérica funciona, mas
          o jeito correto — o que vamos usar sempre — é descrever{" "}
          <strong>todas as telas do app e seus parâmetros</strong> numa
          lista central, e apontar cada tela pra essa lista. Assim o
          TypeScript passa a validar os nomes de tela e os parâmetros na
          hora de navegar.
        </p>
        <AnnotatedCode
          filename="App.tsx"
          lines={[
            [
              "interface ",
              t("StackParamList", "Lista central com todas as telas da pilha e o que cada uma espera receber."),
              " {",
            ],
            [
              "  Home: ",
              t("undefined", "Home não recebe nenhum parâmetro."),
              ";",
            ],
            [
              "  Profile: ",
              t("{ userId: number }", "Profile exige um userId numérico sempre que for aberta."),
              ";",
            ],
            ["}"],
          ]}
        />
        <p>E cada tela usa essa lista pra tipar seus próprios props:</p>
        <AnnotatedCode
          filename="screens/HomeScreen.tsx"
          lines={[
            [
              "import { ",
              t("NativeStackNavigationProp", "Tipo pronto do React Navigation pra descrever o objeto navigation de uma tela específica."),
              " } from '@react-navigation/native-stack'",
            ],
            ["import { View, Text, Button, StyleSheet } from 'react-native'"],
            [""],
            ["interface StackParamList {"],
            ["  Home: undefined;"],
            ["  Profile: { userId: number };"],
            ["}"],
            [""],
            ["interface HomeScreenProps {"],
            [
              "  navigation: ",
              t("NativeStackNavigationProp<StackParamList, 'Home'>", "Diz: esse é o navigation de uma tela chamada 'Home', dentro da pilha descrita em StackParamList."),
              ";",
            ],
            ["}"],
            [""],
            [
              "export default function HomeScreen({ navigation }: HomeScreenProps) {",
            ],
            ["  return ("],
            ["    <View style={styles.container}>"],
            ["      <Text>HomeScreen</Text>"],
            ["      <Button"],
            ["        title=\"Ir para Profile\""],
            [
              "        ",
              t("onPress={() => navigation.navigate('Profile', { userId: 1 })}", "TypeScript exige userId aqui, porque Profile foi declarada assim no StackParamList — esquecer o parâmetro já vira erro no editor."),
            ],
            ["      />"],
            ["    </View>"],
            ["  )"],
            ["}"],
            [""],
            ["const styles = StyleSheet.create({"],
            ["  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },"],
            ["})"],
          ]}
        />
        <Callout type="dica">
          Vai encontrar por aí exemplos com{" "}
          <code>{"({ navigation }: any)"}</code> — funciona, mas desliga
          toda checagem de tipo. Só use <code>any</code> pra testar algo
          rapidinho; no projeto de verdade, tipe com{" "}
          <code>StackParamList</code> como acima.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">5</span>Lendo o parâmetro na tela de destino
        </h3>
        <div className="two-col">
          <div>
            <AnnotatedCode
              filename="screens/ProfileScreen.tsx"
              lines={[
                ["import { RouteProp } from '@react-navigation/native'"],
                ["import { View, Text } from 'react-native'"],
                [""],
                ["interface StackParamList {"],
                ["  Home: undefined;"],
                ["  Profile: { userId: number };"],
                ["}"],
                [""],
                ["interface ProfileScreenProps {"],
                [
                  "  route: ",
                  t("RouteProp<StackParamList, 'Profile'>", "Tipa o route dessa tela — TypeScript já sabe que route.params.userId existe e é number."),
                  ";",
                ],
                ["}"],
                [""],
                [
                  "export default function ProfileScreen({ route }: ProfileScreenProps) {",
                ],
                [
                  "  const { userId } = ",
                  t("route.params", "Objeto com os parâmetros recebidos na navegação — vem tipado, sem precisar de verificação manual."),
                ],
                [""],
                ["  return ("],
                ["    <View>"],
                ["      <Text>Perfil do usuário {userId}</Text>"],
                ["    </View>"],
                ["  )"],
                ["}"],
              ]}
            />
          </div>
          <DeviceFrame caption="Tela Profile recebendo userId=1">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
              <span style={{ fontSize: 14 }}>Perfil do usuário 1</span>
            </div>
          </DeviceFrame>
        </div>
      </div>

      <div className="section">
        <h3>
          <span className="num">6</span>
          <code>Bottom Tabs</code> — abas na parte inferior
        </h3>
        <div className="two-col">
          <div>
            <p>
              Pra um app com seções fixas (tipo "Início" e "Perfil"
              sempre visíveis embaixo), o navegador certo é o de abas.
              Os ícones vêm de <code>@expo/vector-icons</code>, já incluído
              em qualquer projeto Expo — sem instalação extra.
            </p>
            <AnnotatedCode
              filename="App.tsx"
              lines={[
                [
                  "import { ",
                  t("createBottomTabNavigator", "Cria o par Tab.Navigator + Tab.Screen, equivalente ao do Stack."),
                  " } from '@react-navigation/bottom-tabs'",
                ],
                ["import { Ionicons } from '@expo/vector-icons'"],
                [""],
                ["const Tab = createBottomTabNavigator()"],
                [""],
                ["export default function App() {"],
                ["  return ("],
                ["    <NavigationContainer>"],
                [
                  "      <Tab.Navigator",
                ],
                [
                  "        ",
                  t("screenOptions={({ route }) => ({ ... })}", "Configura opções pra todas as abas de uma vez — aqui, usamos pra escolher o ícone certo por aba."),
                ],
                ["      >"],
                ["        <Tab.Screen"],
                ["          name=\"Home\""],
                ["          component={HomeScreen}"],
                ["          options={{"],
                [
                  "            ",
                  t("tabBarIcon", "Recebe color e size prontos do React Navigation, e devolve o ícone da aba.", ),
                  ": ({ color, size }) => (",
                ],
                ["              <Ionicons name=\"home-outline\" size={size} color={color} />"],
                ["            ),"],
                ["          }}"],
                ["        />"],
                ["        <Tab.Screen"],
                ["          name=\"Profile\""],
                ["          component={ProfileScreen}"],
                ["          options={{"],
                ["            tabBarIcon: ({ color, size }) => ("],
                ["              <Ionicons name=\"person-outline\" size={size} color={color} />"],
                ["            ),"],
                ["          }}"],
                ["        />"],
                ["      </Tab.Navigator>"],
                ["    </NavigationContainer>"],
                ["  )"],
                ["}"],
              ]}
            />
            <Callout type="dica">
              Prefira <code>options</code> em cada <code>Tab.Screen</code>{" "}
              (como acima) em vez de um <code>if</code> dentro de{" "}
              <code>screenOptions</code> comparando <code>route.name</code>{" "}
              — funciona igual, mas fica mais fácil de ler qual ícone
              pertence a qual aba.
            </Callout>
          </div>
          <DeviceFrame caption="Barra de abas inferior com 2 ícones">
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 13 }}>HomeScreen</span>
              </div>
              <div style={{ display: "flex", borderTop: "1px solid #eee", paddingTop: 8 }}>
                <div style={{ flex: 1, textAlign: "center", color: "#4ade9e", fontSize: 11, fontWeight: 700 }}>
                  ⌂ Home
                </div>
                <div style={{ flex: 1, textAlign: "center", color: "#999", fontSize: 11 }}>
                  ◯ Profile
                </div>
              </div>
            </div>
          </DeviceFrame>
        </div>
      </div>

      <div className="section">
        <h3>
          <span className="num">7</span>Ações de navegação — referência rápida
        </h3>
        <PropsTable
          rows={[
            { name: "navigate('Tela')", type: "ação", desc: "Vai pra tela indicada — se já estiver na pilha, não duplica" },
            { name: "push('Tela')", type: "ação", desc: "Sempre empilha uma nova instância, mesmo repetida" },
            { name: "goBack()", type: "ação", desc: "Volta pra tela anterior da pilha" },
            { name: "replace('Tela')", type: "ação", desc: "Troca a tela atual, sem manter a antiga na pilha (bom pra pós-login)" },
            { name: "setParams({ ... })", type: "ação", desc: "Atualiza os parâmetros da própria tela, sem navegar" },
          ]}
        />
        <Callout type="dica">
          <code>replace</code> é o motivo de todo fluxo de login trocar{" "}
          <code>LoginScreen</code> por <code>HomeScreen</code> com ele, em
          vez de <code>navigate</code>: assim o usuário não consegue
          "voltar" pra tela de login depois de logado.
        </Callout>
      </div>

      <div className="section">
        <h3>
          <span className="num">8</span>Outros tipos de navegador (visão geral)
        </h3>
        <p>
          Stack e Tabs cobrem a maioria dos apps, mas o React Navigation
          tem mais opções — vale saber que existem, mesmo sem entrar em
          detalhe agora:
        </p>
        <ul style={{ color: "var(--text-dim)", lineHeight: 1.8 }}>
          <li>
            <strong>Drawer Navigator</strong> — menu lateral que desliza
            (aquele ícone de "hambúrguer"), de <code>@react-navigation/drawer</code>;
          </li>
          <li>
            <strong>Material Top Tabs</strong> — abas no topo da tela, de{" "}
            <code>@react-navigation/material-top-tabs</code>;
          </li>
          <li>
            <strong>Navegadores aninhados</strong> — um Stack inteiro
            vivendo dentro de uma aba do Tab Navigator, por exemplo,
            comum quando uma aba precisa abrir sub-telas próprias.
          </li>
        </ul>
      </div>

      <div className="section">
        <h3>
          <span className="num">9</span>Prática
        </h3>
        <Callout type="pratica">
          Crie duas telas em <code>screens/</code>: <code>ListaScreen.tsx</code>{" "}
          (reaproveitando o <code>ListaProdutos</code> das Aulas 5 a 7) e{" "}
          <code>DetalheScreen.tsx</code>. Configure um Stack Navigator no{" "}
          <code>App.tsx</code> com as duas, tipado via{" "}
          <code>StackParamList</code>, onde <code>Detalhe</code> recebe um{" "}
          <code>produtoId: number</code>. Cada item da lista deve navegar
          pro Detalhe passando o id do produto tocado.
        </Callout>
      </div>

      <DocsBox
        links={[
          { label: "Getting Started", desc: "reactnavigation.org — instalação e primeiros passos", url: "https://reactnavigation.org/docs/getting-started" },
          { label: "Native Stack Navigator", desc: "reactnavigation.org — referência completa do Stack", url: "https://reactnavigation.org/docs/native-stack-navigator" },
          { label: "Passing Params", desc: "reactnavigation.org — todo o funcionamento de route.params", url: "https://reactnavigation.org/docs/params" },
          { label: "Bottom Tabs Navigator", desc: "reactnavigation.org — referência completa das abas", url: "https://reactnavigation.org/docs/bottom-tab-navigator" },
          { label: "TypeScript", desc: "reactnavigation.org — guia oficial de tipagem de navegação", url: "https://reactnavigation.org/docs/typescript" },
        ]}
      />

      <div className="aula-footer-nav">
        <button className="nav-btn" onClick={() => goTo("aula7")}>
          <span className="nb-label">← Anterior</span>
          Aula 7 · POST, PUT e DELETE
        </button>
        <button className="nav-btn right" onClick={() => goTo("aula9")}>
          <span className="nb-label">Próxima →</span>
          Aula 9 · Câmera e galeria
        </button>
      </div>
    </div>
  );
}
