const Candidatura = require('../models/candidatura');

exports.createCandidatura = async (req, res) => {
  const { id_jovem, id_oportunidade, status } = req.body;
  try {
    const id = await Candidatura.create(id_jovem, id_oportunidade, status);
    res.status(201).json({ message: 'Candidatura registrada com sucesso!', id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao registrar candidatura.' });
  }
};

exports.getCandidaturaById = async (req, res) => {
  const { id } = req.params;
  try {
    const candidatura = await Candidatura.findById(id);
    if (!candidatura) return res.status(404).json({ message: 'Candidatura não encontrada.' });
    res.json(candidatura);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar candidatura.' });
  }
};

exports.updateCandidaturaStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const affectedRows = await Candidatura.updateStatus(id, status);
    if (affectedRows === 0) return res.status(404).json({ message: 'Candidatura não encontrada.' });
    res.json({ message: 'Status atualizado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar status.' });
  }
};

exports.deleteCandidatura = async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await Candidatura.delete(id);
    if (affectedRows === 0) return res.status(404).json({ message: 'Candidatura não encontrada.' });
    res.json({ message: 'Candidatura deletada com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar candidatura.' });
  }
};
