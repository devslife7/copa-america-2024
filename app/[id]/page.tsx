import usersPredictions from "../../data/predictions.json"
export default function userPredictions({ params }: { params: { id: number } }) {
  const user = usersPredictions.find(user => user.id == params.id)
  if (!user) return <div>User not found</div>
  const { id, name, predictionGroupStage } = user
  console.log("predictionGroupStage", predictionGroupStage)

  return (
    <div>
      <div>{id}</div>
      <div>{name}</div>
    </div>
  )
}
