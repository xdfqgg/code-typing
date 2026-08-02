/**
 * App.tsx — 代码打字练习
 *
 * 核心思路参考 CoderType by @Bogdusik (github.com/Bogdusik/CoderType)
 * 本项目用 React + TypeScript + Tailwind 完全重写。
 */

import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useCodeTyping } from './hooks/useCodeTyping'
import { useAiGenerate, loadApiConfig, saveApiConfig } from './hooks/useAiGenerate'
import type { AiProvider } from './hooks/useAiGenerate'
import { snippets } from './data/snippets'

const TIME_OPTIONS = [30, 60, 120, 300]
const LANGUAGES = ['TypeScript', 'JavaScript', 'Python', 'CSS', 'HTML', 'SQL', 'Bash']

type Source = 'builtin' | 'ai' | 'custom'

export default function App() {
  const game = useCodeTyping()
  const ai = useAiGenerate()
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
  const [source, setSource] = useState<Source>('builtin')
  const [showCustomInput, setShowCustomInput] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // AI 配置（持久化到 localStorage）
  const [aiConfig, setAiConfig] = useState(loadApiConfig)
  const [aiLanguage, setAiLanguage] = useState('TypeScript')

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

  // 自动滚动光标
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

  // AI 生成
  const handleAiGenerate = async () => {
    const code = await ai.generate(aiLanguage, aiConfig)
    if (code) {
      loadCode(code)
      setSource('ai')
    }
  }

  // 保存 AI 配置
  const handleAiConfigChange = (patch: Partial<typeof aiConfig>) => {
    const next = { ...aiConfig, ...patch }
    setAiConfig(next)
    saveApiConfig(next)
  }

  const timeDisplay = mode === 'timed' ? remainingTime : stats.elapsed

  return (
    <div className="min-h-screen px-4 py-8 max-w-3xl mx-auto" ref={containerRef}>
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
          <button onClick={() => setMode('free')}
            className="px-3 py-1.5 text-sm transition-colors"
            style={mode === 'free' ? { backgroundColor: '#5B7FFF', color: '#fff' } : { color: '#525252' }}>
            自由模式
          </button>
          <button onClick={() => setMode('timed')}
            className="px-3 py-1.5 text-sm transition-colors"
            style={mode === 'timed' ? { backgroundColor: '#5B7FFF', color: '#fff' } : { color: '#525252' }}>
            限时模式
          </button>
        </div>

        {mode === 'timed' && (
          <select value={timeLimit} onChange={(e) => setTimeLimit(Number(e.target.value))}
            className="px-3 py-1.5 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-700 cursor-pointer">
            {TIME_OPTIONS.map((t) => (<option key={t} value={t}>{t} 秒</option>))}
          </select>
        )}

        {/* ---- 代码来源（三态） ---- */}
        <div className="flex rounded-lg border border-neutral-200 bg-white overflow-hidden">
          {(['builtin', 'ai', 'custom'] as const).map((s) => (
            <button key={s}
              onClick={() => {
                setSource(s)
                if (s === 'builtin') loadCode(currentSnippet.code)
                if (s === 'custom') setShowCustomInput(true)
              }}
              className="px-3 py-1.5 text-sm transition-colors"
              style={source === s ? { backgroundColor: '#404040', color: '#fff' } : { color: '#525252' }}>
              {{ builtin: '题库', ai: 'AI 生成', custom: '粘贴' }[s]}
            </button>
          ))}
        </div>

        {/* 题库：片段选择器 */}
        {source === 'builtin' && (
          <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}
            className="px-3 py-1.5 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-700 cursor-pointer min-w-[150px]">
            {snippets.map((s) => (
              <option key={s.id} value={s.id}>{s.language} — {s.name}</option>
            ))}
          </select>
        )}

        {/* 操控按钮 */}
        {gameStatus === 'idle' && chars.length > 0 && (
          <button onClick={start}
            className="px-4 py-1.5 text-sm rounded-lg font-medium text-white"
            style={{ backgroundColor: '#5B7FFF' }}>
            开始
          </button>
        )}
        {(gameStatus === 'running' || gameStatus === 'finished') && (
          <button onClick={reset}
            className="px-4 py-1.5 text-sm rounded-lg font-medium border border-neutral-200 text-neutral-600">
            重来
          </button>
        )}
      </div>

      {/* ---- AI 生成面板 ---- */}
      {source === 'ai' && (
        <div className="mb-6 p-4 rounded-xl border border-neutral-200 bg-white">
          <div className="flex flex-wrap items-end gap-3 mb-3">
            {/* 语言选择 */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-neutral-400">语言</label>
              <select value={aiLanguage} onChange={(e) => setAiLanguage(e.target.value)}
                className="px-3 py-1.5 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-700 cursor-pointer">
                {LANGUAGES.map((l) => (<option key={l} value={l}>{l}</option>))}
              </select>
            </div>

            {/* 提供方 */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-neutral-400">模型来源</label>
              <div className="flex rounded-lg border border-neutral-200 overflow-hidden">
                {(['free', 'custom'] as AiProvider[]).map((p) => (
                  <button key={p} onClick={() => handleAiConfigChange({ provider: p })}
                    className="px-3 py-1.5 text-sm transition-colors"
                    style={aiConfig.provider === p ? { backgroundColor: '#5B7FFF', color: '#fff' } : { color: '#525252' }}>
                    {{ free: '免费', custom: '自己的 Key' }[p]}
                  </button>
                ))}
              </div>
            </div>

            {/* 生成按钮 */}
            <button onClick={handleAiGenerate}
              disabled={ai.state.status === 'loading'}
              className="px-4 py-1.5 text-sm rounded-lg font-medium text-white disabled:opacity-50 transition-colors"
              style={{ backgroundColor: '#5B7FFF' }}>
              {ai.state.status === 'loading' ? '生成中…' : '✨ AI 生成'}
            </button>
          </div>

          {/* 自定义 API 配置 */}
          {aiConfig.provider === 'custom' && (
            <div className="flex flex-wrap gap-3 pt-3 border-t border-neutral-100">
              <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
                <label className="text-xs text-neutral-400">API Key</label>
                <input type="password" value={aiConfig.apiKey}
                  onChange={(e) => handleAiConfigChange({ apiKey: e.target.value })}
                  placeholder="sk-…"
                  className="px-3 py-1.5 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#5B7FFF]/30" />
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
                <label className="text-xs text-neutral-400">Base URL</label>
                <input type="text" value={aiConfig.baseUrl}
                  onChange={(e) => handleAiConfigChange({ baseUrl: e.target.value })}
                  placeholder="https://api.openai.com/v1"
                  className="px-3 py-1.5 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#5B7FFF]/30" />
              </div>
              <div className="flex flex-col gap-1 w-[160px]">
                <label className="text-xs text-neutral-400">Model</label>
                <input type="text" value={aiConfig.model}
                  onChange={(e) => handleAiConfigChange({ model: e.target.value })}
                  placeholder="gpt-4o-mini"
                  className="px-3 py-1.5 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#5B7FFF]/30" />
              </div>
            </div>
          )}

          {/* AI 状态提示 */}
          {ai.state.status === 'error' && (
            <p className="mt-3 text-sm text-amber-600">
              ⚠️ AI 暂时不可用：「{ai.state.error}」— 已为你随机选了内置片段
            </p>
          )}
          {ai.state.status === 'success' && ai.state.code === chars.map(c => c.char).join('') && (
            <p className="mt-3 text-sm text-emerald-600">
              ✅ 生成成功，开始打字吧
            </p>
          )}
        </div>
      )}

      {/* ---- 粘贴面板 ---- */}
      {source === 'custom' && showCustomInput && (
        <div className="mb-6">
          <textarea value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            placeholder="在此粘贴你想练习的代码……"
            className="w-full h-32 p-3 text-sm border border-neutral-200 rounded-lg resize-none focus:outline-none focus:ring-2"
            style={{ fontFamily: 'JetBrains Mono Variable, monospace', '--tw-ring-color': '#5B7FFF33' } as React.CSSProperties} />
          <button onClick={applyCustomCode} disabled={!customCode.trim()}
            className="mt-2 px-4 py-1.5 text-sm rounded-lg font-medium text-white disabled:opacity-40"
            style={{ backgroundColor: '#5B7FFF' }}>
            加载代码
          </button>
        </div>
      )}

      {/* ---- 统计栏 ---- */}
      <div className="flex justify-center gap-8 sm:gap-12 mb-6">
        <StatCard label={mode === 'timed' ? '剩余时间' : '用时'} value={`${timeDisplay}s`} />
        <StatCard label="速度" value={`${stats.wpm} WPM`} />
        <StatCard label="准确率" value={`${stats.accuracy}%`} />
        <StatCard label="进度" value={`${cursorIndex}/${chars.length}`} />
      </div>

      {/* ---- 代码展示区 ---- */}
      <div className="relative p-6 rounded-xl border border-neutral-200 bg-white overflow-auto max-h-[55vh] shadow-sm"
        style={{ fontFamily: 'JetBrains Mono Variable, monospace' }}>
        <pre className="text-[15px] leading-relaxed whitespace-pre-wrap break-all m-0 text-neutral-300"
          style={{ tabSize: 2 }}>
          {chars.map((ch, i) => {
            const isCursor = i === cursorIndex && gameStatus !== 'finished'
            const isNewline = ch.char === '\n'

            const cursorBar = isCursor ? (
              <span id="typing-cursor"
                className="inline-block w-[2px] h-[1.2em] bg-[#5B7FFF] animate-pulse align-middle rounded-sm" />
            ) : null

            if (isNewline) {
              return (<React.Fragment key={i}>{cursorBar}{'\n'}</React.Fragment>)
            }

            let cls = ''
            if (ch.status === 'correct') cls = 'text-[#2D9A7A]'
            else if (ch.status === 'incorrect') cls = 'text-[#E0556A] bg-[#E0556A]/10 rounded-sm'
            else if (isCursor) cls = 'bg-[#5B7FFF]/15 text-neutral-600 rounded-sm'

            return (
              <React.Fragment key={i}>
                {cursorBar}
                <span className={cls}>{ch.char}</span>
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
          <p className="text-lg font-semibold text-neutral-800 mb-3">🎉 练习完成！</p>
          <div className="flex justify-center gap-8 mb-4">
            <StatCard label="速度" value={`${stats.wpm} WPM`} />
            <StatCard label="准确率" value={`${stats.accuracy}%`} />
            <StatCard label="正确" value={`${stats.correctKeystrokes}`} />
            <StatCard label="总击键" value={`${stats.totalKeystrokes}`} />
          </div>
          <p className="text-sm text-neutral-500 mb-4">
            {stats.accuracy === 100 ? '完美！零错误！' : stats.accuracy >= 95 ? '非常接近了，再练一把？' : '多练几次会越来越准'}
          </p>
          <button onClick={reset}
            className="px-6 py-2 text-sm font-medium rounded-lg text-white"
            style={{ backgroundColor: '#5B7FFF' }}>
            再来一次
          </button>
        </div>
      )}

      {/* ---- 键盘提示 ---- */}
      <footer className="mt-8 text-center text-xs text-neutral-400">
        <p>
          <kbd className="px-1.5 py-0.5 rounded border border-neutral-200 bg-neutral-50 text-neutral-500">Tab</kbd>
          {' '}= 2 空格 ·{' '}
          <kbd className="px-1.5 py-0.5 rounded border border-neutral-200 bg-neutral-50 text-neutral-500">← Backspace</kbd>
          {' '}可回退 · 开始打字即自动计时
        </p>
      </footer>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xs text-neutral-400 mb-0.5">{label}</span>
      <span className="text-lg font-semibold text-neutral-800 tabular-nums">{value}</span>
    </div>
  )
}
