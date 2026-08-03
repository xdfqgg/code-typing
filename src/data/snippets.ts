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
      Clicked {count} times
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

  if (loading) return <p>Loading...</p>
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
    code: `squares = [x**2 for x in range(10)]

evens = [x for x in range(20) if x % 2 == 0]

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
        print(f"{func.__name__} took {elapsed:.4f}s")
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
            print(f"Error: {exc_val}")
        return False

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
        print(f"[{i}] {len(body)} bytes")

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
      return 'Click to load'
    case 'loading':
      return 'Loading...'
    case 'success':
      return \`Data: \${JSON.stringify(state.data)}\`
    case 'error':
      return \`Error: \${state.error}\`
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
        throw new Error(\`Expected string, got \${typeof value}\`)
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
        throw new Error('Expected object')
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

console.log(lengthOfLongestSubstring("abcabcbb"))
console.log(lengthOfLongestSubstring("bbbbb"))`,
  },
  // ---- HTML ----
  {
    id: 'html-semantic',
    name: '语义化 HTML5',
    language: 'HTML',
    code: `<header>
  <nav aria-label="Main nav">
    <a href="/">Home</a>
    <a href="/blog">Blog</a>
    <a href="/about">About</a>
  </nav>
</header>

<main>
  <article>
    <h1>Article Title</h1>
    <time datetime="2026-08-02">2026 年 8 月 2 日</time>
    <p>This is the article content...</p>
  </article>

  <aside>
    <h2>Related</h2>
    <ul>
      <li><a href="#">Previous</a></li>
      <li><a href="#">Next</a></li>
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
  <h2 id="signup-title">Sign Up</h2>

  <label for="username">Username</label>
  <input
    id="username"
    type="text"
    name="username"
    required
    minlength="3"
    aria-describedby="username-hint"
  />
  <small id="username-hint">At least 3 characters</small>

  <label for="email">Email</label>
  <input id="email" type="email" name="email" required />

  <fieldset>
    <legend>Preferences</legend>
    <label>
      <input type="checkbox" name="newsletter" checked />
      Subscribe to newsletter
    </label>
  </fieldset>

  <button type="submit">Sign Up</button>
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

echo "=== Starting Deployment ==="

mkdir -p "$BACKUP_DIR"
cp -r "$PROJECT_DIR/dist" "$BACKUP_DIR/"

cd "$PROJECT_DIR"
npm ci --production
npm run build

if [ ! -d "dist" ]; then
  echo "❌ Build failed" >&2
  exit 1
fi

echo "✅ Deploy complete (\$(du -sh dist | cut -f1))"`,
  },
  {
    id: 'bash-git',
    name: 'Git 自动化脚本',
    language: 'Bash',
    code: `#!/bin/bash
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

echo "All repos updated ✅"`,
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
  // ============ 新增语言 ============

  // ---- Rust ----
  {
    id: 'rust-ownership',
    name: '所有权与借用',
    language: 'Rust',
    code: `fn main() {
    let s1 = String::from("hello");
    let s2 = &s1;
    println!("{} {}", s1, s2); // s1 仍可用

    let mut v = vec![1, 2, 3];
    v.push(4);
    let sum: i32 = v.iter().sum();
    println!("sum = {}", sum);
}`,
  },
  {
    id: 'rust-enum',
    name: '枚举与模式匹配',
    language: 'Rust',
    code: `enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(u8, u8, u8),
}

fn process(msg: Message) {
    match msg {
        Message::Quit => println!("退出"),
        Message::Move { x, y } => println!("移到 ({}, {})", x, y),
        Message::Write(text) => println!("写入: {}", text),
        Message::ChangeColor(r, g, b) => println!("颜色: #{:02x}{:02x}{:02x}", r, g, b),
    }
}`,
  },
  {
    id: 'rust-iterator',
    name: '迭代器链',
    language: 'Rust',
    code: `fn top_three(words: &[&str]) -> Vec<String> {
    words
        .iter()
        .filter(|w| w.len() > 2)
        .map(|w| w.to_uppercase())
        .take(3)
        .collect()
}

fn main() {
    let words = ["hi", "hello", "rust", "world", "ok"];
    let result = top_three(&words);
    println!("{:?}", result);
}`,
  },
  // ---- Go ----
  {
    id: 'go-goroutine',
    name: 'Goroutine + Channel',
    language: 'Go',
    code: `package main

import (
    "fmt"
    "time"
)

func worker(id int, jobs <-chan string, results chan<- string) {
    for job := range jobs {
        time.Sleep(500 * time.Millisecond)
        results <- fmt.Sprintf("worker %d done: %s", id, job)
    }
}

func main() {
    jobs := make(chan string, 5)
    results := make(chan string, 5)

    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }

    for _, j := range []string{"a", "b", "c"} {
        jobs <- j
    }
    close(jobs)

    for i := 0; i < 3; i++ {
        fmt.Println(<-results)
    }
}`,
  },
  {
    id: 'go-interface',
    name: '接口与多态',
    language: 'Go',
    code: `package main

import "fmt"

type Shape interface {
    Area() float64
}

type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    return 3.14 * c.Radius * c.Radius
}

type Rectangle struct {
    Width, Height float64
}

func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

func printArea(s Shape) {
    fmt.Printf("面积: %.2f\n", s.Area())
}

func main() {
    printArea(Circle{Radius: 5})
    printArea(Rectangle{Width: 3, Height: 4})
}`,
  },
  {
    id: 'go-defer',
    name: 'defer 资源管理',
    language: 'Go',
    code: `package main

import (
    "fmt"
    "os"
)

func readConfig(path string) error {
    file, err := os.Open(path)
    if err != nil {
        return fmt.Errorf("open failed: %w", err)
    }
    defer file.Close()

    data := make([]byte, 1024)
    n, err := file.Read(data)
    if err != nil {
        return fmt.Errorf("read failed: %w", err)
    }

    fmt.Printf("read %d bytes\\n", n)
    return nil
}`,
  },
  // ---- Java ----
  {
    id: 'java-stream',
    name: 'Stream API',
    language: 'Java',
    code: `import java.util.*;
import java.util.stream.*;

public class StreamDemo {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");

        List<String> result = names.stream()
            .filter(name -> name.length() > 3)
            .map(String::toUpperCase)
            .sorted()
            .collect(Collectors.toList());

        System.out.println(result);

        long count = names.stream()
            .filter(name -> name.startsWith("A"))
            .count();
        System.out.println("以A开头: " + count);
    }
}`,
  },
  {
    id: 'java-optional',
    name: 'Optional 空值处理',
    language: 'Java',
    code: `import java.util.Optional;

public class UserService {
    private Map<Long, User> db = new HashMap<>();

    public Optional<User> findById(Long id) {
        return Optional.ofNullable(db.get(id));
    }

    public String getUserName(Long id) {
        return findById(id)
            .map(User::getName)
            .orElse("未知用户");
    }

    public void greet(Long id) {
        findById(id).ifPresentOrElse(
            user -> System.out.println("你好, " + user.getName()),
            () -> System.out.println("用户不存在")
        );
    }
}`,
  },
  // ---- C++ ----
  {
    id: 'cpp-smartptr',
    name: '智能指针',
    language: 'C++',
    code: `#include <iostream>
#include <memory>
#include <vector>

struct Node {
    int value;
    std::shared_ptr<Node> next;

    Node(int v) : value(v) {}
};

int main() {
    auto head = std::make_shared<Node>(1);
    head->next = std::make_shared<Node>(2);
    head->next->next = std::make_shared<Node>(3);

    auto curr = head;
    while (curr) {
        std::cout << curr->value << " ";
        curr = curr->next;
    }
    std::cout << std::endl;

    return 0;
}`,
  },
  {
    id: 'cpp-template',
    name: '模板元编程',
    language: 'C++',
    code: `#include <iostream>
#include <vector>
#include <algorithm>

template <typename T>
T max_element(const std::vector<T>& vec) {
    if (vec.empty()) throw std::runtime_error("空向量");
    T max_val = vec[0];
    for (const auto& v : vec) {
        if (v > max_val) max_val = v;
    }
    return max_val;
}

int main() {
    std::vector<int> nums = {3, 7, 2, 9, 1};
    std::cout << "最大值: " << max_element(nums) << std::endl;

    std::vector<std::string> words = {"apple", "zebra", "cat"};
    std::cout << "最大: " << max_element(words) << std::endl;
}`,
  },
  // ---- Ruby ----
  {
    id: 'ruby-block',
    name: 'Block 与迭代器',
    language: 'Ruby',
    code: `def with_timing
  start = Time.now
  result = yield
  elapsed = Time.now - start
  puts "耗时: #{elapsed.round(4)}s"
  result
end

data = with_timing do
  (1..1_000_000).select(&:odd?).sum
end

puts "结果: #{data}"

[3, 1, 4, 1, 5]
  .select { |n| n > 2 }
  .map { |n| n * n }
  .each { |n| puts n }`,
  },
  {
    id: 'ruby-mixin',
    name: 'Mixin 模块',
    language: 'Ruby',
    code: `module Loggable
  def log(message)
    puts "[#{self.class}] #{Time.now}: #{message}"
  end
end

module Serializable
  def to_json(*keys)
    hash = keys.each_with_object({}) { |k, h| h[k] = send(k) }
    hash.to_json
  end
end

class Order
  include Loggable
  include Serializable

  attr_reader :id, :total

  def initialize(id, total)
    @id = id
    @total = total
    log "Order #{id} created"
  end
end`,
  },
  // ---- PHP ----
  {
    id: 'php-types',
    name: '类型声明与匹配',
    language: 'PHP',
    code: `<?php

enum Status: string {
    case Draft = 'draft';
    case Published = 'published';
    case Archived = 'archived';
}

function getLabel(Status $status): string {
    return match ($status) {
        Status::Draft => '草稿',
        Status::Published => '已发布',
        Status::Archived => '已归档',
    };
}

function findUser(int $id): ?array {
    $users = [1 => ['name' => 'Alice'], 2 => ['name' => 'Bob']];
    return $users[$id] ?? null;
}`,
  },
  {
    id: 'php-array',
    name: '数组函数链',
    language: 'PHP',
    code: `<?php

$orders = [
    ['id' => 1, 'total' => 120, 'status' => 'paid'],
    ['id' => 2, 'total' => 80, 'status' => 'pending'],
    ['id' => 3, 'total' => 200, 'status' => 'paid'],
];

$paidTotals = array_sum(
    array_column(
        array_filter($orders, fn($o) => $o['status'] === 'paid'),
        'total'
    )
);

$grouped = array_reduce($orders, function ($carry, $order) {
    $carry[$order['status']][] = $order;
    return $carry;
}, []);`,
  },
  // ---- Swift ----
  {
    id: 'swift-async',
    name: 'async/await 网络请求',
    language: 'Swift',
    code: `struct Post: Codable {
    let id: Int
    let title: String
    let body: String
}

func fetchPosts() async throws -> [Post] {
    let url = URL(string: "https://jsonplaceholder.typicode.com/posts")!
    let (data, _) = try await URLSession.shared.data(from: url)
    let posts = try JSONDecoder().decode([Post].self, from: data)
    return Array(posts.prefix(5))
}

Task {
    do {
        let posts = try await fetchPosts()
        for post in posts {
            print("\\(post.id): \\(post.title)")
        }
    } catch {
        print("请求失败: \\(error)")
    }
}`,
  },
  {
    id: 'swift-enum',
    name: '关联值枚举',
    language: 'Swift',
    code: `enum APIResult<T> {
    case success(T)
    case failure(Error)
}

func handle<T>(_ result: APIResult<T>) -> String {
    switch result {
    case .success(let value):
        return "成功: \\(value)"
    case .failure(let error):
        return "失败: \\(error.localizedDescription)"
    }
}

protocol Identifiable {
    var id: String { get }
}

extension Identifiable {
    func identify() -> String { "ID: \\(id)" }
}`,
  },
  // ---- Kotlin ----
  {
    id: 'kotlin-coroutine',
    name: '协程与挂起函数',
    language: 'Kotlin',
    code: `import kotlinx.coroutines.*

suspend fun fetchUser(id: Int): String {
    delay(1000)
    return "User(id=$id, name=Alice)"
}

suspend fun main() = coroutineScope {
    val users = (1..5).map { id ->
        async { fetchUser(id) }
    }

    users.awaitAll().forEach { println(it) }
    println("全部获取完成")
}`,
  },
  {
    id: 'kotlin-scope',
    name: '作用域函数',
    language: 'Kotlin',
    code: `data class Config(
    var host: String = "localhost",
    var port: Int = 8080,
    var debug: Boolean = false
)

fun main() {
    val config = Config().apply {
        host = "0.0.0.0"
        port = 3000
    }

    val info = config.run {
        "http://$host:$port"
    }

    config.let { cfg ->
        if (cfg.debug) println("调试模式")
    }

    val env = System.getenv("APP_ENV") ?: "development"
    println("环境: $env")
}`,
  },
  // ---- Lua ----
  {
    id: 'lua-table',
    name: 'Table 作为数组/字典',
    language: 'Lua',
    code: `local function map(tbl, fn)
    local result = {}
    for i, v in ipairs(tbl) do
        result[i] = fn(v, i)
    end
    return result
end

local function filter(tbl, pred)
    local result = {}
    for _, v in ipairs(tbl) do
        if pred(v) then
            table.insert(result, v)
        end
    end
    return result
end

local nums = {1, 2, 3, 4, 5, 6}
local odds = filter(nums, function(n) return n % 2 == 1 end)
local squared = map(odds, function(n) return n * n end)

for _, v in ipairs(squared) do print(v) end`,
  },
  // ---- R ----
  {
    id: 'r-dplyr',
    name: 'dplyr 数据操作',
    language: 'R',
    code: `library(dplyr)

data <- tibble(
  name = c("Alice", "Bob", "Charlie", "Diana"),
  age = c(25, 30, 35, 28),
  salary = c(50000, 60000, 75000, 55000)
)

result <- data %>%
  filter(age >= 28) %>%
  mutate(
    bracket = case_when(
      salary < 55000 ~ "low",
      salary < 70000 ~ "mid",
      TRUE ~ "high"
    )
  ) %>%
  group_by(bracket) %>%
  summarise(
    count = n(),
    avg_salary = mean(salary),
    .groups = "drop"
  )

print(result)`,
  },
  // ---- YAML ----
  {
    id: 'yaml-gh-action',
    name: 'GitHub Actions 工作流',
    language: 'YAML',
    code: `name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci
      - run: npm run build

      - name: Deploy
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: \${{ secrets.CF_API_TOKEN }}
          command: pages deploy dist`,
  },
  {
    id: 'yaml-k8s',
    name: 'Kubernetes Deployment',
    language: 'YAML',
    code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: code-typing
  labels:
    app: code-typing
spec:
  replicas: 2
  selector:
    matchLabels:
      app: code-typing
  template:
    metadata:
      labels:
        app: code-typing
    spec:
      containers:
        - name: app
          image: xdfqgg/code-typing:latest
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: production`,
  },
  // ---- Dockerfile ----
  {
    id: 'docker-node',
    name: 'Node.js 多阶段构建',
    language: 'Dockerfile',
    code: `FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000
USER node
CMD ["node", "dist/server.js"]`,
  },
  // ---- GraphQL ----
  {
    id: 'graphql-schema',
    name: 'Schema + Resolver',
    language: 'GraphQL',
    code: `type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
  createdAt: String!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  likes: Int!
}

type Query {
  user(id: ID!): User
  posts(page: Int = 1): [Post!]!
  search(query: String!): [Post!]!
}

type Mutation {
  createPost(title: String!, content: String!): Post!
  deletePost(id: ID!): Boolean!
  likePost(id: ID!): Post!
}`,
  },
  // ---- Zig ----
  {
    id: 'zig-alloc',
    name: '分配器与切片',
    language: 'Zig',
    code: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var list = std.ArrayList(i32).init(allocator);
    defer list.deinit();

    var i: i32 = 0;
    while (i < 10) : (i += 1) {
        try list.append(i * i);
    }

    const slice = list.items;
    std.debug.print("平方数: {any}\\n", .{slice});
}`,
  },
  // ============ 已有语言补充 ============

  // ---- 更多 TypeScript ----
  {
    id: 'ts-decorator',
    name: '装饰器模式（简易实现）',
    language: 'TypeScript',
    code: `function logged(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value
  descriptor.value = function (...args: any[]) {
    console.log(\`调用 \${key}(\${args.join(', ')})\`)
    const result = original.apply(this, args)
    console.log(\`返回 \${JSON.stringify(result)}\`)
    return result
  }
}

class Calculator {
  @logged
  add(a: number, b: number): number {
    return a + b
  }
}

const calc = new Calculator()
calc.add(3, 4)`,
  },
  {
    id: 'ts-builder',
    name: 'Builder 模式',
    language: 'TypeScript',
    code: `class QueryBuilder {
  private tableName = ''
  private fields: string[] = ['*']
  private conditions: string[] = []
  private limitCount = 0

  from(table: string): this {
    this.tableName = table
    return this
  }

  select(...fields: string[]): this {
    this.fields = fields
    return this
  }

  where(cond: string): this {
    this.conditions.push(cond)
    return this
  }

  limit(n: number): this {
    this.limitCount = n
    return this
  }

  build(): string {
    let sql = \`SELECT \${this.fields.join(', ')} FROM \${this.tableName}\`
    if (this.conditions.length) sql += ' WHERE ' + this.conditions.join(' AND ')
    if (this.limitCount) sql += \` LIMIT \${this.limitCount}\`
    return sql
  }
}`,
  },
  // ---- 更多 Python ----
  {
    id: 'py-dataclass',
    name: 'dataclass + 类型标注',
    language: 'Python',
    code: `from dataclasses import dataclass, field
from typing import Optional

@dataclass
class Task:
    title: str
    done: bool = False
    tags: list[str] = field(default_factory=list)

    def toggle(self) -> None:
        self.done = not self.done

@dataclass
class Project:
    name: str
    tasks: list[Task] = field(default_factory=list)

    def progress(self) -> float:
        if not self.tasks:
            return 0.0
        done = sum(1 for t in self.tasks if t.done)
        return done / len(self.tasks)

p = Project("CodeTyping")
p.tasks = [Task("写 hook"), Task("加题库")]`,
  },
  // ---- 更多 Bash ----
  {
    id: 'bash-trap',
    name: 'trap 信号处理',
    language: 'Bash',
    code: `#!/bin/bash
set -euo pipefail

cleanup() {
    local exit_code=\$?
    echo "清理中..."
    [ -n "\${TEMP_DIR:-}" ] && rm -rf "\$TEMP_DIR"
    echo "退出码: \$exit_code"
}
trap cleanup EXIT

TEMP_DIR=\$(mktemp -d)
echo "临时目录: \$TEMP_DIR"

curl -s "https://api.github.com/repos/xdfqgg/code-typing" \\
    > "\$TEMP_DIR/repo.json"

stars=\$(jq -r '.stargazers_count' "\$TEMP_DIR/repo.json")
echo "Stars: \$stars"`,
  },
]
