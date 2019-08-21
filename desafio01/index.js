const express = require('express');

const server = express();

server.use(express.json());

let numberOfRequests = 0;
const projects = [];

server.use((req, res, next) => {
  console.log(`Quantidade de Requisições: ${numberOfRequests = numberOfRequests + 1};`);
  next();
});

/**
 * Funcao para verificar se o projeto do ID informado existe
 */
function checkInArrayProjectExists(req, res, next) {
  const { id } = req.params;
  const listID = [];

  projects.forEach(project => {
    listID.push(project.id);
  });

  while (listID.indexOf(id) === -1) {
    return res.status(400).json({ error: 'Project does not exists' })
  };

  return next();
}

/**
 * Metodo para incluir projeto
 */
server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);

})

/**
 * Metodo para listar todos os projetos da variavel de classe projects
 */
server.get('/projects', (req, res) => {
  return res.json(projects);
});

/**
 * Metodo para incluir uma tarefa ao projeto
 */
server.post('/projects/:id/tasks', checkInArrayProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.forEach(project => {
    if (project.id === id) {
      project.tasks.push(title);
    }
  });

  return res.json(projects);
});

/**
 * Metodo para alterar o titulo de um projeto
 */
server.put('/projects/:id', checkInArrayProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.forEach(project => {
    if (project.id === id) {
      project.title = title;
    }
  });

  return res.json(projects);
});

/**
 * Metodo para remover um registro do array de projetos
 */
server.delete('/projects/:id', checkInArrayProjectExists, (req, res) => {
  const { id } = req.params;

  projects.forEach(project => {
    if (project.id === id) {
      projects.splice(projects.indexOf(project), 1);
    }
  });

  return res.json();
});

server.listen(3000);