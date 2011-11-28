#@todo generalize the ftclip function
# to make use of the urlescaping stuff

#@todo this should maybe go in .ftrc
ftIP='10.0.2.2:9090';

function ftclip() { 
	local data;
	if (($#)) #if [num_args], basically (true if called like `ftpclip 'foo'`) 
	then data=$1;
	else data=$(cat);
	fi;
	encoded_value="$( echo -n "${data}" | python -c "import urllib; import sys; sys.stdout.write(urllib.quote(sys.stdin.read()))" )";
	#encoded_value=$(php -r 'echo urlencode($argv[1]);' "$data");
	#echo $encoded_value;
	curl --data "action=copy&bin=$encoded_value" $ftIP;
	#echo "<$data>";
}
