'use client'

import { useState, useRef, useEffect } from 'react'
import { Button, LoadingSpinner } from '@/components/ui'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  relatedFighters?: string[]
}

const SUGGESTED_PROMPTS = [
  'Who were the women who fought for Indian independence?',
  'What happened during the Quit India Movement?',
  'Tell me about tribal freedom fighters.',
  'Who were the revolutionaries who took up arms against the British?',
  'What was the Indian National Army?',
  'What did Bhagat Singh believe in?',
]

const SendIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" stroke="none" />
  </svg>
)

const ChakraIcon = () => (
  <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" aria-hidden="true">
    <circle cx="20" cy="20" r="18" stroke="#FF9933" strokeWidth="2" />
    <circle cx="20" cy="20" r="3" fill="#FF9933" />
    {Array.from({ length: 24 }).map((_, i) => {
      const a = (i * 15 * Math.PI) / 180
      return (
        <line
          key={i}
          x1={20 + 3 * Math.cos(a)}
          y1={20 + 3 * Math.sin(a)}
          x2={20 + 18 * Math.cos(a)}
          y2={20 + 18 * Math.sin(a)}
          stroke="#FF9933"
          strokeWidth="0.8"
        />
      )
    })}
  </svg>
)

export function AskBharatSection() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (question: string) => {
    if (!question.trim() || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: question.trim(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000)

      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question.trim() }),
        signal: controller.signal,
      })
      clearTimeout(timeoutId)

      if (!res.ok) {
        throw new Error(res.status === 429 ? 'rate_limited' : 'server_error')
      }

      const data: { answer: string; relatedFighterSlugs?: string[] } = await res.json()

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: data.answer,
          relatedFighters: data.relatedFighterSlugs,
        },
      ])
    } catch (err) {
      const isAbort = err instanceof DOMException && err.name === 'AbortError'
      const isRateLimit = err instanceof Error && err.message === 'rate_limited'
      setError(
        isRateLimit
          ? 'Please wait a moment and try again.'
          : isAbort
            ? 'The response took too long. Please try again.'
            : 'Something went wrong. Please try again.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const isEmpty = messages.length === 0

  return (
    <section id="ask-bharat" className="section bg-navy" aria-labelledby="ask-bharat-heading">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p className="text-caption text-saffron font-medium uppercase tracking-widest" style={{ marginBottom: '0.75rem' }}>
            AI Guide
          </p>
          <h2
            id="ask-bharat-heading"
            className="font-heading font-bold text-white"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', textAlign: 'center', marginBottom: '1.25rem' }}
          >
            Ask Bharat
          </h2>
          <p style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: '1.7' }}>
            A guide who knows every story in this archive. Ask about any fighter, movement,
            region, or era — answers grounded strictly in these profiles.
          </p>
        </div>

        <div style={{ maxWidth: '672px', marginLeft: 'auto', marginRight: 'auto' }}>
          {/* Chat window */}
          <div
            className="bg-white/5 rounded-radius-lg border border-white/10 overflow-hidden"
            role="log"
            aria-label="Conversation with Bharat"
            aria-live="polite"
          >
            {/* Messages */}
            <div className="p-6 min-h-[300px] max-h-[440px] overflow-y-auto space-y-4">
              {isEmpty && (
                <div className="text-center py-8">
                  <div
                    className="w-16 h-16 rounded-full bg-saffron/20 flex items-center justify-center mx-auto mb-4"
                    aria-hidden="true"
                  >
                    <ChakraIcon />
                  </div>
                  <p className="text-white/70 text-sm">
                    Namaste. I am Bharat — ask me anything about India's freedom struggle.
                  </p>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'max-w-[85%] rounded-radius-md px-4 py-3 text-sm leading-relaxed',
                      msg.role === 'user'
                        ? 'bg-saffron text-white rounded-br-none'
                        : 'bg-white/10 text-white rounded-bl-none',
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-radius-md rounded-bl-none px-4 py-3 flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    <span className="text-white/60 text-sm">Thinking…</span>
                  </div>
                </div>
              )}

              {error && (
                <div
                  className="bg-red-900/20 border border-red-500/30 rounded-radius-md px-4 py-3 text-red-300 text-sm"
                  role="alert"
                >
                  {error}
                </div>
              )}

              <div ref={messagesEndRef} aria-hidden="true" />
            </div>

            {/* Suggested prompts */}
            {isEmpty && (
              <div className="border-t border-white/10 px-6 py-4">
                <p className="text-caption text-white/40 mb-3 uppercase tracking-wide">Try asking</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      className="text-xs text-white/70 bg-white/8 hover:bg-white/15 border border-white/15 px-3 py-1.5 rounded-full transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                      onClick={() => sendMessage(prompt)}
                      disabled={isLoading}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-white/10 p-4 flex gap-3"
              aria-label="Ask a question"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about any fighter, movement, or era…"
                className="flex-1 bg-white/10 border border-white/20 rounded-radius-sm px-4 py-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all"
                aria-label="Your question"
                disabled={isLoading}
                maxLength={500}
              />
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={!input.trim() || isLoading}
                aria-label="Send question"
                className="px-4 min-h-[44px]"
              >
                <SendIcon />
              </Button>
            </form>
          </div>

          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginTop: '1rem' }}>
            Answers are grounded in this archive only — Bharat won't invent facts.
          </p>
        </div>
      </div>
    </section>
  )
}
