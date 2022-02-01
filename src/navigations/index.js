import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import routes from '../config/routes';

const Stack = createStackNavigator();

// Auth Stack
import Login from '../screens/auth';
import Register from '../screens/auth/register';

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name={routes.Login} component={Login} />
        <Stack.Screen name={routes.Register} component={Register} />
    </Stack.Navigator>
  );
}

// Dashboard Stack
import Dashboard from '../screens/dashboard';
import AddBusiness from '../screens/dashboard/add-business';
import EditBusiness from '../screens/dashboard/edit-business';

function DashboardStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name={routes.Dashboard} component={Dashboard} />
        <Stack.Screen name={routes.AddBusiness} component={AddBusiness} />
        <Stack.Screen name={routes.EditBusiness} component={EditBusiness} />
    </Stack.Navigator>
  );
}

// Home Stack
import Home from '../screens/home';
import Categories from '../screens/see-all/categories';
import Business from '../screens/see-all/business';
import OneBusiness from '../screens/see-all/one-business';

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name={routes.Home} component={Home} />
        <Stack.Screen name={routes.Categories} component={Categories} />
        <Stack.Screen name={routes.Business} component={Business} />
        <Stack.Screen name={routes.OneBusiness} component={OneBusiness} />
    </Stack.Navigator>
  );
}

// MAin Stack

import AuthContext from '../context/auth-context';
import Splash from '../screens/splash/index';

function MainStack() {
  const {state} = React.useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
        {state.isLoading ?
          <Stack.Screen name={routes.Splash} component={Splash} />
        : state.userToken == null ?
          <>
            <Stack.Screen name={routes.HomeStack} component={HomeStack} />
            <Stack.Screen name={routes.AuthStack} component={AuthStack} />
          </>
        :
          <Stack.Screen name={routes.DashboardStack} component={DashboardStack} />
        }
    </Stack.Navigator>
    
  );
}

function RootNavigator() {
  return (
    <NavigationContainer>
      <MainStack/>
    </NavigationContainer>
  );
}

export default RootNavigator;
