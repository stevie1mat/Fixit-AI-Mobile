import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.placeholder}>Settings screen coming soon...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 70,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Urbanist_600SemiBold',
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

