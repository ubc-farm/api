const path = '/api/{path*}' //api path
const routes = [
	{
		path,
		method: 'PUT',
		handler//: 'create new at path'
	},
	{
		path,
		method: 'PATCH',
		handler//: 'update existing at path'
	},
	{
		path,
		method: 'POST',
		handler//: 'add to list'
	},
	{
		path,
		method: 'DELETE',
		handler//: 'remove at path'
	},
	{
		path,
		method: 'GET',
		handler//: 'retrive from path'
		//QUERY PARAMS:
		//auth=credential
		//print=pretty or print=silent
		//shallow - reduces non-primitives (ie Object) to just 'true'
		//orderBy: limitToFirst, limitToLast, startAt, endAt, equalTo
	}
]
export default routes;