const API = 'http://localhost:3000';

if (window.location.pathname.includes('dashboard.html')) {
  listarUsuarios();
}

window.fazerLogin = function () {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  })
    .then(res => {
      if (!res.ok) throw new Error('Login inválido');
      return res.json();
    })
    .then(() => {
      localStorage.setItem('logado', 'true');
      window.location.href = 'dashboard.html';
    })
    .catch(err => alert(err.message));
};

function listarUsuarios() {
  fetch(`${API}/usuarios`)
    .then(res => res.json())
    .then(usuarios => {
      const lista = document.getElementById('listaUsuarios');
      lista.innerHTML = '';

      usuarios.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `${user.nome} (${user.email}) <button onclick="deletarUsuario(${user.id})">Excluir</button>`;
        lista.appendChild(li);
      });
    })
    .catch(err => {
      console.error('Erro ao listar usuários:', err);
    });
}

function criarUsuario() {
  const nome = document.getElementById('novoNome').value;
  const email = document.getElementById('novoEmail').value;
  const senha = document.getElementById('novaSenha').value;

  fetch(`${API}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha })
  })
    .then(res => res.json())
    .then(data => {
      alert('Usuário criado');
      listarUsuarios();
    });
}

function deletarUsuario(id) {
  fetch(`${API}/usuarios/${id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(() => {
      alert('Usuário excluído');
      listarUsuarios();
    });
}

function atualizarSenha() {
  const email = document.getElementById('emailSenha').value;       // Campo do email
  const senhaAtual = document.getElementById('senhaAtual').value;  // Campo senha atual
  const novaSenha = document.getElementById('novaSenha').value;    // Campo nova senha

  fetch(`${API}/usuarios/senha`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senhaAtual, novaSenha })
  })
    .then(res => {
      if (!res.ok) throw new Error('Erro ao atualizar a senha');
      return res.json();
    })
    .then(data => {
      alert(data.mensagem || 'Senha atualizada com sucesso!');
      // opcional: limpar campos ou redirecionar
    })
    .catch(err => alert(err.message));
}