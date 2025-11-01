import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu } from 'lucide-react-native';
import Drawer from '../components/Drawer';

interface ChatScreenProps {
  onNavigate?: (screen: string) => void;
}

export default function ChatScreen({ onNavigate }: ChatScreenProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setDrawerOpen(true)}
        >
          <Menu size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Chat</Text>
        <View style={styles.menuButton} />
      </View>
      <View style={styles.content}>
        <Text style={styles.placeholder}>Chat screen coming soon...</Text>
      </View>
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={onNavigate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Urbanist_600SemiBold',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  placeholder: {
    fontSize: 16,
    color: '#8E8E93',
    fontFamily: 'Urbanist_300Light',
  },
});

