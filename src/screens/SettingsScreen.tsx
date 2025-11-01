import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LogOut } from 'lucide-react-native';
import { useAuth } from '../contexts/AuthContext';

export default function SettingsScreen() {
  const { signOut, user } = useAuth();

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await signOut();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <View style={styles.content}>
        {user && (
          <View style={styles.userSection}>
            <Text style={styles.userLabel}>Signed in as</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        )}
        
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <LogOut size={20} color="#FF3B30" style={{ marginRight: 8 }} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 16,
  },
  placeholder: {
    fontSize: 16,
    color: '#8E8E93',
    fontFamily: 'Urbanist_300Light',
  },
  userSection: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  userLabel: {
    fontSize: 12,
    fontFamily: 'Urbanist_300Light',
    color: '#6B7280',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Urbanist_500Medium',
    color: '#374151',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  signOutText: {
    fontSize: 16,
    fontFamily: 'Urbanist_500Medium',
    color: '#FF3B30',
  },
});

