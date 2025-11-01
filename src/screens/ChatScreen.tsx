import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Menu,
  Send,
  Sparkles,
  User,
  Zap,
  Trash2,
  Settings,
} from 'lucide-react-native';
import Markdown from 'react-native-markdown-display';
import Drawer from '../components/Drawer';
import { useChat } from '../store/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import { sendChatMessage } from '../services/api';

interface ChatScreenProps {
  onNavigate?: (screen: string) => void;
}

export default function ChatScreen({ onNavigate }: ChatScreenProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const { messages, isLoading, addMessage, updateLastMessage, setLoading, clearMessages } = useChat();
  const { user } = useAuth();

  const scrollToBottom = () => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Scroll to top when messages are cleared
  useEffect(() => {
    if (messages.length === 0) {
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
    }
  }, [messages.length]);

  const handleSubmit = async () => {
    if (!input.trim() || isSubmitting) return;

    const userMessage = input.trim();
    setInput('');
    setIsSubmitting(true);
    setLoading(true);

    // Add user message
    addMessage({
      role: 'user',
      content: userMessage,
    });

    try {
      let assistantMessage = '';
      
      // Add initial assistant message
      addMessage({
        role: 'assistant',
        content: '',
      });

      // Send message and stream response
      await sendChatMessage(
        userMessage,
        user?.id,
        (chunk: string) => {
          assistantMessage += chunk;
          updateLastMessage(assistantMessage);
        }
      );
    } catch (error) {
      console.error('Error sending message:', error);
      updateLastMessage('Sorry, I encountered an error. Please try again.');
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const handleClearMessages = () => {
    Alert.alert(
      'Clear Chat',
      'Are you sure you want to clear all messages? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: clearMessages,
        },
      ]
    );
  };

  const quickPrompts = [
    'Make all discounted products show a red badge',
    'Fix my homepage SEO basics',
    'Speed up my WordPress homepage',
    'Exclude discounted items from free shipping in Canada',
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setDrawerOpen(true)}
          >
            <Menu size={20} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <View style={styles.headerLogo}>
              <Sparkles size={16} color="#FFF" />
            </View>
            <View>
              <Text style={styles.headerTitle}>AI Assistant</Text>
              <Text style={styles.headerSubtitle}>No stores connected</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            {messages.length > 0 && (
              <TouchableOpacity onPress={handleClearMessages} style={styles.clearButton}>
                <Trash2 size={18} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
          scrollsToTop={true}
          contentInsetAdjustmentBehavior="automatic"
        >
          {messages.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyLogo}>
                <Sparkles size={32} color="#FFF" />
              </View>
              <Text style={styles.emptyTitle}>Welcome to Fix It AI</Text>
              <Text style={styles.emptySubtitle}>
                I can help you optimize and fix issues in your e-commerce stores. Try asking me something like:
              </Text>

              <View style={styles.quickPrompts}>
                {quickPrompts.map((prompt, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.quickPromptButton}
                    onPress={() => setInput(prompt)}
                  >
                    <View style={styles.promptNumber}>
                      <Text style={styles.promptNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.promptText}>{prompt}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.quickTips}>
                <View style={styles.quickTipsHeader}>
                  <Settings size={20} color="#6B7280" />
                  <Text style={styles.quickTipsTitle}>Quick Tips</Text>
                </View>
                <View style={styles.tipsGrid}>
                  <View style={styles.tipItem}>
                    <View style={[styles.tipIcon, { backgroundColor: '#D1FAE5' }]}>
                      <Text style={[styles.tipIconText, { color: '#059669' }]}>✓</Text>
                    </View>
                    <Text style={styles.tipText}>Be specific</Text>
                  </View>
                  <View style={styles.tipItem}>
                    <View style={[styles.tipIcon, { backgroundColor: '#DBEAFE' }]}>
                      <Text style={[styles.tipIconText, { color: '#2563EB' }]}>⚡</Text>
                    </View>
                    <Text style={styles.tipText}>Real-time fixes</Text>
                  </View>
                  <View style={styles.tipItem}>
                    <View style={[styles.tipIcon, { backgroundColor: '#E9D5FF' }]}>
                      <Text style={[styles.tipIconText, { color: '#7C3AED' }]}>🔒</Text>
                    </View>
                    <Text style={styles.tipText}>Secure & safe</Text>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <>
              {messages.map((message) => (
                <View
                  key={message.id}
                  style={[
                    styles.messageContainer,
                    message.role === 'user' ? styles.userMessageContainer : styles.assistantMessageContainer,
                  ]}
                >
                  {message.role === 'assistant' && (
                    <View style={styles.assistantAvatar}>
                      <Sparkles size={20} color="#FFF" />
                    </View>
                  )}
                  
                  <View
                    style={[
                      styles.messageBubble,
                      message.role === 'user' ? styles.userBubble : styles.assistantBubble,
                    ]}
                  >
                    {message.role === 'assistant' ? (
                      <Markdown
                        style={{
                          body: styles.markdownBody,
                          paragraph: styles.markdownParagraph,
                          strong: styles.markdownStrong,
                          code: styles.markdownCode,
                          link: styles.markdownLink,
                        }}
                      >
                        {message.content}
                      </Markdown>
                    ) : (
                      <Text style={styles.userMessageText}>{message.content}</Text>
                    )}
                    <Text
                      style={[
                        styles.messageTime,
                        message.role === 'user' ? styles.userMessageTime : styles.assistantMessageTime,
                      ]}
                    >
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </View>

                  {message.role === 'user' && (
                    <View style={styles.userAvatar}>
                      <User size={20} color="#6B7280" />
                    </View>
                  )}
                </View>
              ))}
              
              {isLoading && (
                <View style={styles.loadingContainer}>
                  <View style={styles.assistantAvatar}>
                    <Sparkles size={20} color="#FFF" />
                  </View>
                  <View style={styles.loadingBubble}>
                    <ActivityIndicator size="small" color="#9CA3AF" style={{ marginRight: 12 }} />
                    <Text style={styles.loadingText}>AI is thinking...</Text>
                  </View>
                </View>
              )}
            </>
          )}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Describe what you want to fix or optimize..."
              placeholderTextColor="#9CA3AF"
              value={input}
              onChangeText={setInput}
              multiline
              maxLength={1000}
              editable={!isSubmitting}
            />
            {input.length > 0 && (
              <Text style={styles.charCount}>{input.length}</Text>
            )}
          </View>
          <TouchableOpacity
            style={[styles.sendButton, (!input.trim() || isSubmitting) && styles.sendButtonDisabled]}
            onPress={handleSubmit}
            disabled={!input.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Send size={20} color="#FFF" />
            )}
          </TouchableOpacity>
        </View>

        <Drawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onNavigate={onNavigate}
        />
      </View>
    </KeyboardAvoidingView>
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
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  headerLogo: {
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
    fontSize: 14,
    fontFamily: 'Urbanist_300Light',
    color: '#6B7280',
  },
  headerRight: {
    width: 40,
    alignItems: 'flex-end',
  },
  clearButton: {
    padding: 4,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 24,
    paddingBottom: 140,
    flexGrow: 1,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'flex-end',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  assistantMessageContainer: {
    justifyContent: 'flex-start',
  },
  assistantAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  userBubble: {
    backgroundColor: '#000',
  },
  assistantBubble: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  userMessageText: {
    fontSize: 14,
    fontFamily: 'Urbanist_300Light',
    color: '#FFF',
    lineHeight: 20,
  },
  markdownBody: {
    fontSize: 14,
    fontFamily: 'Urbanist_300Light',
    color: '#374151',
  },
  markdownParagraph: {
    marginBottom: 8,
  },
  markdownStrong: {
    fontFamily: 'Urbanist_500Medium',
    color: '#111827',
  },
  markdownCode: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    fontFamily: 'JetBrainsMono_400Regular',
    color: '#111827',
  },
  markdownLink: {
    color: '#111827',
    textDecorationLine: 'underline',
  },
  messageTime: {
    fontSize: 11,
    fontFamily: 'Urbanist_300Light',
    marginTop: 8,
  },
  userMessageTime: {
    color: '#D1D5DB',
  },
  assistantMessageTime: {
    color: '#9CA3AF',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  loadingBubble: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    fontFamily: 'Urbanist_300Light',
    color: '#6B7280',
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 20,
    width: '100%',
  },
  emptyLogo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: 'Urbanist_400Regular',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    fontFamily: 'Urbanist_300Light',
    color: '#6B7280',
    marginBottom: 32,
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 24,
  },
  quickPrompts: {
    width: '100%',
    marginBottom: 32,
  },
  quickPromptButton: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    marginBottom: 12,
  },
  promptNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  promptNumberText: {
    fontSize: 12,
    fontFamily: 'Urbanist_500Medium',
    color: '#6B7280',
  },
  promptText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Urbanist_300Light',
    color: '#374151',
    lineHeight: 20,
  },
  quickTips: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 24,
    width: '100%',
  },
  quickTipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  quickTipsTitle: {
    fontSize: 14,
    fontFamily: 'Urbanist_300Light',
    color: '#6B7280',
    marginLeft: 8,
  },
  tipsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tipItem: {
    alignItems: 'center',
  },
  tipIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipIconText: {
    fontSize: 14,
  },
  tipText: {
    fontSize: 12,
    fontFamily: 'Urbanist_300Light',
    color: '#6B7280',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 12,
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  inputWrapper: {
    flex: 1,
    marginRight: 12,
    position: 'relative',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: 'Urbanist_300Light',
    color: '#000',
    maxHeight: 100,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  charCount: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    fontSize: 11,
    fontFamily: 'Urbanist_300Light',
    color: '#9CA3AF',
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
