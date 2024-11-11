window.onload = function () {
  // Função para limpar o localStorage ao fazer logout
  function logout() {
    localStorage.removeItem('nomePersonal');
    localStorage.removeItem('nomeAluno'); // Remover o nome do aluno também
    window.location.href = "loginPersonal.html";
  }

  // Adiciona a função de logout ao botão de sair
  const exitButtons = document.querySelectorAll('button[onclick="exit()"]');
  exitButtons.forEach(button => button.addEventListener('click', logout));

  // Verifica se o formulário de login do personal está presente no DOM
  const formLoginPersonal = document.getElementById("formLoginPersonal");

  if (formLoginPersonal) {
    formLoginPersonal.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailPersonal = document.getElementById("emailPersonal").value;
      const passwordPersonal = document.getElementById("passwordPersonal").value;

      fetch('http://localhost:3000/loginPersonal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ emailPersonal, passwordPersonal })
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => { throw new Error(error.message); });
        }
        return response.json();
      })
      .then(data => {
        alert('Login realizado com sucesso! Bem-vindo(a), ' + data.nomePersonal);

        // Armazena o nome do personal no localStorage
        localStorage.setItem('nomePersonal', data.nomePersonal);

        window.location.href = "dashboardPersonal.html";
      })
      .catch((error) => {
        alert('Erro no login: ' + error.message);
      });
    });
  }

  // Verifica se o formulário de cadastro de personal está presente no DOM
  const formCadastroPersonal = document.getElementById("formCadastroPersonal");

  if (formCadastroPersonal) {
    formCadastroPersonal.addEventListener("submit", function (e) {
      e.preventDefault();

      const nomePersonal = document.getElementById("nomePersonal").value;
      const emailPersonal = document.getElementById("emailPersonal").value;
      const passwordPersonal = document.getElementById("passwordPersonal").value;
      const cref = document.getElementById("cref").value;

      fetch('http://localhost:3000/usuarioPersonal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nomePersonal, emailPersonal, passwordPersonal, cref })
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => { throw new Error(error.message); });
        }
        return response.json();
      })
      .then(data => {
        alert('Personal cadastrado com sucesso! ID: ' + data.id);

        // Armazena o nome do personal no localStorage
        localStorage.setItem('nomePersonal', nomePersonal);

        window.location.href = "dashboardPersonal.html";
      })
      .catch((error) => {
        alert('Erro no cadastro: ' + error.message);
      });
    });
  }

  // Verifica se o formulário de login do aluno está presente no DOM
  const formLoginAluno = document.getElementById("formLoginAluno");

  if (formLoginAluno) {
    formLoginAluno.addEventListener("submit", function (e) {
      e.preventDefault();

      const alunoLogin = document.getElementById("alunoLogin").value;
      const alunoPassword = document.getElementById("alunoPassword").value;

      fetch('http://localhost:3000/loginAluno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ alunoLogin, alunoPassword })
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => { throw new Error(error.message); });
        }
        return response.json();
      })
      .then(data => {
        alert('Login realizado com sucesso! Bem-vindo(a), ' + data.nomeAluno);

        // Armazena o nome do aluno no localStorage
        localStorage.setItem('nomeAluno', data.nomeAluno);

        window.location.href = "dashboardAluno.html"; // Defina o redirecionamento para o dashboard do aluno
      })
      .catch((error) => {
        alert('Erro no login: ' + error.message);
      });
    });
  }

  // Verifica se o formulário de cadastro de aluno está presente no DOM
  const formCadastroAluno = document.getElementById("formCadastroAluno");

  if (formCadastroAluno) {
    formCadastroAluno.addEventListener("submit", function (e) {
      e.preventDefault();

      const nomeAluno = document.getElementById("nomeAluno").value;
      const generoAluno = document.getElementById("generoAluno").value;
      const alunoNascimento = document.getElementById("alunoNascimento").value;
      const alunoPeso = document.getElementById("alunoPeso").value;
      const alunoAltura = document.getElementById("alunoAltura").value;
      const alunoLogin = document.getElementById("alunoLogin").value;
      const alunoPassword = document.getElementById("alunoPassword").value;

      fetch('http://localhost:3000/usuarioAluno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nomeAluno, generoAluno, alunoNascimento, alunoPeso, alunoAltura, alunoLogin, alunoPassword })
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => { throw new Error(error.message); });
        }
        return response.json();
      })
      .then(data => {
        alert('Aluno cadastrado com sucesso! : ' + nomeAluno);
        window.location.href = "dashboardPersonal.html"
      })
      .catch((error) => {
        alert('Erro no cadastro: ' + error.message);
      });
    });
  }

  // Exibir o nome do aluno no dashboard
  const nomeAluno = localStorage.getItem('nomeAluno');
  if (nomeAluno) {
    document.getElementById('alunoName').innerText = nomeAluno;
  }
};


function treino() {
  const nomeAluno = localStorage.getItem('nomeAluno');
  
  fetch(`http://localhost:3000/treinosAluno/${nomeAluno}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao buscar os treinos');
      }
      return response.json();
    })
    .then(treinos => {
      const treinoContainer = document.createElement('div');
      treinoContainer.classList.add('treino-list');

      treinos.forEach(treino => {
        const treinoItem = document.createElement('div');
        treinoItem.classList.add('treino-item');

        treinoItem.innerHTML = `
          <h4>${treino.grupoMuscular}</h4>
          <p>Séries: ${treino.series}</p>
          <p>Repetições: ${treino.repeticoes}</p>
          <p>Observações: ${treino.observacoes || 'N/A'}</p>
          ${treino.gif ? `<img src="data:image/gif;base64,${treino.gif}" alt="Exemplo">` : ''}
        `;

        treinoContainer.appendChild(treinoItem);
      });

      document.body.appendChild(treinoContainer);
    })
    .catch(error => {
      alert(error.message);
    });
}












function handleCadastroTreino(event) {
  event.preventDefault(); // Previne o comportamento padrão do formulário

  const aluno = document.getElementById("aluno").value;
  const grupoMuscular = document.getElementById("grupoMuscular").value;
  const series = document.getElementById("series").value;
  const repeticoes = document.getElementById("repeticoes").value;
  const observacoes = document.getElementById("observacoes").value;
  const gifInput = document.getElementById("gifInput").files[0];

  const formData = new FormData();
  formData.append('alunoId', aluno);
  formData.append('grupoMuscular', grupoMuscular);
  formData.append('series', series);
  formData.append('repeticoes', repeticoes);
  formData.append('observacoes', observacoes);
  formData.append('gif', gifInput);

  fetch('http://localhost:3000/cadastroTreinoAluno', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log('Sucesso:', data);
      alert('Treino cadastrado com sucesso! ID: ' + data.aluno);
      window.location.href = "dashboardPersonal.html";
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
}


function showCadastroPersonal() {
  window.location.href = 'cadastroPersonal.html';
}

function showCadastroAluno() {
  window.location.href = 'cadastroAluno.html';
}

function showCadastroTreino() {
  window.location.href = 'cadastroTreino.html';
}

function voltarDashboardPersonal() {
  window.location.href = 'dashboardPersonal.html';
}

function voltarDashboardAluno() {
  window.location.href = 'dashboardAluno.html';
}

function exit() {
  window.location.href = 'index.html';
}

function treino() {
  window.location.href = 'treinos.html';
}