import { Router } from "express";

const router = new Router();
const projects_array = [];
let numberOfRequests = 0;
function checkIfProjectExist(req, res, next) {
  const { id } = req.params;
  const index = projects_array.find(p => p.id === id);
  if (!index) {
    return res.status(400).json({ error: "Project not found!" });
  }
  return next();
}
function logRequest(req, res, next) {
  numberOfRequests++;
  console.log(`Numero de requisições: ${numberOfRequests}`);
  return next();
}
router.use(logRequest);

router.post("/projects", (req, res) => {
  const { id } = req.body;
  const { tittle } = req.body;
  const project = {
    id,
    tittle,
    task: []
  };
  projects_array.push(project);
  return res.send(project);
});

router.post("/projects/:id/tasks", checkIfProjectExist, (req, res) => {
  const { id } = req.params;
  const tittle = req.body.title;

  const project = projects_array.find(p => p.id == id);

  project.task = push(push(tittle));
  return res.json(projects_array);
});

router.get("/projects", (req, res) => {
  return res.json(projects_array);
});

router.put("/projects/:id", checkIfProjectExist, (req, res) => {
  const { id } = req.params;
  const index = projects_array.find(p => p.id == id);
  index.title = req.body.tittle;
  return res.json(projects_array);
});

router.delete("/projects/:id", checkIfProjectExist, (req, res) => {
  const { id } = req.params;
  const index = projects_array.findIndex(p => p.id == id);

  projects_array.splice(index, 1);
  return res.send();
});

export default router;
