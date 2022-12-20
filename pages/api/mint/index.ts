import axios from "axios"

export default async function handler(req, res) {
  await axios.post(process.env.DEFENDER_AUTOTASK_WEBHOOK, {
    name: "NAME FROM API",
    description: "relay description from POSTMAN",
    imageUri: "ipfs://bafybeidyqy7n2defa767w64g4oj4n63whgfl7mtigwqq6co3i6kg4qlo5u/lilnoun-6473.png"
})
  res.status(200).json({ name: 'John Doe' })
}