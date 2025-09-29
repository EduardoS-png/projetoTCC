document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formRegistroFornecedor');
  const nomeIdInput = document.getElementById('nome');
  const nome_fantasiaIdInput = document.getElementById('nome_fantasia');
  const cnpjIdInput = document.getElementById('cnpj');
  const enderecoIdInput = document.getElementById('endereco');
  const telefone1IdInput = document.getElementById('telefone1');
  const telefone2IdInput = document.getElementById('telefone2')



  // Captura submit do formulário
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const dados = {
      nome: nomeIdInput.value,
      nome_fantasia: nome_fantasiaIdInput.value,
      cnpj: cnpjIdInput.parseInt(document.getElementById('cnpj').value),
      endereco: enderecoIdInput.value,
      telefone1: telefone1IdInput.parseInt(document.getElementById('telefone1').value),
      telefone2: telefone2IdInput.parseInt(document.getElementById('telefone2').value)
      
    };

    try {
      const response = await fetch('/api/fornecedor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });

      const result = await response.json();
      if (!response.ok) {
        alert('Erro ao registrar Fornecedor: ' + (result.erro || response.statusText));
        return;
      }

      alert('Fornecedor registrado com sucesso! ID: ' + result.id);
      form.reset();

      atualizarListaFornecedor();

    } catch (err) {
      console.error(err);
      alert('Erro de conexão com o servidor.');
    }
  });
});
