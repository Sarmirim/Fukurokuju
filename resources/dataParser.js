export default function dataParser(redditLink, jsonData) {
    let responseArray = [];
    try {
        const postCheck = new Boolean(redditLink.search(`/comments/`) != -1); // boolen to check if link is post or subreddit: postCheck = bool ? (subreddit = false) : (post = true)
        const parsedJSON = (postCheck == true ? JSON.parse(jsonData)[0].data : JSON.parse(jsonData).data)
        for(let i=0; i<parsedJSON.children.length; i++){
            const children = parsedJSON.children[i].data;
            let { title, author, subreddit, ups, created_utc } = children
            created_utc = new Date(created_utc*1000).toISOString().slice(-13, -5);
            let gif = false;
            let postData = { title, author, subreddit, ups, created_utc, }

            // gif/video
            let gifChecker = (source) => {
                let answer
                if (source.is_video){
                    try {answer = source.media.reddit_video.fallback_url} catch (e) {}
                }
                else {
                    try {answer = source.preview.reddit_video_preview.fallback_url} catch (e) {}
                    try {answer = (source.url_overridden_by_dest.search(`.gif`) != -1 ? source.url : null)} catch (e) {}
                    }
                if (answer) gif = true
                return answer
            }
            if (children.crosspost_parent_list) {
                const answer = gifChecker(children.crosspost_parent_list[0])
                if(answer){
                    postData.media = answer
                }
            }
            else {
                const answer = gifChecker(children)
                if(answer){
                    postData.media = answer
                }
            }

            // image
            if (children.url){
                postData.url = children.url;
                if (children.thumbnail.toString().length > 10) {
                    postData.thumbnail = children.thumbnail;
                }
                else {
                    postData.thumbnail = children.url;
                }
                const preview = children.preview;
                try {postData.source_width = preview.images[0].source.width} catch (e) {}
                try {postData.source_height = preview.images[0].source.height} catch (e) {}
            }
            postData.gif = gif
            responseArray.push(postData)
        }
    }
    catch (error) {
        console.log(error);
    }
    return responseArray
}