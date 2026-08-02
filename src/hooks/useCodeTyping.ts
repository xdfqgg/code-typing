/**
 * useCodeTyping — 代码打字练习核心 Hook
 *
 * 核心思路参考 CoderType by @Bogdusik
 * (github.com/Bogdusik/CoderType)
 * 本项目用 React + TypeScript 完全重写。
 */

import { useState, useCallback, useRef, useEffect } from 'react'

// ---- 类型 ----

export type CharStatus = 'untyped' | 'correct' | 'incorrect'

export interface CharState {
  char: string
  status: CharStatus
}

export type GameStatus = 'idle' | 'running' | 'finished'

export interface TypingStats {
  wpm: number
  accuracy: number
  totalKeystrokes: number
  correctKeystrokes: number
  elapsed: number // 秒
}

export interface TypingGame {
  // 状态
  chars: CharState[]
  cursorIndex: number
  gameStatus: GameStatus
  stats: TypingStats

  // 模式
  mode: 'timed' | 'free'
  timeLimit: number // 秒，仅 timed 模式
  remainingTime: number

  // 操作
  loadCode: (code: string) => void
  handleKey: (key: string, preventDefault?: () => void) => void
  start: () => void
  reset: () => void
  setMode: (mode: 'timed' | 'free') => void
  setTimeLimit: (sec: number) => void
}

// ---- 拆分代码为字符数组 ----

function parseCode(code: string): CharState[] {
  // 把 tab 替换为 2 个空格
  const normalized = code.replace(/\t/g, '  ')
  return normalized.split('').map((char) => ({
    char,
    status: 'untyped' as CharStatus,
  }))
}

// ---- 判断空白字符 ----

function isWhitespace(char: string): boolean {
  return /\s/.test(char)
}

// ---- Hook 实现 ----

export function useCodeTyping(): TypingGame {
  const [chars, setChars] = useState<CharState[]>([])
  const [cursorIndex, setCursorIndex] = useState(0)
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle')
  const [mode, setMode] = useState<'timed' | 'free'>('free')
  const [timeLimit, setTimeLimit] = useState(60)

  const [totalKeystrokes, setTotalKeystrokes] = useState(0)
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0)
  const [elapsed, setElapsed] = useState(0)

  // 隐藏的可变引用，避免闭包陷阱
  const statusRef = useRef<GameStatus>('idle')
  const cursorRef = useRef(0)
  const charsRef = useRef<CharState[]>([])
  const totalRef = useRef(0)
  const correctRef = useRef(0)
  const startTimeRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // 同步到 ref
  useEffect(() => { statusRef.current = gameStatus }, [gameStatus])
  useEffect(() => { cursorRef.current = cursorIndex }, [cursorIndex])
  useEffect(() => { charsRef.current = chars }, [chars])

  // 计时器
  useEffect(() => {
    if (gameStatus === 'running') {
      startTimeRef.current = Date.now()
      tickRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000))
      }, 1000)

      // 限时模式倒计时
      if (mode === 'timed') {
        timerRef.current = setInterval(() => {
          const spent = Math.floor((Date.now() - startTimeRef.current) / 1000)
          if (spent >= timeLimit) {
            setGameStatus('finished')
          }
        }, 200)
      }
    }
    return () => {
      if (tickRef.current) clearInterval(tickRef.current)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [gameStatus, mode, timeLimit])

  // ---- 加载代码 ----

  const loadCode = useCallback((code: string) => {
    const parsed = parseCode(code)
    setChars(parsed)
    setCursorIndex(0)
    setGameStatus('idle')
    setTotalKeystrokes(0)
    setCorrectKeystrokes(0)
    setElapsed(0)
    cursorRef.current = 0
    charsRef.current = parsed
    totalRef.current = 0
    correctRef.current = 0
  }, [])

  // ---- 开始 ----

  const start = useCallback(() => {
    if (charsRef.current.length === 0) return
    setGameStatus('running')
  }, [])

  // ---- 重置 ----

  const reset = useCallback(() => {
    setChars((prev) => prev.map((c) => ({ ...c, status: 'untyped' as CharStatus })))
    setCursorIndex(0)
    setGameStatus('idle')
    setTotalKeystrokes(0)
    setCorrectKeystrokes(0)
    setElapsed(0)
    cursorRef.current = 0
    totalRef.current = 0
    correctRef.current = 0
    // 清除定时器
    if (tickRef.current) clearInterval(tickRef.current)
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  // ---- 处理按键 ----

  const handleKey = useCallback(
    (key: string, preventDefault?: () => void) => {
      const status = statusRef.current
      const ci = cursorRef.current
      const chs = charsRef.current

      if (status === 'finished') return
      if (ci >= chs.length) return

      // Tab → 2 个空格
      if (key === 'Tab') {
        preventDefault?.()
        processKey(' ')
        processKey(' ')
        return
      }

      processKey(key)
      return

      function processKey(k: string) {
        const idx = cursorRef.current
        const arr = charsRef.current
        if (idx >= arr.length) return

        // 首次击键，自动开始
        if (statusRef.current === 'idle') {
          setGameStatus('running')
          statusRef.current = 'running'
        }

        if (k === 'Backspace') {
          if (idx > 0) {
            // 回退
            const newChars = [...arr]
            newChars[idx - 1] = { ...newChars[idx - 1], status: 'untyped' }
            setChars(newChars)
            charsRef.current = newChars
            setCursorIndex(idx - 1)
            cursorRef.current = idx - 1
            totalRef.current = Math.max(0, totalRef.current - 1)
            setTotalKeystrokes(totalRef.current)
          }
          return
        }

        // 单字符键
        if (k.length === 1) {
          const expected = arr[idx].char
          const isCorrect = k === expected

          const newChars = [...arr]
          newChars[idx] = {
            ...newChars[idx],
            status: isCorrect ? 'correct' : 'incorrect',
          }

          setChars(newChars)
          charsRef.current = newChars
          setCursorIndex(idx + 1)
          cursorRef.current = idx + 1

          totalRef.current += 1
          setTotalKeystrokes(totalRef.current)
          if (isCorrect) {
            correctRef.current += 1
            setCorrectKeystrokes(correctRef.current)
          }

          // 光标移到下一行后，跳过行首空白
          const nextIdx = idx + 1
          if (nextIdx < arr.length && isWhitespace(arr[nextIdx].char) && arr[nextIdx].char !== '\n') {
            // 自动跳过连续空白（行首缩进）
            let skipIdx = nextIdx
            while (skipIdx < arr.length && isWhitespace(arr[skipIdx].char) && arr[skipIdx].char !== '\n') {
              const newChars2 = [...charsRef.current]
              newChars2[skipIdx] = { ...newChars2[skipIdx], status: 'correct' }
              charsRef.current = newChars2
              skipIdx++
              totalRef.current += 1
              correctRef.current += 1
            }
            setChars([...charsRef.current])
            setCursorIndex(skipIdx)
            cursorRef.current = skipIdx
            setTotalKeystrokes(totalRef.current)
            setCorrectKeystrokes(correctRef.current)
          }

          // 检查是否完成
          if (cursorRef.current >= arr.length) {
            setGameStatus('finished')
          }
        }
      }
    },
    [],
  )

  // ---- 计算统计数据 ----

  const remainingTime = mode === 'timed' ? Math.max(0, timeLimit - elapsed) : 0

  const stats: TypingStats = {
    totalKeystrokes,
    correctKeystrokes,
    elapsed,
    get wpm() {
      // CPM (characters per minute) → WPM (5 chars = 1 word)
      if (elapsed === 0) return 0
      return Math.round((correctKeystrokes / elapsed) * 60 / 5)
    },
    get accuracy() {
      if (totalKeystrokes === 0) return 100
      return Math.round((correctKeystrokes / totalKeystrokes) * 100)
    },
  }

  return {
    chars,
    cursorIndex,
    gameStatus,
    stats,
    mode,
    timeLimit,
    remainingTime,
    loadCode,
    handleKey,
    start,
    reset,
    setMode,
    setTimeLimit,
  }
}
