import { useState } from "react";
import { blogPosts } from "../data/blog-posts";

export default function BlogPosts() {
  return (
    <div className="py-6 space-y-10">
      <Form />
      <Card />
    </div>
  );
}

function Form() {
  const [query, setQuery] = useState("");
  const words = query.split(" ");
  const catChecked = words.includes("cat");
  const dogChecked = words.includes("dog");
  const caterpillarChecked = words.includes("caterpillar");

  const handleCheck = (word: string, checked: boolean) => {};

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
            checked={dogChecked}
            onChange={(e) => handleCheck("cat", e.currentTarget.checked)}
            type="checkbox"
            name="cat"
          />{" "}
          Cat
        </label>
        <label htmlFor="">
          <input
            checked={catChecked}
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

function Card() {
  return <>Card</>;
}
