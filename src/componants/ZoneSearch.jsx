import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch} from 'react-icons/fa';
import '../styles/ZoneSearch.css';
import { Link } from 'react-router-dom';
const ZoneSearch = () => {
  const [search, setSearch] = useState('');
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) {
      setShowResults(false);
      return;
    }

    setLoading(true);
    setShowResults(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/zone/search', {
        params: { search }
      });
      setZones(response.data.data || []);
    } catch (error) {
      console.error(error);
     
    }
    setLoading(false);
  };



  return (
    <div className="zone-search-simple">
      <form onSubmit={handleSearch} className="search-form-simple">
        <input
          type="text"
          placeholder="Rechercher une zone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input-simple"
        />
        
        <button type="submit" className="search-btn-simple">
          <FaSearch />
        </button>
      </form>

      {showResults && (
        <div className="results-simple">
          {loading ? (
            <div className="loading-simple">Recherche en cours...</div>
          ) : zones.length > 0 ? (
            zones.map((zone) => (
              <div key={zone.id} className="result-simple">
            
                  <img 
                   src={`http://127.0.0.1:8000/storage/${zone.image}`}
                    alt={zone.name} 
                    className="result-image-simple"
                  />
              
                <div className="result-info-simple">
                  <h3>{zone.name}</h3>
                  <button className="voir-details-btn-simple">
                  <Link to={`/zone/${zone.id}`} key={zone.id} style={{ textDecoration: "none" ,color:"#fff"}}>
                  Voir Details
                  </Link>
                    </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results-simple">
              Aucun résultat trouvé pour "{search}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ZoneSearch;