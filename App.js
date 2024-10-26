import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./src/store/store";
import Login from "./src/pages/Login";
import Dashboard from "./src/pages/User/Dashboard";
import Visitor from "./src/pages/User/Visit";
import RegisterForm from "./src/pages/User/Register";
import JobDetail from "./src/pages/User/JobDetail";
import JobList from "./src/pages/User/JobList"; // Import halaman Job List

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
    name: "job-detail",
    component: JobDetail,
    headerShown: true,
  },
  {
    name: "job-list", // Tambahkan route baru untuk Job List
    component: JobList,
    headerShown: true,
  }
];

const Stack = createNativeStackNavigator();

function App() {
  const [isSplashDone, setSplashDone] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setSplashDone(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isSplashDone) {
    return null; 
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
  switch (route.name) {
    case "visit":
      return "Kunjungan";
    case "register":
      return "Registrasi";
    case "job-detail":
      return "Detail Pekerjaan";
    case "job-list":
      return "Daftar Pekerjaan"; // Judul untuk halaman Job List
    default:
      return route.name;
  }
}

export default App;
