const express = require('express');
const router = express.Router();
const Anime = require('../models/anime'); 

// Crear un nuevo anime
router.post('/', async (req, res) => {
  try {
    const nuevoAnime = new Anime(req.body);
    const animeGuardado = await nuevoAnime.save();
    res.status(201).json(animeGuardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los animes
router.get('/', async (req, res) => {
  try {
    const animes = await Anime.find();
    res.status(200).json(animes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un anime por ID
router.get('/:id', async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) return res.status(404).json({ error: 'Anime no encontrado' });
    res.status(200).json(anime);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un anime
router.put('/:id', async (req, res) => {
  try {
    const animeActualizado = await Anime.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!animeActualizado) return res.status(404).json({ error: 'Anime no encontrado' });
    res.status(200).json(animeActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un anime
router.delete('/:id', async (req, res) => {
  try {
    const animeEliminado = await Anime.findByIdAndDelete(req.params.id);
    if (!animeEliminado) return res.status(404).json({ error: 'Anime no encontrado' });
    res.status(200).json({ message: 'Anime eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
