# Reddit Media server

Fukurokuju is a Node-Express parse server for dealing with big reddit-json api.

Today works with subreddits and posts 

# EXAMPLE

    https://www.reddit.com/.json?limit=25   ~~ 240k-250k symbols

    Fukurokuju with limit=25                ~~ 7k symbols (initial settings)

# Installation

```bash
git clone https://github.com/Sarmirim/Fukurokuju.git
cd ./Fukurokuju
npm init
```

# Usage

## start server
```javascript
npm run server  //node reddit.js
npm run dev     //nodemon reddit.js
```
## use server
```html
initial settings:
port = 8085
reddit_link = https://www.reddit.com/r/all/.json?limit=25

http://localhost:port/reddit_link


subreddit example:
http://localhost:8085/https://www.reddit.com/r/all.json?limit=25 

post example:
http://localhost:8085/https://www.reddit.com/comments/cjlngm
```