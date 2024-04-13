import { Request, Response } from 'express';
import Prestamo from '../models/prestamos';
import db from '../db/connection';

export const getPrestamos = async (req: Request, res: Response) => {
    try {
      const prestamos = await db.query(`
        SELECT DISTINCT 
          pr.id_rel, 
          c.nombreCliente, 
          m.montos, 
          p.plazos,
          pr.createdAt
        FROM prestamos pr
        JOIN clientes c ON pr.id_clientes = c.idClientes
        JOIN montos m ON pr.id_montos = m.idMontos
        JOIN plazos p ON pr.id_plazos = p.idPlazos
      `);
  
      const prestamosData = prestamos[0];
      res.json({ prestamos: prestamosData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error al obtener los préstamos' });
    }
  };

// Obtener préstamo por ID
export const getPrestamo = async (req: Request, res: Response) => {
  const { id_rel } = req.params;
  try {
    const prestamo = await db.query(`
      SELECT DISTINCT c.nombreCliente, m.montos, p.plazos
      FROM prestamos pr
      JOIN clientes c ON pr.id_clientes = c.idClientes
      JOIN montos m ON pr.id_montos = m.idMontos
      JOIN plazos p ON pr.id_plazos = p.idPlazos
      WHERE pr.id_rel = :id_rel
    `, { replacements: { id_rel } });
    
    // Extraer el resultado de la consulta del primer elemento del array
    const prestamoData = prestamo[0];
    if (prestamoData.length > 0) {
      res.json({ prestamo: prestamoData[0] });
    } else {
      res.status(404).json({ msg: 'Préstamo no encontrado, favor de colocar un ID correcto' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener el préstamo' });
  }
};

export const postPrestamo = async (req: Request, res: Response) => {
    const { nombreCliente, montos, plazos } = req.body;
    try {
      // Buscar el ID del cliente por su nombre
      const cliente = await db.query(`SELECT idClientes FROM clientes WHERE nombreCliente = :nombreCliente`, {
        replacements: { nombreCliente },
      });
      const id_clientes = (cliente[0][0] as { idClientes: number }).idClientes;
  
      // Buscar el ID del monto
      const monto = await db.query(`SELECT idMontos FROM montos WHERE montos = :montos`, {
        replacements: { montos },
      });
      const id_montos = (monto[0][0] as { idMontos: number }).idMontos;
  
      // Buscar el ID del plazo
      const plazo = await db.query(`SELECT idPlazos FROM plazos WHERE plazos = :plazos`, {
        replacements: { plazos },
      });
      const id_plazos = (plazo[0][0] as { idPlazos: number }).idPlazos;
  
      // Crear el préstamo con los IDs encontrados y el timestamp actual
      const prestamo = await Prestamo.create({
        id_clientes,
        id_montos,
        id_plazos,
        createdAt: db.literal('NOW()'),
      });
  
      // Enviar la respuesta con el préstamo creado
      res.json(prestamo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'No se pudo crear un nuevo préstamo' });
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