import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ChatScreen from '../screens/ChatScreen';
import ConnectionsScreen from '../screens/ConnectionsScreen';
import SettingsScreen from '../screens/SettingsScreen';

type Screen = 'Chat' | 'Connections' | 'Settings';

export default function Navigation() {
  const [activeScreen, setActiveScreen] = useState<Screen>('Chat');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'Chat':
        return <ChatScreen />;
      case 'Connections':
        return <ConnectionsScreen />;
      case 'Settings':
        return <SettingsScreen />;
      default:
        return <ChatScreen />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeScreen === 'Chat' && styles.activeTab]}
          onPress={() => setActiveScreen('Chat')}
        >
          <Text style={styles.tabIcon}>💬</Text>
          <Text style={[styles.tabLabel, activeScreen === 'Chat' && styles.activeTabLabel]}>
            Chat
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeScreen === 'Connections' && styles.activeTab]}
          onPress={() => setActiveScreen('Connections')}
        >
          <Text style={styles.tabIcon}>🔗</Text>
          <Text style={[styles.tabLabel, activeScreen === 'Connections' && styles.activeTabLabel]}>
            Stores
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeScreen === 'Settings' && styles.activeTab]}
          onPress={() => setActiveScreen('Settings')}
        >
          <Text style={styles.tabIcon}>⚙️</Text>
          <Text style={[styles.tabLabel, activeScreen === 'Settings' && styles.activeTabLabel]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingBottom: 20,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    // Add active state styling if needed
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  activeTabLabel: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
