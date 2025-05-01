import { useSelector } from "react-redux";
import { selectAllPosts } from "../../store";
import CreatePostForm from "./create-post-form";
import { postsActions } from "./postsSlice";
import { useDispatch } from "react-redux";

interface Post {
  id: string;
  content: string;
  title: string;
  userName?: string;
}

const reactionsEmoji = {
  wow: "🤩",
  like: "👍",
  dislike: "👎",
  sad: "😥",
  love: "❤️",
};

export default function PostsList() {
  const posts = useSelector(selectAllPosts);

  const renderedPost = posts.map((post: Post) => (
    <article className="p-2" key={post.id}>
      <div className="border rounded">
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        <strong className="">by {post?.userName ?? "unknown user"}</strong>
        <Reactions post={post} />
      </div>
    </article>
  ));

  return (
    <div className="space-y-10">
      <h1>Posts</h1>
      <CreatePostForm />
      <div className="">{renderedPost}</div>
    </div>
  );
}

function Reactions({ post }: { post: Post }) {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-1">
      {Object.entries(post.reactions).map((item) => (
        <button
          onClick={() =>
            dispatch(
              postsActions.addReaction({
                postId: post.id,
                reaction: item[0],
              })
            )
          }
          className="cursor-pointer"
          key={item[0]}
        >
          {reactionsEmoji[item[0]]} {post.reactions[item[0]]}
        </button>
      ))}
    </div>
  );
}
