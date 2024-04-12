import { Request, Response } from 'express';
import Prestamo from '../models/prestamos';

// Obtener todos los préstamos
export const getPrestamos = async (req: Request, res: Response) => {
  try {
    const prestamos = await Prestamo.findAll();
    res.json({ prestamos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener los préstamos' });
  }
};

// Obtener préstamo por ID
export const getPrestamo = async (req: Request, res: Response) => {
  const { id_rel } = req.params;
  try {
    const prestamo = await Prestamo.findByPk(id_rel);
    if (prestamo) {
      res.json({ prestamo });
    } else {
      res.status(404).json({ msg: 'Préstamo no encontrado, favor de colocar un ID correcto' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener el préstamo' });
  }
};

// Crear un nuevo préstamo
export const postPrestamo = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const prestamo = await Prestamo.create(body);
    res.json(prestamo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'No se pudo crear un nuevo préstamo' });
  }
};

// Actualizar un préstamo existente
export const putPrestamo = async (req: Request, res: Response) => {
  const { id_rel } = req.params;
  const { body } = req;
  try {
    const prestamo = await Prestamo.findByPk(id_rel);
    if (!prestamo) {
      return res.status(404).json({ msg: 'No existe un préstamo con el ID: ' + id_rel });
    }
    await prestamo.update(body);
    res.json(prestamo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'No se pudo actualizar el préstamo' });
  }
};

// Eliminar un préstamo
export const deletePrestamo = async (req: Request, res: Response) => {
  const { id_rel } = req.params;
  try {
    const prestamo = await Prestamo.findByPk(id_rel);
    if (!prestamo) {
      return res.status(404).json({ msg: 'No existe un préstamo con el ID: ' + id_rel });
    }
    await prestamo.destroy();
    res.json({ msg: 'Préstamo eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'No se pudo eliminar el préstamo' });
  }
};
