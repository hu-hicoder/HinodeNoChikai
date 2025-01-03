'use client';
import { FormEvent, useState } from 'react';
import '../globals.css';

const Hohu = () => {
  const [goal, setGoal] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // 目標をAPIに送信する処理をここに追加
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen sky-gradient">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 justify-center mt-6"
      >
        <label htmlFor="goal" className="text-white text-lg font-medium">今年の抱負</label>
        <input
          type="text"
          id="goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder='例: 今年は健康第一でいきます!'
          required
          className="border border-gray-300 p-2 rounded-md"
        />
        <button
          type="submit"
          className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          目標を設定
        </button>
      </form>
      {/* <div id="sunrise-animation" style={{ display: 'none' }}>
        <h2>初日の出の演出!</h2>
      </div> */}
    </main>
  )
}

export default Hohu