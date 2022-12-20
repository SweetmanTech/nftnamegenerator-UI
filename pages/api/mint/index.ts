import axios from "axios"

export default async function handler(req, res) {
  const { query } = req
  const { name, description, imageUri, recipient } = query
  try {
    await axios.post(process.env.DEFENDER_AUTOTASK_WEBHOOK, {
      name: name || "NAME FROM API",
      description: description || "relay description from POSTMAN",
      imageUri:
        imageUri || "ipfs://bafybeidyqy7n2defa767w64g4oj4n63whgfl7mtigwqq6co3i6kg4qlo5u/lilnoun-6473.png",
      recipient: recipient || "0xcfBf34d385EA2d5Eb947063b67eA226dcDA3DC38",
    })
    res.status(200).json({ name: 'John Doe' })
  } catch (err) {
    res.status(200).json(err)
  }
}