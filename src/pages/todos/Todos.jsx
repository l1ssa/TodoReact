import React, { useState, useEffect } from 'react';
import { Button, Container, Form, ListGroup, Modal, Row, Col } from 'react-bootstrap';

const Todos = () => {
  const [notes, setNotes] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteNoteId, setDeleteNoteId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');
  const [editedTaskCompleted, setEditedTaskCompleted] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [editedNoteTitle, setEditedNoteTitle] = useState('');
  const [editedNoteIndex, setEditedNoteIndex] = useState(null);
  const [focusOnAddNoteInput, setFocusOnAddNoteInput] = useState(false);
  const [showEditTitleModal, setShowEditTitleModal] = useState({});

  useEffect(() => {
    if (editNoteId !== null) {
      const noteIndex = notes.findIndex(note => note.id === editNoteId);
      if (noteIndex !== -1) {
        setEditedNoteTitle(notes[noteIndex].title);
      }
    }
  }, [editNoteId, notes]);

  useEffect(() => {
    if (showAddNoteModal) {
      setFocusOnAddNoteInput(true);
    }
  }, [showAddNoteModal]);

  const addNote = () => {
    const newNote = {
      id: notes.length + 1,
      title: newNoteTitle,
      tasks: []
    };
    setNotes([...notes, newNote]);
    setShowAddNoteModal(false);
    setNewNoteTitle('');
    setFocusOnAddNoteInput(false);
  };

  const handleDeleteNote = (id) => {
    setShowConfirmModal(true);
    setDeleteNoteId(id);
  };

  const confirmDeleteNote = () => {
    if (deleteNoteId !== null) {
      setNotes(notes.filter(note => note.id !== deleteNoteId));
      setShowConfirmModal(false);
      setDeleteNoteId(null);
    }
  };

  const closeModal = () => {
    setShowConfirmModal(false);
    setDeleteNoteId(null);
    setShowEditModal(false);
    setEditNoteId(null);
    setEditTaskId(null);
    setEditedTaskText('');
    setEditedTaskCompleted(false);
    setFocusOnAddNoteInput(false);
    setShowEditTitleModal({});
  };

  const updateNoteTitle = () => {
    if (editedNoteIndex !== null && editedNoteTitle !== '') {
      const updatedNotes = [...notes];
      updatedNotes[editedNoteIndex].title = editedNoteTitle;
      setNotes(updatedNotes);
      setEditNoteId(null);
      setEditedNoteIndex(null);
      setEditedNoteTitle('');
      setShowEditTitleModal({});
    }
  };

  const deleteTask = (noteId, taskId) => {
    const noteIndex = notes.findIndex(note => note.id === noteId);
    if (noteIndex !== -1) {
      const updatedTasks = notes[noteIndex].tasks.filter(task => task.id !== taskId);
      const updatedNotes = [...notes];
      updatedNotes[noteIndex].tasks = updatedTasks;
      setNotes(updatedNotes);
    }
  };

  const editTaskText = (noteId, taskId) => {
    setEditNoteId(noteId);
    setEditTaskId(taskId);
    const noteIndex = notes.findIndex(note => note.id === noteId);
    if (noteIndex !== -1) {
      const task = notes[noteIndex].tasks.find(task => task.id === taskId);
      if (task) {
        setEditedTaskText(task.text);
        setEditedTaskCompleted(task.completed);
        setShowEditModal(true);
      }
    }
  };

  const confirmEditTask = () => {
    if (editNoteId !== null && editTaskId !== null) {
      const noteIndex = notes.findIndex(note => note.id === editNoteId);
      if (noteIndex !== -1) {
        const updatedTasks = notes[noteIndex].tasks.map(task =>
          task.id === editTaskId ? { ...task, text: editedTaskText, completed: editedTaskCompleted } : task
        );
        const updatedNotes = [...notes];
        updatedNotes[noteIndex].tasks = updatedTasks;
        setNotes(updatedNotes);
      }
      setShowEditModal(false);
      setEditNoteId(null);
      setEditTaskId(null);
      setEditedTaskText('');
      setEditedTaskCompleted(false);
    }
  };

  const toggleTaskCompletion = (noteId, taskId) => {
    const noteIndex = notes.findIndex(note => note.id === noteId);
    if (noteIndex !== -1) {
      const updatedTasks = notes[noteIndex].tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      const updatedNotes = [...notes];
      updatedNotes[noteIndex].tasks = updatedTasks;
      setNotes(updatedNotes);
    }
  };

  const Note = ({ note, index }) => {
    const [editedNoteTitle, setEditedNoteTitle] = useState(note.title);
    const [editNoteTitleMode, setEditNoteTitleMode] = useState(false);

    const handleChangeTitle = (event) => {
      setEditedNoteTitle(event.target.value);
    };

    const handleEditTitle = () => {
      setEditNoteTitleMode(true);
      setEditNoteId(note.id);
      setEditedNoteIndex(index);
      setEditedNoteTitle(note.title);
      setShowEditTitleModal({ [note.id]: true });
    };

    const handleCancelEditTitle = () => {
      setEditNoteTitleMode(false);
      setEditNoteId(null);
      setEditedNoteIndex(null);
      setEditedNoteTitle('');
      setShowEditTitleModal({});
    };

    const updateNoteTitle = () => {
      if (editedNoteTitle !== '') {
        const updatedNotes = [...notes];
        updatedNotes[index].title = editedNoteTitle;
        setNotes(updatedNotes);
        handleCancelEditTitle();
      }
    };

    return (
      <div className="note-container mb-4" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="note-title mb-3" style={{ maxWidth: '100%', overflowWrap: 'break-word', wordBreak: 'break-word', fontSize: '1.5rem' }}>
            {editNoteTitleMode ? (
              <input
                type="text"
                value={editedNoteTitle}
                onChange={handleChangeTitle}
                className="form-control mx-auto d-block"
                style={{ width: '100%' }}
              />
            ) : (
              note.title
            )}
          </h2>
        </div>
        <div className="d-flex ml-3" style={{ width: '100%' }}>
          {editNoteTitleMode ? (
            <>
              <button
                onClick={updateNoteTitle}
                className="btn btn-outline-success btn-sm mr-2 mb-2 rounded"
              >
                Сохранить
              </button>
              <button
                onClick={handleCancelEditTitle}
                className="btn btn-outline-danger btn-sm mb-2"
              >
                Отмена
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEditTitle}
                className="btn btn-outline-primary btn-sm mr-2 mb-2"
              >
                Редактировать
              </button>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="btn btn-outline-danger btn-sm mx-1 mb-2"
              >
                Удалить
              </button>
            </>
          )}
        </div>
        <div className="note-actions mb-2"></div>
        <TaskList noteId={note.id} tasks={note.tasks} />
        <Button
          onClick={() => addTask(note.id)}
          variant="outline-success"
          size="sm"
          style={{ marginTop: '10px' }}
        >
          Добавить задачу
        </Button>

        {/* Модальное окно редактирования заголовка */}
        <Modal show={showEditTitleModal[note.id]} onHide={handleCancelEditTitle} centered>
          <Modal.Header closeButton>
            <Modal.Title>Редактировать заголовок заметки</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="editNoteTitle">
              <Form.Label>Новый заголовок:</Form.Label>
              <Form.Control
                type="text"
                value={editedNoteTitle}
                onChange={handleChangeTitle}
                style={{ width: '100%' }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelEditTitle}>
              Отмена
            </Button>
            <Button variant="primary" onClick={updateNoteTitle}>
              Сохранить
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  const TaskList = ({ noteId, tasks }) => (
    <ListGroup>
      {tasks.map((task) => (
        <ListGroup.Item
          key={task.id}
          style={{
            maxWidth: '100%',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            fontSize: '1rem' 
          }}
        >
          <Form.Check
            className="task-checkbox"
            type="checkbox"
            label={task.text}
            checked={task.completed}
            onChange={() => toggleTaskCompletion(noteId, task.id)}
          />
          <TaskActions noteId={noteId} taskId={task.id} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );

  const TaskActions = ({ noteId, taskId }) => (
    <div className="task-actions">
      <Button
        onClick={() => editTaskText(noteId, taskId)}
        variant="outline-primary"
        size="sm"
        className="mr-1 mb-2"
      >
        Редактировать
      </Button>
      <Button
        onClick={() => toggleTaskCompletion(noteId, taskId)}
        variant="outline-success"
        size="sm"
        className="mx-1 mr-2 mb-2"
      >
        {getTaskCompletionStatus(noteId, taskId) ? 'Отменить выполнение' : 'Выполнено'}
      </Button>
      <Button
        onClick={() => deleteTask(noteId, taskId)}
        variant="outline-danger"
        size="sm"
        className="mb-2"
      >
        Удалить
      </Button>
    </div>
  );

  const getTaskCompletionStatus = (noteId, taskId) => {
    const note = notes.find((note) => note.id === noteId);
    const task = note.tasks.find((task) => task.id === taskId);
    return task.completed;
  };

  const addTask = (noteId) => {
    const noteIndex = notes.findIndex((note) => note.id === noteId);
    if (noteIndex !== -1) {
      const newTask = {
        id: notes[noteIndex].tasks.length + 1,
        text: `Новая задача ${notes[noteIndex].tasks.length + 1}`,
        completed: false
      };
      const updatedNotes = [...notes];
      updatedNotes[noteIndex].tasks.push(newTask);
      setNotes(updatedNotes);
    }
  };

  return (
    <Container fluid> 
      <h1 className="mt-4 text-center" style={{ fontSize: '2.5rem' }}>Список дел</h1>
      <Button
        onClick={() => setShowAddNoteModal(true)}
        variant="outline-success"
        className="mb-3"
        block
      >
        Добавить заметку
      </Button>
      <Row className="justify-content-start">
        {notes.map((note, index) => (
          <Col key={note.id} xs={12} sm={6} md={4} lg={3} className="mb-3 ml-3">
            <Note note={note} index={index} />
          </Col>
        ))}
      </Row>

      <Modal show={showConfirmModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Подтверждение удаления</Modal.Title>
        </Modal.Header>
        <Modal.Body>Вы уверены, что хотите удалить эту заметку?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Отмена
          </Button>
          <Button variant="danger" onClick={confirmDeleteNote}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Редактировать задачу</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="editTaskText">
            <Form.Label>Новый текст задачи:</Form.Label>
            <Form.Control
              type="text"
              value={editedTaskText}
              onChange={(e) => setEditedTaskText(e.target.value)}
              className="mx-auto d-block"
              style={{ width: '100%' }}
            />
          </Form.Group>
          <Form.Group controlId="editTaskCompleted" className="mb-0">
            <Form.Check
              type="checkbox"
              label="Задача выполнена"
              checked={editedTaskCompleted}
              onChange={() => setEditedTaskCompleted(!editedTaskCompleted)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Отмена
          </Button>
          <Button variant="primary" onClick={confirmEditTask}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddNoteModal} onHide={() => setShowAddNoteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Добавить новую заметку</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="newNoteTitle">
            <Form.Label>Заголовок заметки:</Form.Label>
            <Form.Control
              type="text"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              autoFocus={focusOnAddNoteInput}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddNoteModal(false)}>
            Отмена
          </Button>
          <Button variant="primary" onClick={addNote}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Todos;





















