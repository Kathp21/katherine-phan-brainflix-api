const express = require("express");
const router = express.Router();
const fs = require('fs');

const FILE_PATH = './data/videos.json'
//GET /
router.get("/", (req, res) => {   
    //here where regular javaScipt goes
    const videoFile = fs.readFileSync(FILE_PATH)
    const videoData = JSON.parse(videoFile)
    const filterVideoData = videoData.map((video) => {
        const videoItem = {
            id: video.id,
            title: video.title,
            channel: video.channel,
            image: video.image
        }
        return videoItem
    })
    res.status(200).json(filterVideoData)
});


//GET /:id
router.get("/:id", (req, res) => {
    const videoFile = fs.readFileSync(FILE_PATH);
    const videoData = JSON.parse(videoFile)
    const video = videoData.find(oneVideo => oneVideo.id === req.params.id )
    if (!video) {
        return res.status(404).json({error: "Video not found"})
    }
    res.status(200).json(video)
});



//POST /:id/comments

//DELETE /:videoId/comments/:commentId


module.exports = router;