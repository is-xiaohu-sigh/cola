'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-8"
      >
        <h1 className="mb-6 text-center text-2xl font-semibold text-white">登录</h1>
        <div className="mb-4">
          <label className="mb-1 block text-sm text-zinc-400">邮箱</label>
          <input
            type="email"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 outline-none focus:border-zinc-500"
            placeholder="you@example.com"
          />
        </div>
        <div className="mb-6">
          <label className="mb-1 block text-sm text-zinc-400">密码</label>
          <input
            type="password"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 outline-none focus:border-zinc-500"
            placeholder="任意密码即可"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-white px-4 py-2.5 font-medium text-zinc-900 transition hover:bg-zinc-200"
        >
          登录
        </button>
        <p className="mt-4 text-center text-xs text-zinc-500">
          占位登录：任意输入即可进入
        </p>
      </form>
    </div>
  );
}
