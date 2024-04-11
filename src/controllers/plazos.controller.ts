import { Request, Response } from 'express';
import Plazo from '../models/plazos';

//GET All Plazos / Obtener todos los plazos
export const getPlazos = async (req: Request, res: Response) => {
  const plazos = await Plazo.findAll();
  res.json({ plazos: plazos });
};

//GET Plazo by Primary Key (ID) / GET Plazo por ID
export const getPlazo = async (req: Request, res: Response) => {
  const { idPlazos } = req.params;
  const plazo = await Plazo.findByPk(idPlazos);
  if (plazo) {
    res.json({ plazo: plazo });
  } else {
    res.status(404).json({ msg: 'Plazo no encontrado, favor de colocar un ID correcto' });
  }
};

// POST New Plazo + Validation same nombreCliente
export const postPlazo = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    // Create new Plazo / Crear un nuevo plazo
    const plazo = await Plazo.create(body);
    res.json(plazo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'No se pudo crear un nuevo plazo' });
  }
};

export const putPlazo = async (req: Request, res: Response) => {
  const { idPlazos } = req.params;
  const { body } = req;
  try {
    // Verify if exists a plazo with the same nombreCliente / Verificar si existe un plazo con el mismo nombreCliente
    const plazo = await Plazo.findByPk(idPlazos);
    if (!plazo) {
      return res.status(404).json({ msg: 'No existe un plazo con el ID: ' + idPlazos });
    }
    await plazo.update(body);
    res.json(plazo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'No se pudo editar el plazo' });
  }
};

export const deletePlazo = async (req: Request, res: Response) => {
  const { idPlazos } = req.params;
  const plazo = await Plazo.findByPk(idPlazos);
  if (!plazo) {
    return res.status(404).json({ msg: 'No existe un plazo con el ID: ' + idPlazos });
  }
  await plazo.destroy();
  res.json({ msg: 'Plazo eliminado correctamente' });
};