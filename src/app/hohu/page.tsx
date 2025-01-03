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

export default async function getHohu(){  
  //microCMSからデータを取得する処理
  const data: dataType = await client.get({
    endpoint: 'hohu', //microCMSで設定したもの
    queries: { fields: 'id,hohu' },
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
  
  return(
    <>
      <div className="mt-[1rem] w-full mx-[2rem]">
        <h2 className="text-[1.6rem]">List</h2>
          {data?.contents.map((value, index) => (
            <div key={index} className="flex my-[0.5rem]">
              <li className="w-[20rem]">{value.hohu}</li>
            </div>
          ))}
      </div>
      <div className="mt-[1rem] w-full mx-[2rem]">
        <h2 className="text-[1.6rem] mb-[0.5rem]">Create</h2>
        <form action={createHohu}>
          <input type="text" name="hohu" placeholder="入力してください" defaultValue={""} className="border-solid border-[0.1rem] mr-[0.5rem]"/>
          <input type="submit" value="送信" className="bg-blue-500 text-white rounded-[0.8rem] px-[1rem] cursor-pointer"/>
        </form>
      </div>
    </>
  )
}