/**
 * Cloudflare Pages Function — AI 代码片段生成代理
 *
 * POST /api/generate
 * Body: {
 *   language: string              // 编程语言
 *   provider: 'free' | 'custom'   // 免费接口 / 用户自己的 API
 *   apiKey?: string               // custom 模式必填
 *   baseUrl?: string              // custom 模式，默认 OpenAI
 *   model?: string                // custom 模式，默认 gpt-4o-mini
 * }
 * Response: { code: string } | { error: string }
 */

const FREE_ENDPOINT = 'https://text.pollinations.ai/openai'
const FREE_MODEL = 'openai'

const DEFAULT_BASE_URL = 'https://api.openai.com/v1'
const DEFAULT_MODEL = 'gpt-4o-mini'

const SYSTEM_PROMPT =
  'You are a code generator. Return ONLY raw code, no markdown fences, no explanation.'

// 题库支持的语言白名单（防 prompt 注入）
const LANGUAGES = [
  'TypeScript',
  'JavaScript',
  'Python',
  'CSS',
  'HTML',
  'Bash',
  'SQL',
]

function buildPrompt(language: string): string {
  return `Generate a short ${language} code snippet for typing practice.
Requirements:
- 10 to 20 lines
- Real, practical code (not hello world)
- Include at least one function or class
- Educational and interesting
Return ONLY the raw code.`
}

function cleanCode(raw: string): string {
  return raw
    .replace(/^```[\w]*\n?/gm, '')
    .replace(/```$/gm, '')
    .trim()
}

export async function onRequestPost(context: {
  request: Request
}): Promise<Response> {
  try {
    const body = (await context.request.json()) as {
      language: string
      provider: 'free' | 'custom'
      apiKey?: string
      baseUrl?: string
      model?: string
    }

    const { language, provider } = body

    // 校验 language
    if (!language || !LANGUAGES.includes(language)) {
      return Response.json(
        { error: `language 必须是以下之一: ${LANGUAGES.join(', ')}` },
        { status: 400 },
      )
    }

    // 确定端点
    let endpoint: string
    let apiKey: string
    let model: string

    if (provider === 'custom') {
      if (!body.apiKey) {
        return Response.json(
          { error: 'custom 模式需要提供 apiKey' },
          { status: 400 },
        )
      }
      endpoint = body.baseUrl || DEFAULT_BASE_URL
      apiKey = body.apiKey
      model = body.model || DEFAULT_MODEL
    } else {
      endpoint = FREE_ENDPOINT
      apiKey = ''
      model = FREE_MODEL
    }

    // 调 AI
    const res = await fetch(`${endpoint}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildPrompt(language) },
        ],
        max_tokens: 384,
        temperature: 0.6,
      }),
    })

    if (!res.ok) {
      const errText = await res.text().catch(() => '')
      console.error(
        `[generate] AI API ${res.status}: ${errText.slice(0, 200)}`,
      )
      return Response.json(
        { error: `AI 接口返回 ${res.status}` },
        { status: 502 },
      )
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>
    }

    const raw = data.choices?.[0]?.message?.content
    if (!raw) {
      return Response.json({ error: 'AI 返回为空' }, { status: 500 })
    }

    let code = cleanCode(raw)

    // 兜底校验
    if (code.length < 10) {
      return Response.json({ error: '生成的代码太短' }, { status: 500 })
    }
    if (code.length > 2000) {
      code = code.slice(0, 2000)
    }

    return Response.json({ code })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'AI 生成失败'
    console.error('[generate]', message)
    return Response.json({ error: message }, { status: 500 })
  }
}
