import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  Modal,
} from 'react-native';
import {
  Settings,
  History,
  Store,
  Plus,
  Trash2,
  Sparkles,
  Zap,
  Link2,
  Shield,
  Brain,
} from 'lucide-react-native';
import { useAuth } from '../contexts/AuthContext';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (screen: string) => void;
}

export default function Drawer({ isOpen, onClose, onNavigate }: DrawerProps) {
  const { user } = useAuth();
  const slideAnim = React.useRef(new Animated.Value(-320)).current;

  React.useEffect(() => {
    if (isOpen) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -320,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen]);

  const handleNavigation = (screen: string) => {
    onNavigate?.(screen);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <Modal
        transparent
        visible={isOpen}
        animationType="none"
        onRequestClose={onClose}
      >
        <View style={styles.overlayContainer}>
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={onClose}
          />
          <Animated.View
            style={[
              styles.drawer,
              {
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            <View style={styles.drawerContent}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.headerLeft}>
                  <View style={styles.logoCircle}>
                    <Sparkles size={16} color="#FFF" />
                  </View>
                  <View>
                    <Text style={styles.headerTitle}>Fix It AI</Text>
                    <Text style={styles.headerSubtitle}>AI Assistant</Text>
                  </View>
                </View>
              </View>

              {/* Content */}
              <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Quick Actions */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Quick Actions</Text>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleNavigation('Connections')}
                    >
                      <Link2 size={16} color="#374151" style={styles.actionIcon} />
                      <Text style={styles.actionText}>Connect Store</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleNavigation('Settings')}
                    >
                      <Settings size={16} color="#374151" style={styles.actionIcon} />
                      <Text style={styles.actionText}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <History size={16} color="#374151" style={styles.actionIcon} />
                      <Text style={styles.actionText}>View Logs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Brain size={16} color="#374151" style={styles.actionIcon} />
                      <Text style={styles.actionText}>AI Training</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Store Connections */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Store Connections</Text>
                    <TouchableOpacity
                      onPress={() => handleNavigation('Connections')}
                      style={styles.addButton}
                    >
                      <Plus size={16} color="#374151" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.emptyState}>
                    <View style={styles.emptyIcon}>
                      <Store size={24} color="#9CA3AF" />
                    </View>
                    <Text style={styles.emptyText}>No stores connected yet.</Text>
                    <TouchableOpacity
                      style={styles.emptyButton}
                      onPress={() => handleNavigation('Connections')}
                    >
                      <Text style={styles.emptyButtonText}>Connect Your First Store</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>

              {/* Footer */}
              <View style={styles.footer}>
                <View style={styles.footerRow}>
                  <Zap size={12} color="#9CA3AF" style={{ marginRight: 6 }} />
                  <Text style={styles.footerText}>AI Powered</Text>
                </View>
                <Text style={styles.footerVersion}>Fix It AI v1.0.0</Text>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 300,
    height: '100%',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  drawerContent: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Urbanist_400Regular',
    color: '#111827',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    fontFamily: 'Urbanist_300Light',
    color: '#6B7280',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Urbanist_500Medium',
    color: '#111827',
    marginBottom: 16,
  },
  addButton: {
    padding: 4,
  },
  actionButtons: {
    // gap handled by marginBottom in actionButton
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 12,
  },
  actionIcon: {
    marginRight: 12,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Urbanist_300Light',
    color: '#374151',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Urbanist_300Light',
    color: '#6B7280',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
  },
  emptyButtonText: {
    fontSize: 12,
    fontFamily: 'Urbanist_300Light',
    color: '#374151',
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Urbanist_300Light',
    color: '#6B7280',
  },
  footerVersion: {
    fontSize: 12,
    fontFamily: 'Urbanist_300Light',
    color: '#6B7280',
  },
});

