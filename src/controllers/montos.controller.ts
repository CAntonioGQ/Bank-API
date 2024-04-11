import { Request, Response } from 'express';
import Monto from '../models/montos';


//GET All Users / Obtener todos los usuarios
export const getMontos = async (req: Request, res: Response) => {
    
    const montos = await Monto.findAll()
    
    res.json({ montos: montos });
};

//GET Users by Primary Key (ID) / GET Usuario por ID
export const getMonto = async (req: Request, res: Response) => {
    
    const { idMontos: idMontos } = req.params;

    const monto = await Monto.findByPk( idMontos )
    
    if ( monto ) {
    
        res.json({ monto: monto })
        
    } else {
        res.status(404).json({
            msg: 'Usuario no Encontrado, favor de colocar un ID correcto'
        })
    }
};

// POST New User + Validation same nombreCliente  
export const postMonto = async (req: Request, res: Response) => {
    const { body } = req;
    try {
      // Create new User / Crear un nuevo usuario
      const monto = await Monto.create(body);
      res.json(monto);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'No se pudo crear un nuevo usuario' });
    }
  };

export const putMonto = async (req: Request, res: Response) => {
    const { idMontos: idMontos } = req.params;
    const { body } = req;
    try {
        // Verify if exists a user with the same nombreCliente / Verificar si existe un usuario con el mismo nombreCliente
        const monto = await Monto.findByPk( idMontos )
        if( !monto ){
            return res.status(404).json({
                msg: 'No existe un usuario con el ID: ' + idMontos
            })
        }

        await monto.update( body )

        res.json( monto )

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'No se pudo editar un nuevo usuario'
        });
    }
};

export const deleteMonto = async (req: Request, res: Response) => {
    const { idMontos } = req.params;
    const monto = await Monto.findByPk(idMontos);
    if (!monto) {
      return res.status(404).json({ msg: 'No existe un usuario con el ID: ' + idMontos });
    }
    await monto.destroy();
    res.json({ msg: 'Usuario eliminado correctamente' });
  };