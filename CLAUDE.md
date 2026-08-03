# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

CodeTyping — 浏览器里的代码打字练习工具。用户对着真实代码片段逐字符敲击，练打字速度的同时熟悉语法。灵感来自 CoderType (github.com/Bogdusik/CoderType)，用 React + TypeScript 完全重写。

## 常用命令

```bash
npm run dev          # 本地开发（纯 Vite，无 AI 后端）
npm run build        # 类型检查 + 生产构建
npm run dev:ai       # 本地测试 AI 链路（wrangler pages dev --remote，消耗 AI 额度）
npm run deploy       # 构建 + 部署到 Cloudflare Pages
```

## 技术栈

- React 19 + TypeScript 6 + Vite 8 + Tailwind CSS v4
- JetBrains Mono（代码展示字体，`@fontsource-variable/jetbrains-mono`）
- Cloudflare Pages（托管 + Functions）+ Wrangler CLI
- 无状态管理库、无路由（单页面应用）

## 架构

### 数据流

```
App.tsx (UI + 键盘监听)
  ├── useCodeTyping()     → 打字引擎核心
  ├── useAiGenerate()      → AI 生成 + fallback
  └── snippets.ts          → 55 个内置片段（22 种语言）
```

### 核心 Hook：`useCodeTyping`

文件：`src/hooks/useCodeTyping.ts`

字符级状态机——把代码段拆成 `CharState[]`，每个字符一个 `{char, status}`。通过 `useRef` 维护可变状态（避免闭包陷阱），`useState` 触发 UI 重渲染。

**关键返回值：**
- `chars: CharState[]` — 每个字符及其状态（`untyped | correct | incorrect`）
- `cursorIndex: number` — 当前待输入字符位置
- `gameStatus: 'idle' | 'running' | 'finished'`
- `loadCode(code)` — 加载代码片段（重置所有状态）
- `handleKey(key, preventDefault)` — 处理单次按键

**按键处理逻辑：**
- Tab → 2 个空格（调用两次 `processKey(' ')`）
- Enter → 如果当前字符是 `\n`，标记 correct 并自动跳过下一行缩进
- Backspace → 回退一个字符，状态重置为 untyped
- 单字符键 → 与期望字符比较，标记 correct/incorrect
- 首次击键自动将状态从 idle 改为 running（开始计时）
- 所有字符打完 → finished

**计时器：** `useEffect` 监听 `gameStatus === 'running'` 时启动 `setInterval`。

### AI 生成架构

```
App.tsx [AI 面板]
  → useAiGenerate.generate(language, config)
    → POST /api/generate { language, provider, apiKey?, baseUrl?, model? }
      → functions/api/generate.ts (Cloudflare Pages Function)
        → provider='free': Pollinations.ai (免 key)
        → provider='custom': 用户指定的 OpenAI 兼容端点
      → 返回 { code }
    → loadCode(code)
  → 失败时: 随机从内置 snippets 中 fallback
```

- API 配置持久化在 `localStorage`（key: `codetyping-ai-config`）
- 同语言会话内缓存（`Map<language, code>`）
- AbortController 防重复点击竞态

### 内置题库

`src/data/snippets.ts` — `Snippet[]` 数组，每个片段有 `id, name, language, code, source?`。所有代码片段必须是纯 ASCII（无中文、无注释），保证键盘可输入。

### Pages Function

`functions/api/generate.ts` — 唯一的后端端点。语言白名单校验，防 prompt 注入。清理 markdown 代码块包裹。输出长度校验（10-2000 字符）。

### 部署配置

`wrangler.toml` — 极简配置，无 AI binding（AI 调用走 HTTP 代理而非 Workers AI binding）。

## 关键约束

- 代码片段必须纯 ASCII——中文通过 IME 输入，`keydown` 事件拿不到单字符
- 全局 `keydown` 监听必须忽略 `isComposing` / `key === 'Process'`（输入法保护）
- `useRef` 用于内部可变状态（cursor、chars 等），避免闭包过期问题
- AI Function 在纯 Vite 开发环境下不可用（404），`useAiGenerate` 自动 fallback
