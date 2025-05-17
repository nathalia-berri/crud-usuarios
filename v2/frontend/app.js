const API = 'http://localhost:3000';

if (window.location.pathname.includes('dashboard.html')) {
  listarUsuarios();
}

window.fazerLogin = function () {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  })
    .then(res => {
      if (!res.ok) throw new Error('Login inválido');
      return res.json();
    })
    .then(data => {
      // Armazena o token recebido
      localStorage.setItem('token', data.token);
      window.location.href = 'dashboard.html';
    })
    .catch(err => alert(err.message));
};

function listarUsuarios() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Você precisa estar logado para ver os usuários');
    window.location.href = 'index.html';
    return;
  }

  fetch(`${API}/usuarios`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(async res => {
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        const msg = errorData?.erro || 'Erro ao buscar usuários';
        throw new Error(msg);
      }
      return res.json();
    })
    .then(usuarios => {
      console.log('Resposta da API:', usuarios);
      const lista = document.getElementById('listaUsuarios');
      lista.innerHTML = '';

      if (!Array.isArray(usuarios)) {
        alert('Erro: resposta inesperada da API ao listar usuários.');
        return;
      }

      usuarios.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `${user.nome} (${user.email}) <button onclick="deletarUsuario(${user.id})">Excluir</button>`;
        lista.appendChild(li);
      });
    })
    .catch(err => {
      console.error('Erro ao listar usuários:', err);
      alert(err.message);
      window.location.href = 'index.html';
    });
}


function criarUsuario() {
  const nome = document.getElementById('novoNome').value;
  const email = document.getElementById('novoEmail').value;
  const senha = document.getElementById('novaSenha').value;
  const token = localStorage.getItem('token');

  fetch(`${API}/usuarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ nome, email, senha })
  })
    .then(res => res.json())
    .then(() => {
      alert('Usuário criado');
      listarUsuarios();
    });
}

function deletarUsuario(id) {
  const token = localStorage.getItem('token');

  fetch(`${API}/usuarios/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(() => {
      alert('Usuário excluído');
      listarUsuarios();
    });
}
