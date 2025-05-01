import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { postsActions } from "./postsSlice";
import { selectAllUsers } from "../../store";
import { useSelector } from "react-redux";

interface PostFormData {
  title: string;
  content: string;
  userName: string;
}

export default function CreatePostForm() {
  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    content: "",
    userName: "John Doe",
  });

  const users = useSelector(selectAllUsers);

  const dispatch = useDispatch();

  const handleChange = (
    name: keyof PostFormData,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const value = e.currentTarget.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.content) {
      dispatch(
        postsActions.createPost(
          formData.title,
          formData.content,
          formData.userName
        )
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <label className="block" htmlFor="postTitle">
          Post Title:
        </label>
        <input
          onChange={(e) => handleChange("title", e)}
          type="text"
          id="postTitle"
          name="title"
          value={formData.title}
          className="border"
        />
      </div>
      <div>
        <label className="block" htmlFor="">
          Select User
        </label>
        <select
          onChange={(e) => handleChange("userName", e)}
          name="userName"
          className="border"
          defaultValue={users[0].name}
        >
          {users.map((user, i) => (
            <option value={user.name} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block" htmlFor="postDescription">
          Post Description:
        </label>
        <textarea
          onChange={(e) => handleChange("content", e)}
          id="postDescription"
          name="content"
          value={formData.content}
          className="border"
        />
      </div>
      <button className="border px-2 py-1 rounded text-sm cursor-pointer">
        add post
      </button>
    </form>
  );
}
