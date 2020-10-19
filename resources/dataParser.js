export default function dataParser(redditLink, jsonData) {
    let responseArray = [];
    try {      
        const postCheck = new Boolean(redditLink.search(`/comments/`) != -1); // postCheck -> bool (subreddit = false) (post = true)
        const parsedJSON = (postCheck == true ? JSON.parse(jsonData)[0].data : JSON.parse(jsonData).data)
        for(let i=0; i<parsedJSON.children.length; i++){
            const children = parsedJSON.children[i].data;
            let { subreddit, author, ups, title, created_utc } = children

            created_utc = new Date(created_utc*1000).toISOString().slice(-13, -5);
            let gif = false;
            let objectData = {
                title,
                author,
                subreddit,
                ups,
                created_utc,
            }

            // gif/video
            if (children.crosspost_parent_list) {
                const parent = children.crosspost_parent_list[0];              
                try {objectData.media = parent.url_overridden_by_dest; gif = true}catch (e) {}
                try {objectData.media = parent.media.reddit_video.fallback_url; gif = true}catch (e) {}    
                try {objectData.media = parent.media.oembed.thumbnail_url; gif = true}catch (e) {}                         
            } 
            else {    
                try {objectData.media = children.url_overridden_by_dest; gif = true}catch (e) {}
                try {objectData.media = children.media.reddit_video.fallback_url;  gif = true}catch (e) {}
                try {objectData.media = children.media.oembed.thumbnail_url; gif = true}catch (e) {}               
            }

            // image
            if(children.url){
                const preview = children.preview;
                objectData.url = children.url;
                if(children.thumbnail.toString().length > 10) {
                    objectData.thumbnail = children.thumbnail;
                }else {
                    objectData.thumbnail = children.url;
                }
                try {objectData.source_width = preview.images[0].source.width} catch (e) {}
                try {objectData.source_height = preview.images[0].source.height} catch (e) {}
            }

            objectData.gif = gif;
            responseArray.push(objectData);
        }
    } catch (error) {
        console.log(error);
    }
    return responseArray
}