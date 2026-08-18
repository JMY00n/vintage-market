import "./Category.css";

const categories = ["전체", "상의", "아우터", "신발", "모자", "기타"];

function Category({ selected, onSelect }) {
    
  return (
    <div className="category-wrapper">
        <div className="category-button">
            {categories.map((category) => (
                <button 
                    key={category}
                    className={selected === category ? "active" : ""}
                    onClick={() => onSelect(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    </div>
  )
}

export default Category;
