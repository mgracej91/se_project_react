import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  clothingItems,
  onCardClick,
  onCardLike,
  onBtnClick,
  currentUser,
}) {
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section-header">
        <p className="clothes-section-title">Your items</p>
        <button
          onClick={() => onBtnClick("add clothes")}
          type="button"
          className="clothes-section_AddItemBtn"
        >
          + Add new
        </button>
      </div>
      <section className="clothes-section__clothing-items">
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </section>
    </div>
  );
}

export default ClothesSection;
