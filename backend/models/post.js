import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const PostSchema = new Schema({
  title: String,
  content: String,
  image: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;