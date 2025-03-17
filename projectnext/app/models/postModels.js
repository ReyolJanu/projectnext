import { Schema,model,models } from "mongoose";

const postSchema = new Schema({
    title:String,
    description:String,
    image:String
})

const PostModel = models.Post || model('post',postSchema);
export default PostModel;

