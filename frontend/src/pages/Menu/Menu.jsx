import React, { useState, useEffect } from 'react';
import { getMenu } from '../../services/apiClient';
import MenuCard from '../../components/menu/MenuCard';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ category: '', isVeg: '' });

    useEffect(() => {
        fetchMenu();
    }, [filters]);

    const fetchMenu = async () => {
        try {
            setLoading(true);
            const data = await getMenu(filters);
            setMenuItems(data);
        } catch (error) {
            console.error('Error fetching menu:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="min-h-screen pt-24 px-6 pb-12 bg-background">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-secondary font-bold mb-4">Our Menu</h1>
                    <p className="text-textSecondary">Explore our culinary delights</p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    <button
                        onClick={() => handleFilterChange('category', '')}
                        className={`px-4 py-2 rounded-full border border-borderGlass transition-colors ${filters.category === '' ? 'bg-accent text-black' : 'hover:bg-white/10'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => handleFilterChange('category', 'Starters')}
                        className={`px-4 py-2 rounded-full border border-borderGlass transition-colors ${filters.category === 'Starters' ? 'bg-accent text-black' : 'hover:bg-white/10'}`}
                    >
                        Starters
                    </button>
                    <button
                        onClick={() => handleFilterChange('category', 'Main Course')}
                        className={`px-4 py-2 rounded-full border border-borderGlass transition-colors ${filters.category === 'Main Course' ? 'bg-accent text-black' : 'hover:bg-white/10'}`}
                    >
                        Mains
                    </button>
                    <button
                        onClick={() => handleFilterChange('isVeg', filters.isVeg === 'true' ? '' : 'true')}
                        className={`px-4 py-2 rounded-full border border-borderGlass transition-colors ${filters.isVeg === 'true' ? 'bg-green-600 text-white' : 'hover:bg-white/10'}`}
                    >
                        Veg Only
                    </button>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="text-center py-20">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {menuItems.map(item => (
                            <MenuCard key={item._id} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;
