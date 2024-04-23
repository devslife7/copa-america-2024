export default function RootLayout(props: any) {
  console.log("renders layout")
  console.log("props id here", props)
  props.params.newProp = "testing"
  return <div lang="en">{props.children}</div>
}
