import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventListScreen from '../screens/EventListScreen';
import AddEventScreen from '../screens/AddEventScreen';
import EditEventScreen from '../screens/EditEventScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Events') {
            iconName = focused ? 'event' : 'event-outline';
          } else if (route.name === 'Add') {
            iconName = 'add-circle';
          }

          return <Icon name={iconName as string} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#e5e7eb',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Events" 
        component={EventListScreen}
        options={{ tabBarLabel: 'Events' }}
      />
      <Tab.Screen 
        name="Add" 
        component={AddEventScreen}
        options={{ tabBarLabel: 'Add' }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen 
        name="EditEvent" 
        component={EditEventScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="AddEvent" 
        component={AddEventScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;