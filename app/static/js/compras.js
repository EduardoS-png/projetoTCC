document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formRegistroCompra');
  const produtoIdInput = document.getElementById('produto_id');
  const produtoNomeInput = document.getElementById('produto_nome');
  const fornecedorIdInput = document.getElementById('fornecedor_id');
  const fornecedorNomeInput = document.getElementById('fornecedor_nome');

  // Preenche automaticamente o nome do produto ao digitar o ID
  produtoIdInput.addEventListener('blur', async () => {
    const produtoId = produtoIdInput.value.trim();
    if (!produtoId) return;

    try {
      const res = await fetch(`/api/produto/${produtoId}`);
      if (!res.ok) {
        produtoNomeInput.value = '';
        return;
      }
      const produto = await res.json();
      produtoNomeInput.value = produto.nome || '';
      document.getElementById('categoria_compra').value = produto.tipo || '';
    } catch (err) {
      console.error(err);
      produtoNomeInput.value = '';
    }
  });

  // Preenche automaticamente o nome do fornecedor ao digitar o ID
  fornecedorIdInput.addEventListener('blur', async () => {
    const fornecedorId = fornecedorIdInput.value.trim();
    if (!fornecedorId) return;

    try {
      const res = await fetch(`/api/fornecedor/${fornecedorId}`);
      if (!res.ok) {
        fornecedorNomeInput.value = '';
        return;
      }
      const fornecedor = await res.json();
      fornecedorNomeInput.value = fornecedor.nome || '';
    } catch (err) {
      console.error(err);
      fornecedorNomeInput.value = '';
    }
  });

  // Captura submit do formulário
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const dados = {
      produto_id: produtoIdInput.value,
      quantidade: parseInt(document.getElementById('quantidade').value),
      preco_compra: parseFloat(document.getElementById('preco_compra').value),
      fornecedor_id: fornecedorIdInput.value,
      data_compra: document.getElementById('data_compra').value || new Date().toISOString().slice(0,10)
    };

    try {
      const response = await fetch('/api/compra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });

      const result = await response.json();
      if (!response.ok) {
        alert('Erro ao registrar compra: ' + (result.erro || response.statusText));
        return;
      }

      alert('Compra registrada com sucesso! ID: ' + result.id);
      form.reset();

      atualizarListaCompras();

    } catch (err) {
      console.error(err);
      alert('Erro de conexão com o servidor.');
    }
  });
});


