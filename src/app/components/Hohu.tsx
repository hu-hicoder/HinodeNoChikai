// import { FormEvent } from 'react';
import '../globals.css';
import { revalidatePath } from "next/cache";
import { client } from "../../../libs/client";

type dataType = {
  contents: contentsType[]
  totalCount: number
  offset: number
  limit: number
}
type contentsType = {
  id: string
  hohu: string
}

export default async function Hohu() {
  //microCMSからデータを取得する処理
  const data: dataType = await client.get({
    endpoint: 'hohu', //microCMSで設定したもの
    queries: { fields: 'id,hohu', limit: 1},
  })

  const createHohu = async (formData: FormData) => {
    'use server'
    const hohu = formData.get('hohu') as string
    const sendData = `{"hohu":"${hohu}"}`
    // microCMSへの登録処理
    await client.create({
      endpoint: 'hohu', //microCMSで設定したもの
      content: JSON.parse(sendData),
    })
    // 登録処理後、/hohuをrevalidateする 
    revalidatePath('/hohu','page')
  }

  return (
    <main className="flex flex-col items-center justify-start min-h-screen sky-gradient">
      <form
        action={createHohu}
        className="flex flex-col gap-3 justify-center mt-6"
      >
        <label htmlFor="goal" className="text-white text-lg font-medium">今年の抱負</label>
        <input
          type="text"
          id="hohu"
          name='hohu'
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
      <div id="hohu-list" className="text-white flex-col items-center justify-center mt-3 ">
        {data?.contents.map((value, index) => (
          <div key={index} className="flex my-[0.5rem]">
            <li className="w-[20rem] text-center">{value.hohu}</li>
          </div>
        ))}
      </div>
      {/* <div id="sunrise-animation" style={{ display: 'none' }}>
        <h2>初日の出の演出!</h2>
      </div> */}
    </main>
  )
}