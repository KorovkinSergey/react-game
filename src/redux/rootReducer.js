import {combineReducers} from 'redux'
import {appReducer} from './App/appReducer'
import {formReducer} from './Form/formReducer'
import {flipReducer} from './Flip/flipReducer'
import {recordsReducer} from './Records/recordsReducer'

export const rootReducer = combineReducers({
	app: appReducer,
	form: formReducer,
	flip:flipReducer,
	records:recordsReducer
})
