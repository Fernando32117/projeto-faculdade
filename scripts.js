function handlePersonalLogin(event) {
  event.preventDefault();

  const email = document.getElementById("personal-email").value;
  const password = document.getElementById("personal-password").value;
  const cref = document.getElementById("personal-cref").value;

  if (email && password && cref) {
    alert("Login realizado com sucesso !");
    window.location.href = "dashboard-personal.html";
  } else {
    alert("Por favor, preencha todos os campos!");
  }
}

function handleAlunoLogin(event) {
  event.preventDefault();

  const email = document.getElementById("aluno-email").value;
  const password = document.getElementById("aluno-password").value;

  if (email && password) {
    alert("Login realizado com sucesso !");
    window.location.href = "dashboard-aluno.html";
  } else {
    alert("Por favor, preencha todos os campos!");
  }
}

function handleCadastroTreino(event) {
  event.preventDefault();

  const alunoSelecionado = document.getElementById("aluno").value;
  const grupoMuscular = document.getElementById("grupo-muscular").value;
  const series = document.getElementById("series").value;
  const repeticoes = document.getElementById("repeticoes").value;
  const observacoes = document.getElementById("observacoes").value;
  const gifInput = document.getElementById("gifInput").files[0];

  if (!alunoSelecionado && grupoMuscular && series && repeticoes && observacoes && gifInput) {
      alert("Por favor, preencha todos os campos.");
  }

  // Aqui você pode implementar a lógica de salvar o treino para o aluno selecionado
  alert(`Treino cadastrado para o aluno ${alunoSelecionado}!`);
  window.location.href = "dashboard-personal.html";
}

// function buscarAluno(event) {
//   const query = event.target.value.toLowerCase();
//   const listaAlunos = document.getElementById("lista-alunos");
//   listaAlunos.innerHTML = ""; // Limpa a lista anterior

//   const alunosFiltrados = alunos.filter(aluno => aluno.nome.toLowerCase().includes(query));

//   alunosFiltrados.forEach(aluno => {
//       const item = document.createElement("div");
//       item.className = "aluno-item";
//       item.textContent = aluno.nome;
//       item.onclick = () => selecionarAluno(aluno);
//       listaAlunos.appendChild(item);
//   });

//   listaAlunos.style.display = alunosFiltrados.length ? "block" : "none";
// }

// function selecionarAluno(aluno) {
//   document.getElementById("aluno").value = aluno.nome;
//   document.getElementById("lista-alunos").style.display = "none";
// }


function showCadastroAluno() {
  window.location.href = 'cadastro-aluno.html';
}

function showCadastroTreino() {
  window.location.href = 'cadastro-treino.html';
}

function voltarDashboardPersonal() {
  window.location.href = 'dashboard-personal.html';
}

function voltarDashboardAluno() {
  window.location.href = 'dashboard-aluno.html';
}

function exit() {
  window.location.href = 'index.html';
}

function treino() {
  window.location.href = 'treinos.html';
}