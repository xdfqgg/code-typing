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
]
