import "./FilterBar.css";
import { useState } from "react";

export default function FilterBar() {
    const [excludeSold, setExcludeSold] = useState(false);
    const [sortOption, setSortOption] = useState("latest");

  return (
    <div className="filter-bar">
        <label className="filter-checkbox">
            <input 
                type="checkbox" 
                checked={excludeSold}
                onChange={(e) => setExcludeSold(e.target.checked)}
            />
            <span>판매완료 제외</span>
        </label>

        <select
            className="filter-sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
        >
            <option value="latest">최신순</option>
            <option value="popular">인기순</option>
        </select>
    </div>
  );
}
