import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Platform } from "react-native"; // Import Platform
import store from "./src/store/store";
import Login from "./src/pages/Login";
import Dashboard from "./src/pages/User/Dashboard";
import Visitor from "./src/pages/User/Visit";
import RegisterForm from "./src/pages/User/Register";
import JobDetail from "./src/pages/User/JobDetail";
import JobList from "./src/pages/User/JobList";
import Profile from "./src/pages/User/Profile";
import { colors } from "./src/constant/colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Cari") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Profil") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.DOMINAN_COLOR,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: styles.tabBarWithShadow, // Shadow pada tab bar
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={Dashboard} 
        options={{ 
          headerShown: false,
          title: "Home",
        }} 
      />
      <Tab.Screen 
        name="Cari" 
        component={JobList} 
        options={{ 
          headerShown: true,
          title: "Cari",
          headerTitle: "Daftar Pekerjaan",
          headerTitleAlign: "center",
          headerStyle: styles.headerWithShadow, // Shadow pada header
        }} 
      />
      <Tab.Screen 
        name="Profil" 
        component={Profile} 
        options={{ 
          headerShown: true,
          title: "Profil",
          headerTitle: "Profil Saya",
          headerTitleAlign: "center",
          headerStyle: styles.headerWithShadow, // Shadow pada header
        }} 
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarWithShadow: {
    height: 60,
    marginTop: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 5, // Efek bayangan untuk Android
  },
  headerWithShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 5, // Efek bayangan untuk Android
  },
});

const routerList = [
  { name: "login", component: Login, headerShown: false },
  { name: "dashboard", component: BottomTabs, headerShown: false },
  { name: "register", component: RegisterForm, headerShown: true },
  { name: "job-detail", component: JobDetail, headerShown: true },
  { name: "job-list", component: JobList, headerShown: true },
];

function App() {
  const [isSplashDone, setSplashDone] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setSplashDone(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isSplashDone) return null;

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {routerList.map((item, index) => (
            <Stack.Screen
              key={index}
              name={item.name}
              component={item.component}
              options={({ route }) => ({
                headerShown: item.headerShown,
                headerTitle: getHeaderTitle(route),
                headerTitleAlign: "center",
                headerStyle: styles.headerWithShadow, // Shadow pada semua header di routerList
              })}
            />
          ))}
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
      return "Daftar Pekerjaan";
    default:
      return route.name;
  }
}

export default App;
