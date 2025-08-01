import ItemCard from "../ItemCard/ItemCard";
import AddItemModal from "../AddItemModal/AddItemModal";
import "./ClothesSection.css";

function ClothesSection({ clothingItems, onCardClick, onBtnClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section-header">
        <p className="clothes-section-title">Your items</p>
        <button
          onClick={onBtnClick}
          type="button"
          className="clothes-section_AddItemBtn"
        >
          + Add new
        </button>
      </div>
      <section className="clothes-section__clothing-items">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </section>
    </div>
  );
}

export default ClothesSection;
