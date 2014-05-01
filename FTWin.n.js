var http = require('http'),
		querystring = require('querystring'),
		cp = require('child_process'),
		ip = '127.0.0.1',
		port = 9090,
		doLog = true,
		response = {code: 404, message: 'Method not found'},
		links_opened = 0,
		//urlopen curl --data "url=%U" 10.0.2.2:9090 %U
		actions = {
			urlopen : function(post){
				var url_to_open = post.url.match(/^'?(.+?)'?$/)[1],
				//these three lines are just for nicely numbered console history (up to 999)
				link_ind = ++links_opened + ".",
				ln = link_ind + Array(5 - link_ind.length).join(' ');//pad it
				if(doLog) console.log( ln + url_to_open);
				response = { code: 204, message: false };
				//open tab
				cp.spawn('c:\\Program Files (x86)\\Mozilla Firefox\\firefox.exe', ['-new-tab', url_to_open]);
			},

			/**
			 * @todo Works with line breaks but breaks when I send it my .bashrrc, e.g.
			 *       -> Figure out what sort of escaping is needed
			 */
			copy : function(post){
				//`clip.exe` ships with vista and win7
				var clipper = cp.spawn('C:\\Windows\\system32\\clip.exe');
				clipper.stdin.write(post.bin);
				clipper.stderr.on('data', function (data) {
					response = { code: 500, message: "It (clip) didn't work :(" };
					return;
				});
				if(doLog) console.log('clipped: ' + post.bin );
				clipper.stdin.end();
				clipper.on('exit', function (code) {
					response = { code: 204, message: false };
				});
			}
		};

http.createServer(function (req, res) {	
	var postString = ''; //the request post data
	if (req.method == 'POST') {
		req.on('data', function(chunk) {
			postString += chunk.toString();
		});
	}

	req.on('end', function() {
		//respond w/204 (success, no output)
		var postObj = querystring.parse(postString.toString());
		if(typeof (action = actions[postObj.action]) === 'function'){
			action(postObj);
		}
		postData = '';
		res.writeHead(response.code);
		res.end(response.message);
	});
}).listen(port, ip);
console.log('Server running at http://' + ip + ":" + port);
