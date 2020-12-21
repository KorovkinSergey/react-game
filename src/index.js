import React from 'react'
import {render} from 'react-dom'
import reportWebVitals from './reportWebVitals'
import 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {applyMiddleware, compose, createStore} from 'redux'
import {rootReducer} from './redux/rootReducer'
import App from './App'


const store = createStore(rootReducer, compose(
	applyMiddleware(
		thunk
	),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

const app = (
	<Provider store={store}>
		<App/>
	</Provider>
)

render(app, document.getElementById('root'))



reportWebVitals();
