# Fukurokuju

Fukurokuju is a [Vanilla-Node](https://nodejs.org) parse server created with [@Snowb1ind](https://github.com/Snowb1ind) for dealing with big reddit api json.

For now works only with subreddits and posts.

- [Fukurokuju](#fukurokuju)
  - [Comparison](#comparison)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Example](#example)

## Comparison

|Browser                                    |Symbols     |Size    |
|:------------------------------------------|------------|--------|
| `https://www.reddit.com/.json?limit=25`   |  240-250 k | 230 KB |
| `Fukurokuju (limit=25)`                   |    8-9 k   | 8-9 KB |

## Installation

```bash
git clone https://github.com/Sarmirim/Fukurokuju.git && cd ./Fukurokuju
npm install
```

or

```bash
docker build --label latest --tag fukurokujo .
docker run -d -p 8085:8085 --name fukurokujo fukurokujo
```

## Usage

```bash
npm run server  // node server.js
```

or

```bash
npm run dev     // nodemon server.js
```

---

`http://localhost:8085/`

## Example

You can use Fukurokujo with any links to subreddits or posts:

**Subreddit 1:** `http://localhost:8085/https://www.reddit.com/r/all`

**Subreddit 2:** `http://localhost:8085/reddit.com/r/popular`

**Post 1:** `http://localhost:8085/https://www.reddit.com/comments/cjlngm`

**Post 2:** `http://localhost:8085/reddit.com/r/gaming/comments/ccr8c8/take_your_time_you_got_this/`
