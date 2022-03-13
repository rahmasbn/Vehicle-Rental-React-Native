/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Login from './screens/Login';
import Register from './screens/Register';
import ForgotPass from './screens/ForgotPassword';
import Home from './screens/Home';
import Search from './screens/Search';
import Chat from './screens/Chat';
import Profile from './screens/Profile';
import History from './screens/History';
import Detail from './screens/VehicleDetail';
import Category from './screens/VehicleType';
import Popular from './screens/VehicleType/Popular';
import UpdateProfile from './screens/Profile/UpdateProfile';
import UpdatePassword from './screens/Profile/UpdatePassword';
import FirstStep from './screens/Payment';
import SecondStep from './screens/Payment/Second';
import ThirdStep from './screens/Payment/Third';
import DetailHistory from './screens/History/Detail';
import AddVehicle from './screens/AddVehicle';
import RoomChat from './screens/Chat/RoomChat';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Top = createMaterialTopTabNavigator();

const Screens = () => (
  <Top.Navigator
    initialRouteName="Chat"
    screenOptions={{
      tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'},
      tabBarIndicatorStyle: {backgroundColor: '#ffcd61'},
      tabBarPressColor: '#ffcd61',
    }}>
    <Top.Screen name="Chat" component={Chat} />
    <Top.Screen
      options={{
        title: 'History Order',
      }}
      name="History"
      component={History}
    />
  </Top.Navigator>
);

const BottomTab = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        height: 60,
      },
    }}>
    <Tab.Screen
      options={{
        tabBarIcon: ({focused}) => (
          <View>
            <Image
              source={require('./assets/icons/Home.png')}
              resizeMode="cover"
              style={{
                width: 50,
                height: 50,
                tintColor: focused && '#ffcd61',
              }}
            />
          </View>
        ),
        tabBarActiveBackgroundColor: '#f5f5f5',
      }}
      name="Home"
      component={Home}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({focused}) => (
          <View>
            <Image
              source={require('./assets/icons/search.png')}
              resizeMode="cover"
              style={{
                width: 45,
                height: 45,
                tintColor: focused && '#ffcd61',
              }}
            />
          </View>
        ),
        tabBarActiveBackgroundColor: '#f5f5f5',
      }}
      name="Search"
      component={Search}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({focused}) => (
          <View>
            <Image
              source={require('./assets/icons/notes.png')}
              resizeMode="cover"
              style={{
                width: 30,
                height: 30,
                tintColor: focused && '#ffcd61',
              }}
            />
          </View>
        ),
        tabBarActiveBackgroundColor: '#f5f5f5',
      }}
      name="Screens"
      component={Screens}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({focused}) => (
          <View>
            <Image
              source={require('./assets/icons/User.png')}
              resizeMode="cover"
              style={{
                width: 45,
                height: 45,
                tintColor: focused && '#ffcd61',
              }}
            />
          </View>
        ),
        tabBarActiveBackgroundColor: '#f5f5f5',
      }}
      name="Profile"
      component={Profile}
    />
  </Tab.Navigator>
);

const HeaderDetail = () => {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        right: 30,
        top: 20,
      }}>
      <Image
        style={{width: 20, height: 20}}
        source={require('./assets/icons/love.png')}
      />
    </TouchableOpacity>
  );
};

// const AddHeader = () => {
//   return (
//     <TouchableOpacity>
//       <Text style={{color: 'gray', fontSize: 15}}>Cancel</Text>
//     </TouchableOpacity>
//   );
// };

const Router = () => (
  <Stack.Navigator initialRouteName="Content">
    <Stack.Screen
      name="Login"
      component={Login}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Register"
      component={Register}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="ForgotPass"
      component={ForgotPass}
      options={{
        title: 'Back',
        headerTransparent: true,
        headerTintColor: '#fff',
      }}
    />
    <Stack.Screen
      name="Content"
      component={BottomTab}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Category"
      component={Category}
      options={({route}) => ({title: route.params.type})}
    />
    <Stack.Screen
      name="Popular"
      component={Popular}
      options={({route}) => ({title: route.params.type})}
    />
    <Stack.Screen
      name="Detail"
      component={Detail}
      options={{
        title: '',
        headerTransparent: true,
        headerTintColor: '#fff',
        headerRight: () => <HeaderDetail />,
        headerRightContainerStyle: {paddingRight: 30},
      }}
    />
    <Stack.Screen
      name="UpdateProfile"
      component={UpdateProfile}
      options={{
        title: 'Update Profile',
      }}
    />
    <Stack.Screen
      name="UpdatePass"
      component={UpdatePassword}
      options={{
        title: 'Update Password',
      }}
    />
    <Stack.Screen
      name="FirstStep"
      component={FirstStep}
      options={{
        title: 'Payment',
      }}
    />
    <Stack.Screen
      name="SecondStep"
      component={SecondStep}
      options={{
        title: 'Payment',
      }}
    />
    <Stack.Screen
      name="ThirdStep"
      component={ThirdStep}
      options={{
        title: 'Payment',
      }}
    />
    <Stack.Screen
      name="DetailHistory"
      component={DetailHistory}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="AddVehicle"
      component={AddVehicle}
      options={{
        // title: 'Add new item',
        // headerTransparent: true,
        // headerRight: () => <AddHeader />,
        // headerRightContainerStyle: {paddingRight: 15},
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="RoomChat"
      component={RoomChat}
      options={{
        title: 'Vespa Rental Jogja',
      }}
    />
  </Stack.Navigator>
);

export default Router;
