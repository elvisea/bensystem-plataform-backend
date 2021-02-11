import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Chamado from '../models/Chamado';
import chamados_view from "../views/chamados_view";
import * as Yup from "yup";

export default {
  async create(request: Request, response: Response) {
    const { 
      name, 
      email, 
      whatsapp,
      description, 
    } = request.body;

    const chamadosRepository = getRepository(Chamado);

    const data = {
      name,
      email,
      whatsapp,
      description,
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
      whatsapp: Yup.string().required(),
      description: Yup.string().required(),
    });

    await schema.validate(data, { abortEarly: false });

    const chamado = chamadosRepository.create(data);

    await chamadosRepository.save(chamado);

    return response.status(201).json(chamado)
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const chamadosRepository = getRepository(Chamado);
    await chamadosRepository.delete(id);

    return response.status(201).json({ message: "Chamado Deletado" });
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const chamadosRepository = getRepository(Chamado);
    const chamado = await chamadosRepository.findOneOrFail(id);

    return response.status(201).json(chamados_view.render(chamado));
  },

  async index(request: Request, response: Response) {
    const chamadosRepository = getRepository(Chamado);
    const chamados = await chamadosRepository.find()

    return response.status(201).json(chamados_view.renderMany(chamados))
  },

  async update(request: Request, response: Response) {
    const { id } = request.params;

    const {  
      name, 
      email, 
      whatsapp,
      description,
    } = request.body;

    const data = { 
      name, 
      email, 
      whatsapp,
      description,
    }

    const chamadosRepository = getRepository(Chamado);
    await chamadosRepository.update(id, data);

    return response.status(201).json({ message: "Chamado Atualizado" });
  },
}
