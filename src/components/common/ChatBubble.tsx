'use client';

import ChatBubbleIcon from '@/components/svgs/ChatBubbleIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  ExpandableChat,
  ExpandableChatBody,
  ExpandableChatFooter,
  ExpandableChatHeader,
} from '@/components/ui/expandable-chat';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatSuggestions } from '@/config/ChatPrompt';
import { heroConfig } from '@/config/Hero';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import SendIcon from '../svgs/SendIcon';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
  isStreaming?: boolean;
}

const FAST_PATH_RESPONSES: Record<string, string> = {
  'Tell me about your AI work at Searce':
    'At Searce, I engineer production-grade Agentic AI systems and enterprise RAG pipelines using Google ADK, LangGraph, Vertex AI, and Gemini. I specialize in building deterministic multi-agent workflows with automated guardrails and DeepEval evaluation benchmarks.',
  'What is your experience with LangGraph & Google ADK?':
    'I design stateful, multi-agent architectures using LangGraph for complex cyclical flows and human-in-the-loop validation, combined with Google Agent Development Kit (ADK) and Vertex AI Extensions to ground models directly on enterprise data stores.',
  'What verified certifications do you hold?':
    'I hold 4 verified cloud and AI engineering credentials:\n\n* **Google Cloud Professional Machine Learning Engineer (PMLE)**\n* **Anthropic Claude Code Architect Foundation (CCAF)**\n* **Google Cloud Associate Cloud Engineer (ACE)**\n* **AWS Certified Cloud Practitioner (CLF-C02)**\n\nAll verified Credly badges are linked right on my Hero banner!',
  'How can I get in touch with you?':
    "Awesome! I'd love to connect. You can reach me directly via email, phone (+91 9597315323), or LinkedIn below: [SHOW_CONTACT_OPTIONS]",
};

const getInitialMessages = (): Message[] => [
  {
    id: 1,
    text: "Hey! Feel free to ask me anything about my projects, architectures, or experience.",
    sender: 'bot',
    timestamp: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  },
];

const ChatBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<Message[]>([]);
  const { triggerHaptic, isMobile } = useHapticFeedback();

  // Keep messagesRef updated
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Initialize messages once on mount
  useEffect(() => {
    setMessages(getInitialMessages());
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]',
      );
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const sendMessage = useCallback(
    async (messageText: string, botMessageId: number) => {
      try {
        // Prepare conversation history for Gemini API format using messagesRef to avoid staleness
        const history = messagesRef.current.slice(-10).map((msg) => ({
          role: msg.sender === 'user' ? ('user' as const) : ('model' as const),
          parts: [{ text: msg.text }],
        }));

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: messageText,
            history,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error('No reader available');
        }

        let accumulatedText = '';
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('data: ')) {
              try {
                const data = JSON.parse(trimmed.slice(6));

                if (data.error) {
                  throw new Error(data.error);
                }

                if (data.text) {
                  accumulatedText += data.text;
                  const textToSet = accumulatedText;

                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === botMessageId
                        ? { ...msg, text: textToSet, isStreaming: true }
                        : msg,
                    ),
                  );
                }

                if (data.done) {
                  // Finalize the message
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === botMessageId
                        ? { ...msg, text: accumulatedText, isStreaming: false }
                        : msg,
                    ),
                  );
                  break;
                }
              } catch {
                continue;
              }
            }
          }
        }
      } catch (error) {
        console.error('Error sending message:', error);

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId
              ? {
                ...msg,
                text: "I'm sorry, I'm having trouble responding right now. Please try again later.",
                isStreaming: false,
              }
              : msg,
          ),
        );
      } finally {
        setIsLoading(false);
        setNewMessage('');
      }
    },
    [],
  );

  const streamFastPath = useCallback((reply: string, botMessageId: number) => {
    let currentWordIndex = 0;
    const words = reply.split(' ');
    const chunkSize = 3; // words per interval for natural, instant streaming

    const timer = setInterval(() => {
      currentWordIndex += chunkSize;
      const isComplete = currentWordIndex >= words.length;
      const displayText = isComplete ? reply : words.slice(0, currentWordIndex).join(' ');

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? { ...msg, text: displayText, isStreaming: !isComplete }
            : msg,
        ),
      );

      if (isComplete) {
        clearInterval(timer);
        setIsLoading(false);
      }
    }, 20);
  }, []);

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      // Trigger haptic feedback on mobile devices
      if (isMobile()) {
        triggerHaptic('selection');
      }

      setNewMessage('');
      // Auto-send the suggestion
      const userMessage: Message = {
        id: Date.now(),
        text: suggestion,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      // Create a temporary bot message for streaming
      const botMessageId = Date.now() + 1;
      const botMessage: Message = {
        id: botMessageId,
        text: '',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isStreaming: true,
      };

      setMessages((prev) => [...prev, botMessage]);

      // Check sub-millisecond fast-path cache first
      const fastPathReply = FAST_PATH_RESPONSES[suggestion];
      if (fastPathReply) {
        streamFastPath(fastPathReply, botMessageId);
      } else {
        // Fallback to real-time Gemini streaming
        sendMessage(suggestion, botMessageId);
      }
    },
    [isMobile, triggerHaptic, sendMessage, streamFastPath],
  );

  // Listen to 'open-chat' custom event from AskLink or other components
  useEffect(() => {
    const handleOpenChat = (event: Event) => {
      const customEvent = event as CustomEvent<{
        text?: string;
        autoSend?: boolean;
      }>;
      setIsOpen(true);

      if (customEvent.detail?.text) {
        const queryText = customEvent.detail.text.trim();
        if (!queryText) return;

        if (customEvent.detail.autoSend !== false) {
          // Send automatically
          setTimeout(() => {
            handleSuggestionClick(queryText);
          }, 150);
        } else {
          setNewMessage(queryText);
        }
      }
    };

    window.addEventListener('open-chat', handleOpenChat as EventListener);
    return () => {
      window.removeEventListener('open-chat', handleOpenChat as EventListener);
    };
  }, [handleSuggestionClick]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isLoading) return;

    // Trigger haptic feedback on mobile devices
    if (isMobile()) {
      triggerHaptic('light');
    }

    const messageText = newMessage.trim();
    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    // Create a temporary bot message for streaming
    const botMessageId = Date.now() + 1;
    const botMessage: Message = {
      id: botMessageId,
      text: '',
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, botMessage]);

    // Send the message using the refactored function
    await sendMessage(messageText, botMessageId);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <ExpandableChat
      position="bottom-right"
      size="md"
      open={isOpen}
      onOpenChange={setIsOpen}
      icon={<ChatBubbleIcon className="h-6 w-6" />}
    >
      <ExpandableChatHeader className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="border-primary h-8 w-8 border-2 bg-blue-300 dark:bg-yellow-300">
            <AvatarImage src="/assets/logo.png" alt={heroConfig.name} />
            <AvatarFallback>{heroConfig.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-semibold">
              {heroConfig.name}
            </h3>
            <div className="text-muted-foreground text-xs">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                Online
              </div>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-muted"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close chat</span>
        </Button>
      </ExpandableChatHeader>

      <ExpandableChatBody>
        <ScrollArea ref={scrollAreaRef} className="h-full p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex w-max max-w-xs flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                  message.sender === 'user'
                    ? 'text-secondary bg-muted ml-auto'
                    : 'bg-muted',
                )}
              >
                <div className="flex items-start space-x-2">
                  {message.sender === 'bot' && (
                    <Avatar className="border-primary h-6 w-6 border-2 bg-blue-300 dark:bg-yellow-300">
                      <AvatarImage src="/assets/logo.png" alt={heroConfig.name} />
                      <AvatarFallback>{heroConfig.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="max-w-xs flex-1 md:max-w-sm">
                    <div className="flex items-center gap-2">
                      <div className="prose prose-sm dark:prose-invert max-w-none flex-1">
                        {message.text ? (
                          message.text.includes('[SHOW_CONTACT_OPTIONS]') ? (
                            <div className="flex flex-col gap-2 mt-1 font-sans not-prose">
                              <p className="text-[13px] text-foreground mb-0.5 leading-snug">
                                {message.text.replace('[SHOW_CONTACT_OPTIONS]', '').trim() ||
                                  "Let's connect! Reach me via:"}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                <a href="mailto:asachin2318@gmail.com" target="_blank" rel="noreferrer" className="bg-emerald-900/30 hover:bg-emerald-800/60 border border-emerald-500/40 text-emerald-100 px-2.5 py-1.5 rounded text-[11px] font-bold flex items-center justify-center transition-colors shadow-sm no-underline">✉️ Email</a>
                                <a href="https://www.linkedin.com/in/k-sachin01/" target="_blank" rel="noreferrer" className="bg-blue-900/30 hover:bg-blue-800/60 border border-blue-500/40 text-blue-100 px-2.5 py-1.5 rounded text-[11px] font-bold flex items-center justify-center transition-colors shadow-sm no-underline">🔗 LinkedIn</a>
                                <a href="https://wa.me/919597315323?text=Hi%20Sachin,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!" target="_blank" rel="noreferrer" className="bg-green-900/30 hover:bg-green-800/60 border border-green-500/40 text-green-100 px-2.5 py-1.5 rounded text-[11px] font-bold flex items-center justify-center transition-colors shadow-sm no-underline">💬 WhatsApp</a>
                                <Link href="/contact" className="bg-sky-900/30 hover:bg-sky-800/60 border border-sky-500/40 text-sky-100 px-2.5 py-1.5 rounded text-[11px] font-bold flex items-center justify-center transition-colors shadow-sm cursor-pointer no-underline">📝 Contact Form</Link>
                              </div>
                            </div>
                          ) : (
                            <ReactMarkdown
                              components={{
                                a: (props) => (
                                  <a
                                    {...props}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="break-words text-cyan-400 font-semibold underline hover:text-cyan-300 transition-colors"
                                  />
                                ),
                                // Custom paragraph component to remove default margins
                                p: (props) => (
                                  <p {...props} className="m-0 leading-relaxed" />
                                ),
                                // Custom list components
                                ul: (props) => (
                                  <ul {...props} className="m-0 pl-5 space-y-1" />
                                ),
                                ol: (props) => (
                                  <ol {...props} className="m-0 pl-5 space-y-1" />
                                ),
                                li: (props) => <li {...props} className="m-0 leading-snug" />,
                                // Custom strong/bold component
                                strong: (props) => (
                                  <strong {...props} className="font-bold text-cyan-50" />
                                ),
                              }}
                            >
                              {message.text}
                            </ReactMarkdown>
                          )
                        ) : (
                          message.isStreaming && (
                            <span className="text-muted-foreground flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce"></span>
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce delay-75"></span>
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce delay-150"></span>
                            </span>
                          )
                        )}
                      </div>
                    </div>
                    <p
                      className={cn(
                        'mt-1 text-xs',
                        message.sender === 'user'
                          ? 'text-secondary'
                          : 'text-muted-foreground',
                      )}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Show suggestions only when conversation just started */}
            {messages.length === 1 && !isLoading && (
              <div className="space-y-2 pt-1">
                <p className="text-muted-foreground px-1 text-xs font-medium">
                  Quick questions:
                </p>
                <div className="flex flex-col gap-1.5">
                  {chatSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="group flex w-full items-start justify-between rounded-lg border border-border/70 bg-card/60 hover:bg-muted/70 hover:border-primary/40 px-3 py-2 text-left text-xs text-foreground transition-all duration-200"
                    >
                      <span className="leading-snug pr-2 whitespace-normal break-words">{suggestion}</span>
                      <span className="text-muted-foreground opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-xs font-mono shrink-0 pt-0.5">→</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </ExpandableChatBody>

      <ExpandableChatFooter>
        <div className="flex space-x-2">
          <Input
            placeholder="Ask me about my work and experience..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            size="sm"
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isLoading}
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <SendIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
};

export default ChatBubble;
