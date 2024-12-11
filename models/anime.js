const mongoose = require('mongoose');

const PersonajeSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  rol: { type: String, required: true },
  edad: { type: Number, required: true }
});

const AnimeSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  episodios: { type: Number, required: true },
  genero: { type: String, required: true },
  fechaEstreno: { type: Date, required: true },
  personajes: [PersonajeSchema],
  calificaciones: {
    imdb: { type: Number, min: 0, max: 10 },
    myAnimeList: { type: Number, min: 0, max: 10 }
  }
});

module.exports = mongoose.model('Anime', AnimeSchema);
