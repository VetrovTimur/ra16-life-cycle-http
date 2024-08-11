import { useEffect, useState } from 'react';

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:7070/notes');
      const data = await response.json();
      setNotes(data);
      console.log(data);
    } catch (error) {
      console.error('Ошибка при загрузке заметок:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async () => {
    if (!content) return; 

    const newNote = {
      id: 0, 
      content,
    };

    try {
      await fetch('http://localhost:7070/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });

      fetchNotes();
      setContent(''); 
    } catch (error) {
      console.error('Ошибка при добавлении заметки:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`http://localhost:7070/notes/${id}`, {
        method: 'DELETE',
      });

      fetchNotes();
    } catch (error) {
      console.error('Ошибка при удалении заметки:', error);
    }
  };

  const refreshNotes = () => {
    fetchNotes();
  };

  return (
    <div>
      <h1>Заметки</h1>
      <div>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Введите заметку"
        />
        <button onClick={addNote}>Добавить</button>
        <button onClick={refreshNotes}>Обновить</button>
      </div>
      <div>
        {notes.map((note) => (
          <div key={note.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
            <span>{note.content}</span>
            <button onClick={() => deleteNote(note.id)}>❌</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesApp;
