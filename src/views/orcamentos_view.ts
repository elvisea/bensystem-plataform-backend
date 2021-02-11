import Orcamento from "../models/Orcamento";

export default {
    render(orcamento: Orcamento) {
        return {
            id: orcamento.id,
            name: orcamento.name,
            email: orcamento.email,
            whatsapp: orcamento.whatsapp,
            description: orcamento.description,
        };
    },

    renderMany(orcamento: Orcamento[]) {
        return orcamento.map((orcamento) => this.render(orcamento));
    },
};