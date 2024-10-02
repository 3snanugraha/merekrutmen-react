import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./src/store/store";
import Login from "./src/pages/Login";
import Dashboard from "./src/pages/User/Dashboard";
import Infomation from "./src/pages/User/Information";
import Integration from "./src/pages/User/Integrasi";
import Complaint from "./src/pages/User/Complaint";
import Visitor from "./src/pages/User/Visit";
import RegisterForm from "./src/pages/User/Register";
import Pengumuman from "./src/pages/User/Information/Pengumuman";
import Titipan from "./src/pages/User/Titipan";
import Alur from "./src/pages/User/Information/Alur";
import Kunjungan from "./src/pages/User/Information/Kunjungan";
import Berhak from "./src/pages/User/Integrasi/Berhak";
import Bebas from "./src/pages/User/Integrasi/Bebas";
import UnduhSyarat from "./src/pages/User/Integrasi/UnduhSyarat";

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
    name: "information",
    component: Infomation,
    headerShown: true,
  },
  {
    name: "integration",
    component: Integration,
    headerShown: true,
  },
  {
    name: "complaint",
    component: Complaint,
    headerShown: true,
  },
  {
    name: "register",
    component: RegisterForm,
    headerShown: true,
  },
  {
    name: "information-pengumuman",
    component: Pengumuman,
    headerShown: true,
  },
  {
    name: "information-alur",
    component: Alur,
    headerShown: true,
  },
  {
    name: "information-kunjungan",
    component: Kunjungan,
    headerShown: true,
  },
  {
    name: "titipan",
    component: Titipan,
    headerShown: true,
  },
  {
    name: "berhak",
    component: Berhak,
    headerShown: true,
  },
  {
    name: "bebas",
    component: Bebas,
    headerShown: true,
  },
  {
    name: "unduh-syarat",
    component: UnduhSyarat,
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
                initialParams={{ isSuccess: false }}
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
    case "information":
      return "Informasi";
    case "integration":
      return "Integrasi";
    case "complaint":
      return "Keluhan";
    case "register":
      return "Registrasi";
    case "information-pengumuman":
      return "Pengumuman";
      case "titipan":
        return "Titipan Barang";
    case "information-kunjungan":
      return "Layanan Kunjungan";
    case "information-alur":
      return "Alur Integrasi WBP";
    case "bebas":
      return "Daftar WBP Bebas";
    case "berhak":
      return "Daftar WBP Berhak";
    case "unduh-syarat":
        return "Unduh Syarat PB/CB";
    default:
      return route.name; // Gunakan nama layar jika tidak ada yang cocok
  }
}

export default App;
