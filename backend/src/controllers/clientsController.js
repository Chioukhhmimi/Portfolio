import Client from '../models/Client.js';

export const getAllClients = async (req, res, next) => {
  try {
    const clients = await Client.find({}).sort({ order: 1 });
    res.status(200).json({
      success: true,
      count: clients.length,
      data: clients,
    });
  } catch (error) {
    next(error);
  }
};

export const createClient = async (req, res, next) => {
  try {
    const { id, name, logo, order } = req.body;
    
    const client = await Client.create({
      id,
      name,
      logo,
      order: order || 0,
    });
    
    res.status(201).json({
      success: true,
      data: client,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Client.deleteOne({ id });
    res.status(200).json({
      success: true,
      message: 'Client deleted',
    });
  } catch (error) {
    next(error);
  }
};