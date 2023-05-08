import { useAdminState } from "context/useAdminState";
import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import Main from "components/main";
import ModalEditar from "./modalEditar";
import {
  Badge,
  Table,
  Button,
  Container,
  Modal,
  Dropdown,
  InputGroup,
  Form,
  Pagination,
  Spinner,
} from "react-bootstrap";
import { FaTrash, FaSync } from "react-icons/fa";
import withAuth from "utils/withAuth";
import Head from "next/head";

const Index = () => {
  const {
    projects,
    isLoading,
    fetchAdminProjects,
    publishProject,
    unpublishProject,
    deleteProject,
    updateProject,
  } = useAdminState();

  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);

  //SEARCH PROJECTS
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //SORT PROJECTS
  const sortedProjects = useMemo(() => {
    let sortableProjects = [...filteredProjects];
    if (sortConfig !== null) {
      sortableProjects.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProjects;
  }, [filteredProjects, sortConfig]);

  // Função para lidar com a solicitação de classificação
  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  //PAGINATION
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = sortedProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(sortedProjects.length / projectsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }
  const renderPagination = pageNumbers.map((number) => (
    <Pagination.Item
      key={number}
      active={number === currentPage}
      onClick={() => setCurrentPage(number)}
    >
      {number}
    </Pagination.Item>
  ));

  //DELETE PROJECT
  const handleDeleteProject = (id) => {
    setProjectToDelete(id);
    setShowDeleteConfirmationModal(true);
  };

  const confirmDeleteProject = () => {
    deleteProject(projectToDelete);
    setShowDeleteConfirmationModal(false);
  };

  //ALTER MULTIPLE PROJECTS
  const publishSelectedProjects = () => {
    selectedProjects.forEach((id) => {
      publishProject(id);
    });
    setSelectedProjects([]); // Limpar a seleção após publicar os projetos
  };

  const unpublishSelectedProjects = () => {
    selectedProjects.forEach((id) => {
      unpublishProject(id);
    });
    setSelectedProjects([]); // Limpar a seleção após despublicar os projetos
  };

  //SELECT PROJECTS
  const handleSelectProject = (id) => {
    setSelectedProjects((prevSelectedProjects) => {
      if (prevSelectedProjects.includes(id)) {
        return prevSelectedProjects.filter((projectId) => projectId !== id);
      } else {
        return [...prevSelectedProjects, id];
      }
    });
  };

  const handleSelectAllProjects = () => {
    if (selectedProjects.length === projects.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(projects.map((project) => project.id));
    }
  };

  //EDIT PROJECTS
  const [isEditing, setIsEditing] = useState(false);
  const { handleSubmit, setValue } = useForm();
  const [showEditModal, setShowEditModal] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);

  // const toggleEdit = () => {
  //   setIsEditing(!isEditing);
  // };

  const openEditModal = (project) => {
    setProjectToEdit(project);
    Object.keys(project).forEach((fieldName) => {
      setValue(fieldName, project[fieldName]);
    });
    setShowEditModal(true);
  };

  const confirmEditProject = (formData) => {
    updateProject(projectToEdit.id, formData);
    setIsEditing(false); // Desabilita o modo de edição após a atualização do projeto
    setShowEditModal(false);
  };

  //FETCH PROJECTS
  useEffect(() => {
    fetchAdminProjects();
  }, []);

  //FETCH COLUNAS DO PROJETO PARA EDITAR
  // const { techData, courseData, yearData, semesterData, industryData } =
  //   useInscreverState();

  //MENSAGEM DE ATUALIZAÇAO
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // isso faz o div ocupar a altura total da tela
        }}
      >
        <Spinner
          animation="grow"
          size="sm"
          className="me-2"
          role="status"
        ></Spinner>
        Atualizando projetos...
      </div>
    );
  }

  return (
    <Main>
      <Head>
        <title>Inovatec | Admin Dashboard</title>
      </Head>
      <Container className="p-5" fluid>
        <div className="px-5 py-2">
          <h2 className="mb-3">Admin Dashboard</h2>
          <div className="d-flex align-items-center mb-4">
            <InputGroup className="me-2">
              <Form.Control
                type="text"
                placeholder="Buscar projetos..."
                aria-label="Buscar projetos..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </InputGroup>
            <Button
              variant="outline-primary"
              className="me-2"
              size="md"
              onClick={() => {
                fetchAdminProjects();
              }}
            >
              <FaSync />
            </Button>
            <Dropdown size="sm">
              <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                Ordenar por
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => requestSort("name")}>
                  Nome
                </Dropdown.Item>
                <Dropdown.Item onClick={() => requestSort("date")}>
                  Data
                </Dropdown.Item>
                <Dropdown.Item onClick={() => requestSort("status")}>
                  Status
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <Table striped bordered hover responsive>
            <thead className="fw-bold">
              <tr>
                <th className="text-center">
                  <input
                    type="checkbox"
                    onChange={handleSelectAllProjects}
                    checked={selectedProjects.length === projects.length}
                  />
                </th>
                <th className="text-center">Nome</th>
                <th className="text-center">Data</th>
                <th className="text-center">Status</th>
                <th className="text-center">Administrar</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.map((project) => (
                <tr key={project.id}>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      onChange={() => handleSelectProject(project.id)}
                      checked={selectedProjects.includes(project.id)}
                    />
                  </td>
                  <td className="">{project.name}</td>
                  <td className="text-center">
                    {new Date(project.date).toLocaleString()}
                  </td>
                  <td className="text-center">
                    <Badge pill bg={project.status ? "success" : "danger"}>
                      {project.status ? "Published" : "Unpublished"}
                    </Badge>
                  </td>
                  <td className="text-center">
                    {selectedProjects.length <= 1 &&
                      project.status === false && (
                        <Button
                          variant="primary"
                          size="sm"
                          className="me-2"
                          onClick={() => publishProject(project.id)}
                        >
                          Publish
                        </Button>
                      )}
                    {selectedProjects.length <= 1 &&
                      project.status === true && (
                        <Button
                          variant="primary"
                          size="sm"
                          className="me-2"
                          onClick={() => unpublishProject(project.id)}
                        >
                          Unpublish
                        </Button>
                      )}

                    {selectedProjects.length > 1 &&
                      project.status === false && (
                        <Button
                          variant="primary"
                          size="sm"
                          className="me-2"
                          onClick={publishSelectedProjects}
                        >
                          Publicar Seleção
                        </Button>
                      )}

                    {selectedProjects.length > 1 && project.status === true && (
                      <Button
                        variant="primary"
                        size="sm"
                        className="me-2"
                        onClick={unpublishSelectedProjects}
                      >
                        Despublicar Seleção
                      </Button>
                    )}

                    <Button
                      variant="info"
                      size="sm text-white"
                      className="me-0 me-md-2 mt-2 mt-lg-0"
                      onClick={() => openEditModal(project)}
                    >
                      Revisar
                    </Button>

                    <Button
                      variant="danger mt-2 mt-lg-0 text-center"
                      size="sm"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>{renderPagination}</Pagination>
          {/* MODAL EXCLUIR */}
          <Modal
            centered
            className="p-5"
            show={showDeleteConfirmationModal}
            onHide={() => setShowDeleteConfirmationModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Excluir Projeto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Tem certeza que deseja excluir este projeto? Esta ação é
              irreversível e deletará todos os dados associados ao projeto.
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteConfirmationModal(false)}
              >
                Cancelar
              </Button>
              <Button variant="danger" onClick={confirmDeleteProject}>
                Excluir
              </Button>
            </Modal.Footer>
          </Modal>

          {/* MODAL EDITAR */}
          <Modal
            centered
            size="xl"
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Editar Projeto</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form onSubmit={handleSubmit(confirmEditProject)}>
                <ModalEditar project={projectToEdit} isEditing={isEditing} />
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowEditModal(false)}
              >
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => setIsEditing(true)}>
                Editar
              </Button>
              <Button variant="primary" disabled={!isEditing}>
                Salvar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Container>
    </Main>
  );
};

export default withAuth(Index);
