This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
  项目结构

  cola/
  ├── .env                          # 环境变量（已生成）
  ├── .env.example                  # 模板，可分享给团队
  ├── src/
  │   ├── auth.ts                   # NextAuth 配置（占位认证）
  │   ├── middleware.ts             # 路由守卫，未登录跳转到 /login
  │   ├── lib/
  │   │   ├── ai-providers.ts       # AI 提供商：阿里百炼 + Ollama
  │   │   └── types.ts              # TypeScript 类型
  │   ├── components/
  │   │   ├── auth-provider.tsx     # SessionProvider 包装
  │   │   ├── chat-header.tsx       # 顶部栏：模型切换 + 用户信息
  │   │   ├── chat-input.tsx        # 输入框 + 发送按钮
  │   │   ├── chat-message.tsx      # 消息气泡（支持 Markdown）
  │   │   └── model-selector.tsx    # 模型下拉选择器
  │   └── app/
  │       ├── layout.tsx            # 根布局
  │       ├── globals.css           # 全局样式（暗色主题）
  │       ├── (chat)/page.tsx       # 聊天主页面
  │       ├── (auth)/login/page.tsx # 登录页面
  │       └── api/
  │           ├── chat/route.ts     # AI 对话 API（流式输出）
  │           └── auth/[...nextauth]/route.ts

  启动

  # 1. 配置环境变量
  cp .env.example .env
  # 编辑 .env 填入你的百炼 API Key

  # 2. 启动
  npm run dev

  使用前准备

  - 阿里百炼：在 .env 中设置 BAILIAN_API_KEY（从阿里云百炼控制台获取）
  - Ollama：确保本地已安装 Ollama 并拉取了模型（默认 llama3.2），Ollama 服务运行在
  localhost:11434

  关于认证

  当前是占位模式：任意邮箱+密码即可登录。后续可接入真实认证（数据库、OAuth 等）。

  关于持久化

  目前对话历史不持久化，刷新页面会清空。ai-providers.ts 和 API
  路由的结构已预留扩展点，后续加数据库存储对话历史只需修改 chat/route.ts 和添加一个持久化层。 