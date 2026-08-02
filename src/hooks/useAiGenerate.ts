/**
 * useAiGenerate — AI 代码片段生成 Hook
 *
 * 两种提供方：
 * - 'free'：免费接口（Pollinations.ai，无需 key）
 * - 'custom'：用户自己的 OpenAI 兼容 API
 */

import { useState, useCallback, useRef } from 'react'
import { snippets } from '../data/snippets'

export type AiProvider = 'free' | 'custom'

export interface AiConfig {
  provider: AiProvider
  apiKey: string
  baseUrl: string
  model: string
}

export interface AiState {
  /** 生成状态 */
  status: 'idle' | 'loading' | 'success' | 'error'
  /** 错误信息 */
  error: string | null
  /** 生成的代码 */
  code: string | null
}

/** 从 localStorage 读取上次保存的 API 配置 */
export function loadApiConfig(): AiConfig {
  try {
    const raw = localStorage.getItem('codetyping-ai-config')
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return {
    provider: 'free',
    apiKey: '',
    baseUrl: 'https://api.openai.com/v1',
    model: 'gpt-4o-mini',
  }
}

/** 保存 API 配置到 localStorage */
export function saveApiConfig(config: AiConfig) {
  try {
    localStorage.setItem('codetyping-ai-config', JSON.stringify(config))
  } catch { /* ignore */ }
}

export function useAiGenerate() {
  const [state, setState] = useState<AiState>({
    status: 'idle',
    error: null,
    code: null,
  })

  const abortRef = useRef<AbortController | null>(null)
  // 会话内缓存：同一语言不重复调
  const cacheRef = useRef<Map<string, string>>(new Map())

  const generate = useCallback(async (language: string, config: AiConfig) => {
    // 取消上次请求
    abortRef.current?.abort()

    // 检查缓存
    const cached = cacheRef.current.get(language)
    if (cached) {
      setState({ status: 'success', error: null, code: cached })
      return cached
    }

    const controller = new AbortController()
    abortRef.current = controller

    setState({ status: 'loading', error: null, code: null })

    try {
      const body: Record<string, unknown> = {
        language,
        provider: config.provider,
      }
      if (config.provider === 'custom') {
        body.apiKey = config.apiKey
        body.baseUrl = config.baseUrl
        body.model = config.model
      }

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      })

      const data = (await res.json()) as { code?: string; error?: string }

      if (!res.ok || data.error) {
        throw new Error(data.error || `HTTP ${res.status}`)
      }

      if (!data.code || data.code.length < 10) {
        throw new Error('生成的代码太短')
      }

      cacheRef.current.set(language, data.code)
      setState({ status: 'success', error: null, code: data.code })
      return data.code
    } catch (err) {
      // 忽略 abort 错误
      if (err instanceof DOMException && err.name === 'AbortError') {
        return null
      }

      const message = err instanceof Error ? err.message : '未知错误'

      // fallback：随机选一个内置片段
      const fallback = snippets[Math.floor(Math.random() * snippets.length)]

      setState({
        status: 'error',
        error: message,
        code: fallback.code,
      })
      return fallback.code
    }
  }, [])

  const reset = useCallback(() => {
    abortRef.current?.abort()
    setState({ status: 'idle', error: null, code: null })
  }, [])

  return { state, generate, reset }
}
