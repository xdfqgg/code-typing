/**
 * 内置代码片段题库
 *
 * 部分片段选自 CoderType 的 react.js / linux.js 数据集，
 * 原始来源：github.com/Bogdusik/CoderType
 */

export interface Snippet {
  id: string
  name: string
  language: string
  code: string
  source?: string
}

export const snippets: Snippet[] = [
  // ---- TypeScript / React ----
  {
    id: 'react-usestate',
    name: 'useState Hook',
    language: 'TypeScript',
    source: 'React 官方文档',
    code: `function Counter() {
  const [count, setCount] = useState<number>(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      点击了 {count} 次
    </button>
  )
}`,
  },
  {
    id: 'ts-interface',
    name: 'TypeScript 接口',
    language: 'TypeScript',
    source: 'TypeScript 官方文档',
    code: `interface User {
  id: number
  name: string
  email: string
  isAdmin: boolean
}

async function fetchUser(id: number): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`)
  return res.json()
}`,
  },
  {
    id: 'react-effect',
    name: 'useEffect 数据获取',
    language: 'TypeScript',
    source: 'React 官方文档',
    code: `function BlogPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>加载中...</p>
  return posts.map((post) => <BlogCard key={post.id} post={post} />)
}`,
  },
  {
    id: 'js-array-methods',
    name: '数组方法链',
    language: 'JavaScript',
    source: 'MDN',
    code: `const users = [
  { name: 'Alice', age: 25, active: true },
  { name: 'Bob', age: 30, active: false },
  { name: 'Charlie', age: 35, active: true },
]

const activeNames = users
  .filter((user) => user.active)
  .map((user) => user.name)
  .sort()

console.log(activeNames)`,
  },
  {
    id: 'ts-generic',
    name: '泛型函数',
    language: 'TypeScript',
    code: `function first<T>(arr: T[]): T | undefined {
  return arr[0]
}

function mapValues<K extends string, V, R>(
  obj: Record<K, V>,
  fn: (value: V, key: K) => R
): Record<K, R> {
  const result = {} as Record<K, R>
  for (const key in obj) {
    result[key] = fn(obj[key], key)
  }
  return result
}`,
  },
  // ---- JavaScript 基础 ----
  {
    id: 'js-fibonacci',
    name: '斐波那契数列',
    language: 'JavaScript',
    code: `function fibonacci(n: number): number {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

// 打印前 10 个斐波那契数
for (let i = 0; i < 10; i++) {
  console.log(fibonacci(i))
}`,
  },
  {
    id: 'js-closure',
    name: '闭包计数器',
    language: 'JavaScript',
    code: `function createCounter(initial: number = 0) {
  let count = initial

  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count,
  }
}

const counter = createCounter(5)
counter.increment()
counter.increment()
console.log(counter.getValue())`,
  },
  {
    id: 'js-promise',
    name: 'Promise 链式调用',
    language: 'JavaScript',
    code: `function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function greet(name: string) {
  await delay(1000)
  return \`Hello, \${name}!\`
}

greet('World').then(console.log)`,
  },
  // ---- 算法 ----
  {
    id: 'algo-binary-search',
    name: '二分搜索',
    language: 'TypeScript',
    code: `function binarySearch(arr: number[], target: number): number {
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    if (arr[mid] === target) return mid
    if (arr[mid] < target) left = mid + 1
    else right = mid - 1
  }

  return -1
}`,
  },
  {
    id: 'algo-quick-sort',
    name: '快速排序',
    language: 'TypeScript',
    code: `function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr

  const pivot = arr[Math.floor(arr.length / 2)]
  const left = arr.filter((x) => x < pivot)
  const middle = arr.filter((x) => x === pivot)
  const right = arr.filter((x) => x > pivot)

  return [...quickSort(left), ...middle, ...quickSort(right)]
}`,
  },
  // ---- CSS ----
  {
    id: 'css-flex',
    name: 'Flexbox 居中',
    language: 'CSS',
    code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: 1rem;
}

.item {
  flex: 1;
  max-width: 300px;
  padding: 2rem;
  border-radius: 8px;
  background: #f0f0f0;
}`,
  },
  {
    id: 'css-grid',
    name: 'Grid 响应式布局',
    language: 'CSS',
    code: `.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

.gallery img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.gallery img:hover {
  transform: scale(1.05);
}`,
  },
  // ---- Python ----
  {
    id: 'py-list-comp',
    name: '列表推导式',
    language: 'Python',
    code: `# 列表推导式
squares = [x**2 for x in range(10)]

# 带条件的推导
evens = [x for x in range(20) if x % 2 == 0]

# 字典推导
word = "hello"
freq = {ch: word.count(ch) for ch in set(word)}

print(squares, evens, freq)`,
  },
  {
    id: 'py-decorator',
    name: '装饰器',
    language: 'Python',
    code: `import time
from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} 耗时 {elapsed:.4f}s")
        return result
    return wrapper

@timer
def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

fibonacci(20)`,
  },
  {
    id: 'py-context',
    name: '上下文管理器',
    language: 'Python',
    code: `class FileManager:
    def __init__(self, filename: str, mode: str):
        self.filename = filename
        self.mode = mode

    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.file.close()
        if exc_type:
            print(f"出错了: {exc_val}")
        return False  # 不吞掉异常

with FileManager("test.txt", "w") as f:
    f.write("Hello, World!")`,
  },
  {
    id: 'py-async',
    name: '异步 HTTP 请求',
    language: 'Python',
    code: `import asyncio
import aiohttp

async def fetch_url(session, url: str) -> str:
    async with session.get(url) as response:
        return await response.text()

async def fetch_all(urls: list[str]) -> list[str]:
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(session, url) for url in urls]
        return await asyncio.gather(*tasks)

async def main():
    urls = [
        "https://api.github.com",
        "https://api.github.com/users/xdfqgg",
    ]
    results = await fetch_all(urls)
    for i, body in enumerate(results):
        print(f"[{i}] {len(body)} 字节")

asyncio.run(main())`,
  },
  // ---- 更多 TypeScript ----
  {
    id: 'ts-discriminated',
    name: '可辨识联合类型',
    language: 'TypeScript',
    code: `type ApiState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }

function renderState<T>(state: ApiState<T>) {
  switch (state.status) {
    case 'idle':
      return '点击加载按钮开始'
    case 'loading':
      return '加载中...'
    case 'success':
      return \`数据: \${JSON.stringify(state.data)}\`
    case 'error':
      return \`出错了: \${state.error}\`
  }
}`,
  },
  {
    id: 'ts-zod',
    name: '运行时类型校验（类似 Zod）',
    language: 'TypeScript',
    code: `// 简易版 Zod 实现
type Schema<T> = {
  parse: (value: unknown) => T
}

function string(): Schema<string> {
  return {
    parse(value: unknown): string {
      if (typeof value !== 'string') {
        throw new Error(\`期望 string，得到 \${typeof value}\`)
      }
      return value
    },
  }
}

function object<T extends Record<string, Schema<unknown>>>(
  shape: T
): Schema<{ [K in keyof T]: T[K] extends Schema<infer U> ? U : never }> {
  return {
    parse(value: unknown) {
      if (typeof value !== 'object' || value === null) {
        throw new Error('期望 object')
      }
      const result = {} as Record<string, unknown>
      for (const key in shape) {
        result[key] = shape[key].parse((value as never)[key])
      }
      return result as never
    },
  }
}

const UserSchema = object({ name: string(), email: string() })
const user = UserSchema.parse({ name: 'Alice', email: 'alice@x.com' })`,
  },
  // ---- 更多算法 ----
  {
    id: 'algo-dp',
    name: '动态规划：最长公共子序列',
    language: 'TypeScript',
    code: `function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length
  const n = text2.length
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  )

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  return dp[m][n]
}`,
  },
  {
    id: 'algo-bfs',
    name: 'BFS 层序遍历二叉树',
    language: 'TypeScript',
    code: `class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val: number) {
    this.val = val
    this.left = null
    this.right = null
  }
}

function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return []

  const result: number[][] = []
  const queue: TreeNode[] = [root]

  while (queue.length > 0) {
    const levelSize = queue.length
    const level: number[] = []

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!
      level.push(node.val)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }

    result.push(level)
  }

  return result
}`,
  },
  {
    id: 'algo-sliding',
    name: '滑动窗口：最长无重复子串',
    language: 'TypeScript',
    code: `function lengthOfLongestSubstring(s: string): number {
  const seen = new Map<string, number>()
  let left = 0
  let maxLen = 0

  for (let right = 0; right < s.length; right++) {
    const char = s[right]

    if (seen.has(char) && seen.get(char)! >= left) {
      left = seen.get(char)! + 1
    }

    seen.set(char, right)
    maxLen = Math.max(maxLen, right - left + 1)
  }

  return maxLen
}

// 示例
console.log(lengthOfLongestSubstring("abcabcbb")) // 3
console.log(lengthOfLongestSubstring("bbbbb"))    // 1`,
  },
  // ---- HTML ----
  {
    id: 'html-semantic',
    name: '语义化 HTML5',
    language: 'HTML',
    code: `<header>
  <nav aria-label="主导航">
    <a href="/">首页</a>
    <a href="/blog">博客</a>
    <a href="/about">关于</a>
  </nav>
</header>

<main>
  <article>
    <h1>文章标题</h1>
    <time datetime="2026-08-02">2026 年 8 月 2 日</time>
    <p>这是文章正文内容……</p>
  </article>

  <aside>
    <h2>相关文章</h2>
    <ul>
      <li><a href="#">上一篇</a></li>
      <li><a href="#">下一篇</a></li>
    </ul>
  </aside>
</main>

<footer>
  <p>&copy; 2026 xdfqgg</p>
</footer>`,
  },
  {
    id: 'html-form',
    name: '表单 + 无障碍',
    language: 'HTML',
    code: `<form aria-labelledby="signup-title" novalidate>
  <h2 id="signup-title">注册账号</h2>

  <label for="username">用户名</label>
  <input
    id="username"
    type="text"
    name="username"
    required
    minlength="3"
    aria-describedby="username-hint"
  />
  <small id="username-hint">至少 3 个字符</small>

  <label for="email">邮箱</label>
  <input id="email" type="email" name="email" required />

  <fieldset>
    <legend>偏好设置</legend>
    <label>
      <input type="checkbox" name="newsletter" checked />
      订阅新闻邮件
    </label>
  </fieldset>

  <button type="submit">注册</button>
</form>`,
  },
  // ---- SQL ----
  {
    id: 'sql-join',
    name: '多表 JOIN 查询',
    language: 'SQL',
    code: `SELECT
  u.id,
  u.username,
  u.email,
  COUNT(o.id) AS order_count,
  COALESCE(SUM(o.total), 0) AS total_spent
FROM users u
LEFT JOIN orders o
  ON u.id = o.user_id
  AND o.status = 'completed'
WHERE u.is_active = true
GROUP BY u.id, u.username, u.email
HAVING COUNT(o.id) > 0
ORDER BY total_spent DESC
LIMIT 10;`,
  },
  {
    id: 'sql-subquery',
    name: '子查询 + CTE',
    language: 'SQL',
    code: `WITH monthly_stats AS (
  SELECT
    DATE_TRUNC('month', created_at) AS month,
    COUNT(*) AS total_orders,
    SUM(total) AS revenue
  FROM orders
  WHERE created_at >= DATE('now', '-12 months')
  GROUP BY DATE_TRUNC('month', created_at)
)

SELECT
  month,
  total_orders,
  revenue,
  ROUND(
    revenue * 100.0 / SUM(revenue) OVER (),
    2
  ) AS pct_of_year
FROM monthly_stats
ORDER BY month DESC;`,
  },
  // ---- Bash / Shell ----
  {
    id: 'bash-script',
    name: 'Bash 脚本基础',
    language: 'Bash',
    code: `#!/bin/bash
set -euo pipefail

PROJECT_DIR="/app/code-typing"
BACKUP_DIR="/backups/\$(date +%Y%m%d)"

echo "=== 开始部署 ==="

# 创建备份
mkdir -p "$BACKUP_DIR"
cp -r "$PROJECT_DIR/dist" "$BACKUP_DIR/"

# 构建
cd "$PROJECT_DIR"
npm ci --production
npm run build

# 检查构建结果
if [ ! -d "dist" ]; then
  echo "❌ 构建失败" >&2
  exit 1
fi

echo "✅ 部署完成 (\$(du -sh dist | cut -f1))"`,
  },
  {
    id: 'bash-git',
    name: 'Git 自动化脚本',
    language: 'Bash',
    code: `#!/bin/bash
# 批量 git pull 所有子目录
for dir in */; do
  if [ -d "$dir/.git" ]; then
    echo "→ 更新 $dir"
    (
      cd "$dir"
      git fetch --prune
      git pull --rebase
    )
  fi
done

echo "全部更新完成 ✅"`,
  },
  // ---- 进阶 React ----
  {
    id: 'react-custom-hook',
    name: '自定义 Hook：useLocalStorage',
    language: 'TypeScript',
    code: `function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value
        window.localStorage.setItem(key, JSON.stringify(next))
        return next
      })
    },
    [key],
  )

  return [storedValue, setValue]
}`,
  },
  {
    id: 'react-reducer',
    name: 'useReducer 购物车',
    language: 'TypeScript',
    code: `type CartItem = { id: number; name: string; price: number; qty: number }

type CartAction =
  | { type: 'ADD'; item: Omit<CartItem, 'qty'> }
  | { type: 'REMOVE'; id: number }
  | { type: 'UPDATE_QTY'; id: number; qty: number }
  | { type: 'CLEAR' }

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find((i) => i.id === action.item.id)
      if (existing) {
        return state.map((i) =>
          i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...state, { ...action.item, qty: 1 }]
    }
    case 'REMOVE':
      return state.filter((i) => i.id !== action.id)
    case 'UPDATE_QTY':
      return state.map((i) =>
        i.id === action.id ? { ...i, qty: action.qty } : i
      )
    case 'CLEAR':
      return []
  }
}`,
  },
]
