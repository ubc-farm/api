const html = (head, body) => `
<!doctype html>
<html>
	<head>
		<meta charSet="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<title>Testing</title>
		<script async src="/js/vendor/analytics.js"></script>
		<script src="/js/vendor/system.js"></script>
		<script src="/js/sys-config.js"></script>
		<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700' 
			rel='stylesheet'/>
		<link href='/css/base.css' rel='stylesheet'>
		<link href='/css/module/hover-light.css' rel='stylesheet'>
		${head}
	</head>
	<body>
		<div id='app-mount'>${body}</div>
	</body>
</html>
`

export default html;