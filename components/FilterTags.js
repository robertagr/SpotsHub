import React from "react";

export default function FilterTags({ selectedRestaurantTags }) {
  const handleTagClick = (tag) => {
    // Do something with the clicked tag, e.g., add it to the selectedTags state
  };
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