import React, { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, useRootNavigation } from 'expo-router';
import { BookmarksProvider } from '@/contexts/BookmarksContext';
import { CoinsProvider } from '@/contexts/CoinsContext';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const rootNavigation = useRootNavigation();

  useEffect(() => {
    if (rootNavigation?.isReady()) {
      // @ts-ignore - accessing internal state for debugging
      const routes = rootNavigation.getState().routeNames;
      console.log('All registered routes:', routes);
    }
  }, [rootNavigation?.isReady()]);

  return (
    <BookmarksProvider>
      <CoinsProvider>
        <Tabs
          screenOptions={({ route, navigation }) => ({
            tabBarActiveTintColor: '#23EBC3',
            tabBarLabelStyle: {
              fontFamily: 'DMSans-Medium',
              fontSize: 12,
              lineHeight: 16,
              letterSpacing: -0.3,
            },
            tabBarInactiveTintColor: '#8E8E93',
            headerShown: false,
            tabBarIcon: ({ color }) => {
              const iconName = route.name === 'index' ? 'home' : 'user';
              // Get the current route name
              const currentRoute = navigation.getState().routes[navigation.getState().index].name;

              // For the home icon
              if (route.name === 'index') {
                // Show as active if current route is not 'two'
                return <TabBarIcon name={iconName} color={currentRoute !== 'two' ? '#23EBC3' : '#8E8E93'} />;
              }

              // For the account icon
              if (route.name === 'two') {
                // Show as active only when 'two' is selected
                return <TabBarIcon name={iconName} color={currentRoute === 'two' ? '#23EBC3' : '#8E8E93'} />;
              }

              return <TabBarIcon name={iconName} color={color} />;
            },
          })}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
            }}
          />
          <Tabs.Screen
            name="two"
            options={{
              title: 'Account',
            }}
          />
          <Tabs.Screen
            name="crypto"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="exchange"
            options={{
              href: null,
            }}
          />
        </Tabs>
      </CoinsProvider>
    </BookmarksProvider>
  );
}
