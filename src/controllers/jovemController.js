const Jovem = require('../models/Jovem');

exports.createJovem = async (req, res) => {
  const { id_usuario, idade, escolaridade, area_interesse } = req.body;
  try {
    const id = await Jovem.create(id_usuario, idade, escolaridade, area_interesse);
    res.status(201).json({ message: 'Jovem registrado com sucesso!', id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao registrar jovem.' });
  }
};

exports.getJovemById = async (req, res) => {
  const { id } = req.params;
  try {
    const jovem = await Jovem.findById(id);
    if (!jovem) return res.status(404).json({ message: 'Jovem não encontrado.' });
    res.json(jovem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar jovem.' });
  }
};

exports.updateJovem = async (req, res) => {
  const { id } = req.params;
  const { idade, escolaridade, area_interesse } = req.body;
  try {
    const affectedRows = await Jovem.update(id, idade, escolaridade, area_interesse);
    if (affectedRows === 0) return res.status(404).json({ message: 'Jovem não encontrado.' });
    res.json({ message: 'Jovem atualizado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar jovem.' });
  }
};

exports.deleteJovem = async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await Jovem.delete(id);
    if (affectedRows === 0) return res.status(404).json({ message: 'Jovem não encontrado.' });
    res.json({ message: 'Jovem deletado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar jovem.' });
  }
};
