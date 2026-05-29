import axios from "axios"

export const imageUpload = async image => {
    console.log(process.env.NEXT_PUBLIC_IMGBB_API_KEY,'this is env key')
  const formData = new FormData()
  formData.append('image', image)
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    formData
  )

  return data
}
