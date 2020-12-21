import Records from '../pages/Records'
import Registration from '../pages/Registration'
import Flip from '../pages/Flip'
import User from '../pages/UserPage'

let routes = [
	{
		name: 'flip',
		url: '/',
		component: Flip,
		exact: true
	},
	{
		name: 'records',
		url: '/records',
		component: Records,
		exact: true
	},
	{
		name: 'registration',
		url: '/registration',
		component: Registration,
		exact: true
	},
	{
		name: 'user',
		url: '/user',
		component: User,
		exact: true
	},

	{
		url: '**',
		component: Flip
	}
];

let routesMap = {}


routes.forEach((route) => {
	if(route.hasOwnProperty('name')){
		routesMap[route.name] = route.url
	}
})

let urlBuilder = function(name, params){
	if(!routesMap.hasOwnProperty(name)){
		return null
	}
	let url = routesMap[name]; // news/:id
	for(let key in params){
		url = url.replace(':' + key, params[key])
	}
	return url
}

export default routes
export {routesMap, urlBuilder}
