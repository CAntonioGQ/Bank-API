import { Request, Response } from 'express';
import Cliente from '../models/cliente';

//GET All Clients / Obtener todos los clientes
export const getClientes = async (req: Request, res: Response) => {
  const clientes = await Cliente.findAll();
  res.json({ clientes });
};

//GET Client by Primary Key (ID) / GET Cliente por ID
export const getCliente = async (req: Request, res: Response) => {
  const { idClientes } = req.params;
  const cliente = await Cliente.findByPk(idClientes);
  if (cliente) {
    res.json({ cliente });
  } else {
    res.status(404).json({ msg: 'Cliente no encontrado, favor de colocar un ID correcto' });
  }
};

// POST New Client + Validation same nombreCliente
export const postCliente = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    // Create new Client / Crear un nuevo cliente
    const cliente = await Cliente.create(body);
    res.json(cliente);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'No se pudo crear un nuevo cliente' });
  }
};

export const putCliente = async (req: Request, res: Response) => {
  const { idClientes } = req.params;
  const { body } = req;
  try {
    // Verify if exists a client with the same nombreCliente / Verificar si existe un cliente con el mismo nombreCliente
    const cliente = await Cliente.findByPk(idClientes);
    if (!cliente) {
      return res.status(404).json({ msg: 'No existe un cliente con el ID: ' + idClientes });
    }
    await cliente.update(body);
    res.json(cliente);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'No se pudo editar el cliente' });
  }
};

export const deleteCliente = async (req: Request, res: Response) => {
  const { idClientes } = req.params;
  const cliente = await Cliente.findByPk(idClientes);
  if (!cliente) {
    return res.status(404).json({ msg: 'No existe un cliente con el ID: ' + idClientes });
  }
  await cliente.destroy();
  res.json({ msg: 'Cliente eliminado correctamente' });
};