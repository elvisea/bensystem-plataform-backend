import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Orcamento from '../models/Orcamento';
import orcamentos_view from "../views/orcamentos_view";
import * as Yup from "yup";

export default {
  async create(request: Request, response: Response) {
    const { 
      name, 
      email, 
      whatsapp,
      description, 
    } = request.body;

    const orcamentosRepository = getRepository(Orcamento);

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

    const orcamento = orcamentosRepository.create(data);

    await orcamentosRepository.save(orcamento);

    return response.status(201).json(orcamento)
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const orcamentosRepository = getRepository(Orcamento);
    await orcamentosRepository.delete(id);

    return response.status(201).json({ message: "Orçamento Deletado" });
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const orcamentosRepository = getRepository(Orcamento);
    const orcamento = await orcamentosRepository.findOneOrFail(id);

    return response.status(201).json(orcamentos_view.render(orcamento));
  },

  async index(request: Request, response: Response) {
    const orcamentosRepository = getRepository(Orcamento);
    const orcamentos = await orcamentosRepository.find()

    return response.status(201).json(orcamentos_view.renderMany(orcamentos))
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

    const orcamentosRepository = getRepository(Orcamento);
    await orcamentosRepository.update(id, data);

    return response.status(201).json({ message: "Orçamento Atualizado" });
  },
}
