import authSlice from "./authSlice";
import reminderSlice from "./reminderSlice";
import massageServiceSlice from './massageServiceSlice';
import caretakeSlice from './caretakerSlice';
const combineSlices={
    authSlice,reminderSlice,massageServiceSlice,caretakeSlice
}
export default combineSlices