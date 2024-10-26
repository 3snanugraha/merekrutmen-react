import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./src/store/store";
import Login from "./src/pages/Login";
import Dashboard from "./src/pages/User/Dashboard";
import Visitor from "./src/pages/User/Visit";
import RegisterForm from "./src/pages/User/Register";
import JobDetail from "./src/pages/User/JobDetail"; // Import halaman Job Detail

const routerList = [
  {
    name: "login",
    component: Login,
    headerShown: false,
  },
  {
    name: "dashboard",
    component: Dashboard,
    headerShown: false,
  },
  {
    name: "visit",
    component: Visitor,
    headerShown: true,
  },
  {
    name: "register",
    component: RegisterForm,
    headerShown: true,
  },
  {
    name: "job-detail", // Tambahkan route baru untuk Job Detail
    component: JobDetail,
    headerShown: true,
  }
];

const Stack = createNativeStackNavigator();

function App() {
  const [isSplashDone, setSplashDone] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setSplashDone(true);
    }, 3000); // Set timeout 3000ms (3 detik)

    return () => clearTimeout(timer);
  }, []);

  if (!isSplashDone) {
    return null; // Menampilkan splash screen yang sudah dikonfigurasi di app.json
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {routerList.map((item, index) => {
            return (
              <Stack.Screen
                key={index}
                name={item.name}
                component={item.component}
                options={({ route }) => ({
                  headerShown: item.headerShown,
                  headerTitle: getHeaderTitle(route),
                  headerTitleAlign: "center"
                })}
              />
            );
          })}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

function getHeaderTitle(route) {
  // Ubah judul header sesuai dengan nama layar
  switch (route.name) {
    case "visit":
      return "Kunjungan";
    case "register":
      return "Registrasi";
    case "job-detail":
      return "Detail Pekerjaan"; // Judul untuk halaman Job Detail
    default:
      return route.name; // Gunakan nama layar jika tidak ada yang cocok
  }
}

export default App;
