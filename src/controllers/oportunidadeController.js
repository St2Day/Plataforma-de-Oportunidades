const Oportunidade = require('../models/oportunidade');

exports.createOportunidade = async (req, res) => {
  const { id_empresa, titulo, descricao, tipo, localizacao, data_publicacao, data_limite } = req.body;
  try {
    const id = await Oportunidade.create(id_empresa, titulo, descricao, tipo, localizacao, data_publicacao, data_limite);
    res.status(201).json({ message: 'Oportunidade criada com sucesso!', id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar oportunidade.' });
  }
};

exports.getOportunidadeById = async (req, res) => {
  const { id } = req.params;
  try {
    const oportunidade = await Oportunidade.findById(id);
    if (!oportunidade) return res.status(404).json({ message: 'Oportunidade não encontrada.' });
    res.json(oportunidade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar oportunidade.' });
  }
};

exports.updateOportunidade = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, tipo, localizacao, data_publicacao, data_limite } = req.body;
  try {
    const affectedRows = await Oportunidade.update(id, titulo, descricao, tipo, localizacao, data_publicacao, data_limite);
    if (affectedRows === 0) return res.status(404).json({ message: 'Oportunidade não encontrada.' });
    res.json({ message: 'Oportunidade atualizada com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar oportunidade.' });
  }
};

exports.deleteOportunidade = async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await Oportunidade.delete(id);
    if (affectedRows === 0) return res.status(404).json({ message: 'Oportunidade não encontrada.' });
    res.json({ message: 'Oportunidade deletada com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar oportunidade.' });
  }
};
