# Purpose of this code
This project is something I created because I wanted to open links on my host windows machine web browser from an ssh session in putty.  A friend (Darcy) suggested a node server et voilà, ForTheWindows was born.  It's a node.js server that accepts requests (from curl in my case) and performs an action in windows. Currently I have url opening working (with firefox) and sending text to the windows clipboard.

The project has two main parts right now: the server and the shell tools.  I use curl to send requests to the node.js server but I want it to be easy to call the functions from bash and to pipe to them, ideally.  "As few dependencies as possible" and "easy to set up" are a couple guiding principals.  This project is supposed to make workflow easier; if you must spend hours making things work it's a failure right out of the gate.

## urlopen
Send a URL to windows to be opened in a new browse (Firefox) tab

## clip
Send text to the windows clipboard.  Relies on clip.exe (bundled with windows since Vista; you can download it for XP) and python on the client (for urlencoding).

# Roadmap/Wishlist
* paste
    There is no paste.exe to go with clip.exe!  Leave it to MSFT, right? :p I found [this article on the subject] [1] which provides some c# code.  When I've the time to get that up and running I'll include a paste.exe binary
* file copying
    I'd like to be able to FTCopy /path/to/my/file and have it copied to my windows machine.  Some security (quarantining, virus scanning (?) removing executable permissions etc) would be good here.
* security and/or whitelisting
    Obviously opening URLs, copying to the clipboard, moving files and especially accessing the clipboard from a remote machine presents security concerns.  I plan on incorporating a IP whitelist, then (ideally) implementing a "knock knock" command that could be run on the client to request access, which could be granted for the session on the server.


[1] http://huddledmasses.org/clipexe-and-the-missing-pasteexe/ "Clip.exe and the missing paste.exe"
