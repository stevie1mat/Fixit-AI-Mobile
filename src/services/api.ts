import { supabase } from '../lib/supabase';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://fixit-ai-agent.vercel.app';

export async function sendChatMessage(
  message: string,
  userId: string | undefined,
  onChunk?: (chunk: string) => void
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      storeData: { connections: [] }, // TODO: Get from store connections
      userId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('No response body');
  }

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    buffer += chunk;
    
    // Call onChunk for each chunk as it arrives (for streaming effect)
    if (chunk) {
      onChunk?.(chunk);
    }
  }

  // Process any remaining buffer
  if (buffer) {
    onChunk?.(buffer);
  }
}

