export default function(state = false, action) {
  switch (action.type) {
    case "Is_Open":
      return !state;
    default:
      return state;
  }
}
