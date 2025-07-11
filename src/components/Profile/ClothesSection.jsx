import ItemCard from "../ItemCard/ItemCard";
import AddItemModal from "../AddItemModal/AddItemModal";

function ClothesSection({ clothingItems }) {
  return (
    <div className="Clothes-section">
      <p>Your items</p>
      <button type="button" className="AddItemModal">
        + Add new
      </button>
      <section className="ClothesSection__clothing-items">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </section>
    </div>
  );
}

export default ClothesSection;
