import Client from '../models/Client.js';
import cloudinary from '../lib/cloudinary.js';
import { Readable } from 'stream';

const uploadToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer) {
      resolve(null);
      return;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'portfolio/clients',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    const readable = new Readable();
    readable._read = () => {};
    readable.push(fileBuffer);
    readable.push(null);

    readable.pipe(uploadStream);
  });
};

const extractPublicId = (url) => {
  if (!url || typeof url !== 'string') return null;
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z]+$/);
  return match ? match[1] : null;
};

const deleteFromCloudinary = async (url) => {
  const publicId = extractPublicId(url);
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error('Failed to delete image from Cloudinary:', err);
  }
};

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
    let { id, name, order } = req.body;
    let imageUrl = req.body.logo;

    if (!req.file && !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Logo image is required',
      });
    }

    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer);
    }

    if (!name && req.body.title) {
      name = req.body.title;
    }

    if (!id && name) {
      id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'ID is required',
      });
    }

    let finalOrder = order;
    if (finalOrder === undefined || finalOrder === null || finalOrder === '') {
      const lastClient = await Client.findOne().sort('-order');
      finalOrder = lastClient ? lastClient.order + 1 : 0;
    }

    const client = await Client.create({
      id,
      name,
      logo: imageUrl,
      order: Number(finalOrder),
    });

    res.status(201).json({
      success: true,
      data: client,
    });
  } catch (error) {
    next(error);
  }
};

export const updateClient = async (req, res, next) => {
  try {
    const { id } = req.params;

    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found',
      });
    }

    const updateData = {};
    if (req.body.title !== undefined) updateData.title = req.body.title;
    if (req.body.order !== undefined && req.body.order !== '') {
      updateData.order = Number(req.body.order);
    }

    if (req.file) {
      if (client.image) {
        await deleteFromCloudinary(client.image);
      }
      updateData.image = await uploadToCloudinary(req.file.buffer);
    }

    const updatedClient = await Client.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: updatedClient,
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

export const getClientById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await Client.findOne({ id });
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found',
      });
    }
    res.status(200).json({
      success: true,
      data: client,
    });
  } catch (error) {
    next(error);
  }
};
