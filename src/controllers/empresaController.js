const Empresa = require('../models/empresa');

exports.createEmpresa = async (req, res) => {
  const { id_usuario, cnpj, nome_empresa, setor } = req.body;
  try {
    const id = await Empresa.create(id_usuario, cnpj, nome_empresa, setor);
    res.status(201).json({ message: 'Empresa registrada com sucesso!', id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao registrar empresa.' });
  }
};

exports.getEmpresaById = async (req, res) => {
  const { id } = req.params;
  try {
    const empresa = await Empresa.findById(id);
    if (!empresa) return res.status(404).json({ message: 'Empresa não encontrada.' });
    res.json(empresa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar empresa.' });
  }
};

exports.updateEmpresa = async (req, res) => {
  const { id } = req.params;
  const { cnpj, nome_empresa, setor } = req.body;
  try {
    const affectedRows = await Empresa.update(id, cnpj, nome_empresa, setor);
    if (affectedRows === 0) return res.status(404).json({ message: 'Empresa não encontrada.' });
    res.json({ message: 'Empresa atualizada com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar empresa.' });
  }
};

exports.deleteEmpresa = async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await Empresa.delete(id);
    if (affectedRows === 0) return res.status(404).json({ message: 'Empresa não encontrada.' });
    res.json({ message: 'Empresa deletada com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar empresa.' });
  }
};
