import connectMongo from "../../../../utils/connectMongo";
import PostModel from "../../../models/postModels";

export async function GET(req, { params }) {
   try {
      await connectMongo();
      const postData = await PostModel.findById(params.id);
      if (!postData) {
          return Response.json({ message: "Post not found" }, { status: 404 });
      }
      return Response.json(postData);
   } catch (error) {
      return Response.json({ message: error.message }, { status: 500 });
   }
}
