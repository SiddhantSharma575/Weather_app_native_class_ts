import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './screens/Home';
import Search from './screens/Search';
import Country from './screens/Country';


class App extends React.Component {
  render(): React.ReactNode {
    const Tab = createBottomTabNavigator();
    return(
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#00aaff" />
        <NavigationContainer>
          <Tab.Navigator
               screenOptions={({ route }) => ({
                  tabBarIcon: ({ color }) => {
                     let iconName : string = "";
                     if (route.name === 'home') {
                        iconName = 'home-city-outline'
                     } else if (route.name === 'search') {
                        iconName = 'city'
                     } else if (route.name === "country") {
                        iconName = 'flag-outline'
                     }
                     return (
                        <MaterialCommunityIcons
                           name={iconName}
                           size={25}
                           color={color}
                        />
                     )
                  },
               })}
               // tabBarOptions={{
               //    activeTintColor: 'white',
               //    inactiveTintColor: 'gray',
               //    activeBackgroundColor: '#00aaff',
               //    inactiveBackgroundColor: '#00aaff',
               // }}
               >
               <Tab.Screen
                  name="country"
                  component={Country}
                  options={{ headerShown: false }}
               />
               <Tab.Screen
                  name="home"
                  component={Home}
                  options={{ headerShown: false }}
                  initialParams={{ city: 'indore' }}
               />
               <Tab.Screen
                  name="search"
                  component={Search}
                  options={{ headerShown: false }}
               />
            </Tab.Navigator>
        </NavigationContainer>
      </>
    )
  }
}


export default App

const styles = StyleSheet.create({})