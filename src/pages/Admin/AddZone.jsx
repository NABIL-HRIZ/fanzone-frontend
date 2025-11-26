import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const AddZone = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading,setLoading]=useState(false)
  const [zone, setZone] = useState({
    matche_id: '',
    name: '',
    city: '',
    address: '',
    latitude: '',
    longitude: '',
    price: '',
    capacity: '',
    available_seats: '',
    description: '',
    image: null
  });
 

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/show-matches');
        setMatches(res.data.data);
      } catch (error) {
        console.error('Erreur fetching matches:', error);
        
      }
    };
    fetchMatches();
  }, []);


const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "image") {
    setZone({
      ...zone,
      image: files[0] 
    });
  } else {
    setZone({
      ...zone,
      [name]: value
    });
  }
};




  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      const token = localStorage.getItem('token');
      
    
const formData = new FormData();

for (let key in zone) {
  formData.append(key, zone[key]);
}

await axios.post(
  'http://127.0.0.1:8000/api/add-zone',
  formData,
  {
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  }
);
;
      Swal.fire({
  title: "Zone ajoutée avec succès !",
  icon: "success"
});
      setTimeout(() => navigate('/admin/zones'), 2000);
    } catch (error) {
   
      Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Erreur lors de l'ajout de la zone !",
});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-zone-container">
      <div className="add-zone-header">
        <h1>Ajouter une Nouvelle Zone</h1>
        <p>Créez une nouvelle zone de fan pour un match</p>
      </div>

     
      <form onSubmit={handleSubmit} className="zone-form">
        <div className="form-grid">
          <div className="form-section">
            <h3>Match et Informations de base</h3>
            
            <div className="input-group">
              <label htmlFor="matche_id">Match associé *</label>
              <select 
                id="matche_id" 
                name="matche_id" 
                value={zone.matche_id} 
                onChange={handleChange} 
                required
              >
                <option value="">Sélectionnez un match</option>
                {matches.map(match => (
                  <option key={match.id} value={match.id}>
                    {match.team_one_title} vs {match.team_two_title} - {new Date(match.match_date).toLocaleDateString('fr-FR')}
                  </option>
                ))}
              </select>
             
            </div>

            <div className="input-group">
              <label htmlFor="name">Nom de la zone *</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={zone.name} 
                onChange={handleChange} 
                required 
                placeholder="Ex: Zone VIP Nord, Tribune Sud, etc."
              />
            </div>

            <div className="input-group">
              <label htmlFor="city">Ville *</label>
              <input 
                type="text" 
                id="city" 
                name="city" 
                value={zone.city} 
                onChange={handleChange} 
                required 
                placeholder="Ex: Casablanca, Rabat, Marrakech"
              />
            </div>

           
          </div>

          <div className="form-section">
            <h3>Capacité et Tarification</h3>
            
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="capacity">Capacité totale *</label>
                <input 
                  type="number" 
                  id="capacity" 
                  name="capacity" 
                  value={zone.capacity} 
                  onChange={handleChange} 
                  required 
                  min="1" 
                  placeholder="100"
                />
              </div>

              <div className="input-group">
                <label htmlFor="available_seats">Places disponibles</label>
                <input 
                  type="number" 
                  id="available_seats" 
                  name="available_seats" 
                  value={zone.available_seats} 
                  onChange={handleChange} 
                  min="0" 
                  max={zone.capacity || 1000}
                  placeholder="Laisser vide pour utiliser la capacité totale"
                />
                
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="price">Prix (MAD) *</label>
              <div className="price-input">
                <input 
                  type="number" 
                  id="price" 
                  name="price" 
                  value={zone.price} 
                  onChange={handleChange} 
                  required 
                  min="0" 
                  step="0.01"
                  placeholder="0.00"
                />
                <span className="currency">MAD</span>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Localisation</h3>
            
            <div className="input-group">
              <label htmlFor="address">Adresse</label>
              <input 
                type="text" 
                id="address" 
                name="address" 
                value={zone.address} 
                onChange={handleChange} 
                placeholder="Adresse complète de la zone"
              />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label htmlFor="latitude">Latitude</label>
                <input 
                  type="number" 
                  id="latitude" 
                  name="latitude" 
                  value={zone.latitude} 
                  onChange={handleChange} 
                 
                  placeholder="34.020882"
                />
              </div>

              <div className="input-group">
                <label htmlFor="longitude">Longitude</label>
                <input 
                  type="number" 
                  id="longitude" 
                  name="longitude" 
                  value={zone.longitude} 
                  onChange={handleChange} 
                
                  placeholder="-6.841650"
                />
              </div>
            </div>
          </div>

          <div className="form-section full-width">
            <h3>Description et Image</h3>
            
            <div className="input-group">
              <label htmlFor="description">Description de la zone</label>
              <textarea 
                id="description" 
                name="description" 
                value={zone.description} 
                onChange={handleChange} 
                rows="4"
                placeholder="Décrivez les caractéristiques de cette zone (vue, équipements, avantages...)"
              />
            </div>

            <div className="input-group">
              <label htmlFor="image">URL de l'image</label>
             <input 
  type="file"
  accept="image/*"
  id="image"
  name="image"
  onChange={handleChange}
/>
             
            </div>

          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/zones')}
            className="btn-secondary"
            
          >
            Annuler
          </button>
          <button
            type="submit"
            className="btn-primary"
          
          >
           Créer la Zone
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddZone;