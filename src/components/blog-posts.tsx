import { Dispatch, SetStateAction, useState } from "react";
import { getBlogPosts, generateGradient } from "../data/blog-posts";
import { HiHeart } from "react-icons/hi";

type Post = {
  id: string;
  title: string;
  description: string;
};

export default function BlogPosts() {
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const posts = getBlogPosts(query);
  const sortedPost = [...posts].sort((a, b) => {
    const aFav = favorites.includes(a.id);
    const bFav = favorites.includes(b.id);
    return aFav === bFav ? 0 : aFav > bFav ? -1 : 1;
  });
  return (
    <div className="py-6 space-y-10">
      <Form query={query} setQuery={setQuery} />
      <div className="flex flex-wrap justify-center">
        {sortedPost.map((post: Post) => (
          <Card
            key={post.id}
            post={post}
            isFavorite={favorites.includes(post.id)}
            onFavoriteClick={(isFavorite: boolean, favId: string) => {
              if (!isFavorite) {
                setFavorites((prevFavorite) => {
                  return prevFavorite.filter((id) => id !== favId);
                });
              } else {
                return setFavorites((favorites) => {
                  return [...favorites, favId];
                });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Form({
  query,
  setQuery,
}: {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}) {
  const words = query.split(" ");
  const catChecked = words.includes("cat");
  const dogChecked = words.includes("dog");
  const caterpillarChecked = words.includes("caterpillar");

  const handleCheck = (word: string, checked: boolean) => {
    if (checked) {
      const newQuery = [...words, word];
      setQuery(newQuery.join(" ").trim());
    } else {
      const newQuery = words
        .filter((w) => w !== word)
        .join(" ")
        .trim();
      setQuery(newQuery);
    }
  };

  return (
    <form className="text-center">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        className="border"
      />
      <div className="space-x-2 mt-2">
        <label htmlFor="">
          <input
            checked={catChecked}
            onChange={(e) => handleCheck("cat", e.currentTarget.checked)}
            type="checkbox"
            name="cat"
          />{" "}
          Cat
        </label>
        <label htmlFor="">
          <input
            checked={dogChecked}
            onChange={(e) => handleCheck("dog", e.currentTarget.checked)}
            type="checkbox"
            name="dog"
          />{" "}
          Dog
        </label>
        <label htmlFor="">
          <input
            checked={caterpillarChecked}
            onChange={(e) =>
              handleCheck("caterpillar", e.currentTarget.checked)
            }
            type="checkbox"
            name="caterpillar"
          />{" "}
          Caterpillar
        </label>
      </div>
    </form>
  );
}

function Card({
  post,
  isFavorite,
  onFavoriteClick,
}: {
  post: Post;
  isFavorite: boolean;
  onFavoriteClick: (isFavorite: boolean, favId: string) => void;
}) {
  return (
    <div className="basis-2/2 sm:basis-1/2 md:basis-1/3 p-4 overflow-hidden">
      <div className="space-y-2">
        <div
          className="aspect-video relative"
          style={{
            background: generateGradient(post.id),
          }}
        >
          <div className="absolute right-4 top-4">
            {isFavorite ? (
              <button
                className="drop-shadow"
                onClick={() => onFavoriteClick(false, post.id)}
              >
                <HiHeart
                  size={32}
                  className="fill-pink-500 stroke-white stroke-1"
                />
              </button>
            ) : (
              <button
                className="drop-shadow"
                onClick={() => onFavoriteClick(true, post.id)}
              >
                <HiHeart size={32} />
              </button>
            )}
          </div>
        </div>
        <h2 className="text-lg whitespace-nowrap truncate">{post.title}</h2>
        <p>{post.description}</p>
      </div>
    </div>
  );
}
