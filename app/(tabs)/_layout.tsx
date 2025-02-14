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
          screenOptions={{
            tabBarActiveTintColor: '#23EBC3',
            tabBarLabelStyle: {
              fontFamily: 'DMSans-Medium',
              fontSize: 12,
              lineHeight: 16,
              letterSpacing: -0.3,
            },
            tabBarInactiveTintColor: '#8E8E93',
            headerShown: false,
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            }}
          />
          <Tabs.Screen
            name="two"
            options={{
              title: 'Account',
              tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
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
