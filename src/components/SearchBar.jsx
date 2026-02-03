import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onLocate }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
            setQuery('');
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit} className="search-form">
                <div className="input-wrapper">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search city..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
                <button type="submit" className="search-btn">Search</button>
            </form>
            <button onClick={onLocate} className="locate-btn" title="Use current location">
                <MapPin size={22} />
            </button>
        </div>
    );
};

export default SearchBar;
