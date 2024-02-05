const express = require("express")
const router = express.Router()
const fs = require('fs')
const {v4:uuidv4} = require('uuid')

const fetchVideos = () => {
    return JSON.parse(fs.readFileSync('./data/videos.json'))
}

const addVideo = (newVideo) => {
    const videoDetailsArray = fetchVideos()
    fs.writeFileSync('./data/videos.json', JSON.stringify([...videoDetailsArray, newVideo]))
    return newVideo
}

//GET /
router.route("/")
    .get((_req, res) => {   
        const filterVideoData = fetchVideos().map(video => ({
            id: video.id,
            title: video.title,
            channel: video.channel,
            image: video.image
        }))
    res.status(200).json(filterVideoData)
    })

    .post((req, res) => {
        const { title, description } = req.body
        if(!title || !description) return res.status(400).json("All requests must have a title and a description.")
        let newVideo = {
            title: title,
            description: description,
            channel: "Unknown",
            image: "http://localhost:8000/images/placeholder.jpg",
            id: uuidv4(),
            views: 0,
            likes: 0,
            duration: 0,
            timestamp: Date.now(),
            comments: []
        }
        const justAdded = addVideo(newVideo)
        res.status(201).json(justAdded) 
    })

//GET /:id
router.get("/:id", (req, res) => {
    const video = fetchVideos().find(oneVideo => oneVideo.id === req.params.id)
    if (!video) {
        return res.status(404).json({message: "No video with that id exists"})
    }
    res.status(200).json(video)
});

module.exports = router;