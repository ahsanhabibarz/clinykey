import { Is_Open } from "./types";
// Register
export const OpenNav = () => dispatch => {
  dispatch({
    type: Is_Open
  });
};
