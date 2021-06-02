import PostMessage from '../models/postMessage.js';

export const getPosts = async (req,res) => {
    //res.send('THIS GOOD');
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message : error.message});
    }
}

export const createPost = async(req,res) => {
   // res.send('Post Creation');
   const post = req.body;

   const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
   try {
       await newPost.save()
       res.status(201).json(newPost);
   } catch (error) {
       res.status(409).json({ message : error.message})
   }
}