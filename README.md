# Reddit Media server

Fukurokuju is a [Node-Express](https://expressjs.com) parse server created with [@Snowb1ind](https://github.com/Snowb1ind) for dealing with big reddit api json.
For now works only with subreddits and posts.

## Comparsion

* `https://www.reddit.com/.json?limit=25`   ~ 240k-250k symbols
* Fukurokuju *(limit=25)*               ~ 7k symbols (default settings)

## Installation

```bash
git clone https://github.com/Sarmirim/Fukurokuju.git && cd ./Fukurokuju
npm init
```

or

```bash
docker build --label latest --tag fukurokujo .
docker run -d -p 8085:8085 --name fukurokujo fukurokujo
```

## Usage

```bash
npm run server  // node reddit.js
```

or

```bash
npm run dev     // nodemon reddit.js
```

---

`http://localhost:8085/`

## Settings

**Default:**

```ini
port = 8085
reddit_link = https://www.reddit.com/r/all/.json?limit=25
```

You can use Fukutokujo with any links to subreddits or posts:

**Subreddit:** `http://localhost:8085/https://www.reddit.com/r/all.json?limit=25`

**Post:** `http://localhost:8085/https://www.reddit.com/comments/cjlngm`
