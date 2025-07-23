import authSlice from "./authSlice";
import reminderSlice from "./reminderSlice";
import massageServiceSlice from './massageServiceSlice';
import caretakeSlice from './caretakerSlice';
import pageSlice from './pageSlice';
const combineSlices={
    authSlice,reminderSlice,massageServiceSlice,caretakeSlice,pageSlice
}
export default combineSlices