import{ useState } from "react";

const NewWishlist: React.FC = () => {
  const [wishlistName, setWishlistName] = useState("");

  const newWishlist = async () => {
    const response = await fetch("/api/wishlists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: wishlistName }),
    });

    if (response.ok) {
      alert(`Wishlist "${wishlistName}" created successfully!`);
      setWishlistName("");
    } else {
      const error = await response.json();
      alert(error.error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={wishlistName}
        onChange={(e) => setWishlistName(e.target.value)}
        placeholder="Enter wishlist name"
      />
      <button onClick={newWishlist}>Create wishlist</button>
    </div>
  );
};

export default NewWishlist;