import React from "react";

export default function FilterTags({ selectedRestaurantTags }) {
  const handleTagClick = (tag) => {};
  return (
    <div>
      {" "}
      {selectedRestaurantTags.map((tags) =>
        tags.map((tag) => {
          return (
            <button key={tag} onClick={() => handleTagClick(tag)}>
              {" "}
              {tag}
            </button>
          );
        })
      )}
    </div>
  );
}
