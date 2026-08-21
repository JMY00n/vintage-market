import "./FilterBar.css";
import { useState } from "react";

export default function FilterBar({ onSaleOnly, onOnSaleOnlyChange }) {
    // const [onSaleOnly, setOnSaleOnly] = useState(false);
    // const [sortOption, setSortOption] = useState("latest");

    return (
        <div className="filter-bar">
            <label className="filter-checkbox">
                <input
                    type="checkbox"
                    checked={onSaleOnly}
                    onChange={(e) => onOnSaleOnlyChange(e.target.checked)}
                />
                <span>판매중만 보기</span>
            </label>

            <select
                className="filter-sort"
            // value={sortOption}
            // onChange={(e) => setSortOption(e.target.value)}
            >
                <option value="latest">최신순</option>
                <option value="popular">인기순</option>
            </select>
        </div>
    );
}
