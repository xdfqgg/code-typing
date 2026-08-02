/**
 * App.tsx — 代码打字练习
 *
 * 核心思路参考 CoderType by @Bogdusik
 * (github.com/Bogdusik/CoderType)
 * 本项目用 React + TypeScript + Tailwind 完全重写。
 */

import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useCodeTyping } from './hooks/useCodeTyping'
import { snippets } from './data/snippets'

const TIME_OPTIONS = [30, 60, 120, 300]

export default function App() {
  const game = useCodeTyping()
  const {
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
  } = game

  const [selectedId, setSelectedId] = useState(snippets[0].id)
  const [customCode, setCustomCode] = useState('')
  const [source, setSource] = useState<'builtin' | 'custom'>('builtin')
  const [showCustomInput, setShowCustomInput] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // 当前选中的片段
  const currentSnippet = useMemo(
    () => snippets.find((s) => s.id === selectedId) ?? snippets[0],
    [selectedId],
  )

  // 切换片段时加载代码
  useEffect(() => {
    if (source === 'builtin') {
      loadCode(currentSnippet.code)
    }
  }, [currentSnippet, loadCode, source])

  // 全局键盘监听
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // 用户在文本框中打字时不拦截
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return

      handleKey(e.key, () => e.preventDefault())
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [handleKey])

  // 自动滚动光标到可见区域
  useEffect(() => {
    const cursorEl = document.getElementById('typing-cursor')
    cursorEl?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [cursorIndex])

  // 加载自定义代码
  const applyCustomCode = () => {
    if (customCode.trim()) {
      loadCode(customCode)
      setSource('custom')
      setShowCustomInput(false)
    }
  }

  const timeDisplay = mode === 'timed' ? remainingTime : stats.elapsed

  return (
    <div
      className="min-h-screen px-4 py-8 max-w-3xl mx-auto"
      ref={containerRef}
    >
      {/* ---- 标题 ---- */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 mb-1">
          {'<CodeTyping />'}
        </h1>
        <p className="text-sm text-neutral-500">
          敲代码，练手感——每个字符都在帮你熟悉语法
        </p>
      </header>

      {/* ---- 工具栏 ---- */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* 模式切换 */}
        <div className="flex rounded-lg border border-neutral-200 bg-white overflow-hidden">
          <button
            onClick={() => setMode('free')}
            className="px-3 py-1.5 text-sm transition-colors"
            style={
              mode === 'free'
                ? { backgroundColor: '#5B7FFF', color: '#fff' }
                : { color: '#525252' }
            }
          >
            自由模式
          </button>
          <button
            onClick={() => setMode('timed')}
            className="px-3 py-1.5 text-sm transition-colors"
            style={
              mode === 'timed'
                ? { backgroundColor: '#5B7FFF', color: '#fff' }
                : { color: '#525252' }
            }
          >
            限时模式
          </button>
        </div>

        {/* 时限选择 */}
        {mode === 'timed' && (
          <select
            value={timeLimit}
            onChange={(e) => setTimeLimit(Number(e.target.value))}
            className="px-3 py-1.5 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-700 cursor-pointer"
          >
            {TIME_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t} 秒
              </option>
            ))}
          </select>
        )}

        {/* 代码来源 */}
        <div className="flex rounded-lg border border-neutral-200 bg-white overflow-hidden">
          <button
            onClick={() => {
              setSource('builtin')
              loadCode(currentSnippet.code)
            }}
            className="px-3 py-1.5 text-sm transition-colors"
            style={
              source === 'builtin'
                ? { backgroundColor: '#404040', color: '#fff' }
                : { color: '#525252' }
            }
          >
            题库
          </button>
          <button
            onClick={() => setShowCustomInput(!showCustomInput)}
            className="px-3 py-1.5 text-sm transition-colors"
            style={
              source === 'custom'
                ? { backgroundColor: '#404040', color: '#fff' }
                : { color: '#525252' }
            }
          >
            粘贴
          </button>
        </div>

        {/* 片段选择器 */}
        {source === 'builtin' && (
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="px-3 py-1.5 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-700 cursor-pointer min-w-[150px]"
          >
            {snippets.map((s) => (
              <option key={s.id} value={s.id}>
                {s.language} — {s.name}
              </option>
            ))}
          </select>
        )}

        {/* 操控按钮 */}
        {gameStatus === 'idle' && chars.length > 0 && (
          <button
            onClick={start}
            className="px-4 py-1.5 text-sm rounded-lg font-medium text-white"
            style={{ backgroundColor: '#5B7FFF' }}
          >
            开始
          </button>
        )}
        {(gameStatus === 'running' || gameStatus === 'finished') && (
          <button
            onClick={reset}
            className="px-4 py-1.5 text-sm rounded-lg font-medium border border-neutral-200 text-neutral-600"
          >
            重来
          </button>
        )}
      </div>

      {/* 自定义代码输入 */}
      {showCustomInput && (
        <div className="mb-6">
          <textarea
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            placeholder="在此粘贴你想练习的代码……"
            className="w-full h-32 p-3 text-sm border border-neutral-200 rounded-lg resize-none focus:outline-none focus:ring-2"
            style={{
              fontFamily: 'JetBrains Mono Variable, monospace',
              '--tw-ring-color': '#5B7FFF33',
            } as React.CSSProperties}
          />
          <button
            onClick={applyCustomCode}
            disabled={!customCode.trim()}
            className="mt-2 px-4 py-1.5 text-sm rounded-lg font-medium text-white disabled:opacity-40"
            style={{ backgroundColor: '#5B7FFF' }}
          >
            加载代码
          </button>
        </div>
      )}

      {/* ---- 统计栏 ---- */}
      <div className="flex justify-center gap-8 sm:gap-12 mb-6">
        <StatCard
          label={mode === 'timed' ? '剩余时间' : '用时'}
          value={`${timeDisplay}s`}
        />
        <StatCard label="速度" value={`${stats.wpm} WPM`} />
        <StatCard label="准确率" value={`${stats.accuracy}%`} />
        <StatCard label="进度" value={`${cursorIndex}/${chars.length}`} />
      </div>

      {/* ---- 代码展示区 ---- */}
      <div
        className="relative p-6 rounded-xl border border-neutral-200 bg-white overflow-auto max-h-[55vh] shadow-sm"
        style={{ fontFamily: 'JetBrains Mono Variable, monospace' }}
      >
        <pre
          className="text-[15px] leading-relaxed whitespace-pre-wrap break-all m-0 text-neutral-300"
          style={{ tabSize: 2 }}
        >
          {chars.map((ch, i) => {
            const isCursor = i === cursorIndex && gameStatus !== 'finished'
            const isNewline = ch.char === '\n'

            // 光标闪烁条（在当前字符前面）
            const cursorBar = isCursor ? (
              <span
                id="typing-cursor"
                className="inline-block w-[2px] h-[1.2em] bg-[#5B7FFF] animate-pulse align-middle rounded-sm"
              />
            ) : null

            if (isNewline) {
              return (
                <React.Fragment key={i}>
                  {cursorBar}
                  {'\n'}
                </React.Fragment>
              )
            }

            let className = ''
            if (ch.status === 'correct') className = 'text-[#2D9A7A]'
            else if (ch.status === 'incorrect')
              className = 'text-[#E0556A] bg-[#E0556A]/10 rounded-sm'
            else if (isCursor)
              // 当前字符：高亮底色，提示用户要敲什么
              className = 'bg-[#5B7FFF]/15 text-neutral-600 rounded-sm'

            return (
              <React.Fragment key={i}>
                {cursorBar}
                <span className={className}>{ch.char}</span>
              </React.Fragment>
            )
          })}
        </pre>

        {chars.length === 0 && (
          <p className="text-neutral-400 text-center py-12">
            选择代码片段或粘贴代码开始 ✨
          </p>
        )}
      </div>

      {/* ---- 完成弹窗 ---- */}
      {gameStatus === 'finished' && (
        <div className="mt-6 p-6 rounded-xl border border-neutral-200 bg-white text-center shadow-sm">
          <p className="text-lg font-semibold text-neutral-800 mb-3">
            🎉 练习完成！
          </p>
          <div className="flex justify-center gap-8 mb-4">
            <StatCard label="速度" value={`${stats.wpm} WPM`} />
            <StatCard label="准确率" value={`${stats.accuracy}%`} />
            <StatCard label="正确" value={`${stats.correctKeystrokes}`} />
            <StatCard label="总击键" value={`${stats.totalKeystrokes}`} />
          </div>
          <p className="text-sm text-neutral-500 mb-4">
            {stats.accuracy === 100
              ? '完美！零错误！'
              : stats.accuracy >= 95
                ? '非常接近了，再练一把？'
                : '多练几次会越来越准'}
          </p>
          <button
            onClick={reset}
            className="px-6 py-2 text-sm font-medium rounded-lg text-white"
            style={{ backgroundColor: '#5B7FFF' }}
          >
            再来一次
          </button>
        </div>
      )}

      {/* ---- 键盘提示 ---- */}
      <footer className="mt-8 text-center text-xs text-neutral-400">
        <p>
          <kbd className="px-1.5 py-0.5 rounded border border-neutral-200 bg-neutral-50 text-neutral-500">
            Tab
          </kbd>{' '}
          = 2 空格 ·{' '}
          <kbd className="px-1.5 py-0.5 rounded border border-neutral-200 bg-neutral-50 text-neutral-500">
            ← Backspace
          </kbd>{' '}
          可回退 · 开始打字即自动计时
        </p>
      </footer>
    </div>
  )
}

/** 统计卡片组件 */
function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xs text-neutral-400 mb-0.5">{label}</span>
      <span className="text-lg font-semibold text-neutral-800 tabular-nums">
        {value}
      </span>
    </div>
  )
}
