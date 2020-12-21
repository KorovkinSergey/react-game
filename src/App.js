import React from 'react'
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import routes from './routes/routes'




function App() {


	let routesComponents = routes.map((route) => {
		return <Route path={route.url}
									component={route.component}
									exact={route.exact}
									key={route.url}
		/>

	})


	return (
		<section className="teal lighten-5" style={{height:'100vh', display:'flex', flexDirection:'column'}}>
			<BrowserRouter>
				<Navbar/>
				<Switch>
					{routesComponents}
				</Switch>
			</BrowserRouter>
		</section>
	)
}

export default App
