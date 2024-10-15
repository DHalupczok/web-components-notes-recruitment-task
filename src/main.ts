import './style.css';
import './components/icons/MagnifyingGlassIcon.ts';
import './components/icons/NoteIcon.ts';
import './components/CustomInputComponent.ts';
import './components/NoteCardComponent.ts';
import './components/CreateNoteComponent.ts';
import './components/DeleteNoteModalComponent.ts';
import './components/NoNotesComponent.ts';
import { Note } from './model/note.model.ts';

interface State {
  filter: string;
  notes: Note[];
  filteredNotes: Note[];
}
const mainView = document.querySelector<HTMLDivElement>('#app');
mainView!.innerHTML = `
  <header class="mx"><note-icon></note-icon><h1>Notes</h1></header>
  <custom-input-component class="mx search-input" placeholder='Search notes...' class="search-input" id='search-input'>
    <magnifying-glass-icon class="search-input-icon" slot='prepend-element'></maginfying-glass-icon>
  </custom-input-component>
  <div id="notes-container"></div>
  <div id="modal-container"></div>
`;

//For searching

const searchInput = mainView?.querySelector('#search-input');
searchInput?.addEventListener('value-change', (e) => {
  const customEvent = e as CustomEvent;
  state.filter = customEvent.detail;
});

//For creating new notes

const addNote = (note: Note) => {
  const newNotes = [...state.notes, note];
  state.notes = newNotes;
};

const onAddNote = (e: Event) => {
  const customEvent = e as CustomEvent;
  const { title, description } = customEvent.detail;
  const newNote = new Note(title, description);
  addNote(newNote);
};

//for deleting notes

const deleteNote = (noteId: string) => {
  state.notes = state.notes.filter((note) => note.id !== noteId);
};

const onDeleteNote = (e: Event) => {
  const customEvent = e as CustomEvent;
  openDeleteModal(customEvent.detail);
};

const deleteModalContainer = mainView?.querySelector('#modal-container');

const openDeleteModal = (id: string) => {
  if (deleteModalContainer) {
    deleteModalContainer.innerHTML = `<delete-note-modal-component id="${id}"><delete-note-modal-component>`;
    deleteModalContainer.addEventListener('delete-note-confirmed', (e) => {
      const deleteEvent = e as CustomEvent;
      deleteNote(deleteEvent.detail);
      deleteModalContainer.innerHTML = '';
    });
    deleteModalContainer.addEventListener('delete-note-cancelled', () => {
      deleteModalContainer.innerHTML = '';
    });
  }
};

//for updating notes

const updateNote = (updatedNote: Note) => {
  const noteIndex = state.notes.findIndex((note) => note.id === updatedNote.id);
  if (noteIndex !== -1) {
    const newNotes = [...state.notes];
    newNotes[noteIndex] = updatedNote;
    state.notes = newNotes;
  }
};

const onUpdateNote = (e: Event) => {
  const customEvent = e as CustomEvent;
  updateNote(customEvent.detail);
};

//For notes list

const addEventListeners = (notesContainer: Element) => {
  const newNoteContainer = notesContainer.querySelector(
    'create-note-component',
  );
  if (newNoteContainer) {
    newNoteContainer.addEventListener('save-changes', onAddNote);
  }

  const noNotesComponent = notesContainer.querySelector('no-notes-component');
  if (noNotesComponent) {
    noNotesComponent.addEventListener('save-changes', onAddNote);
  }
  const noteComponents = notesContainer.querySelectorAll('note-card-component');
  if (noteComponents.length) {
    noteComponents.forEach((noteComponent) => {
      noteComponent.addEventListener('delete-note', onDeleteNote);
      noteComponent.addEventListener('update-note', onUpdateNote);
    });
  }
};

const notesContainer = mainView?.querySelector('#notes-container');

const renderNotes = () => {
  if (!notesContainer) return;
  const visibleNotes = state.filteredNotes.length
    ? `
    <create-note-component></create-note-component>
    ${state.filteredNotes.reduce((notesHtml, currentNote) => {
      const newNote = `<note-card-component 
        id='${currentNote.id}'
        title='${currentNote.title}'
        description='${currentNote.description}'
        createdAt='${currentNote.createdAt}'
        }'></note-card-component>`;
      return `${notesHtml} ${newNote}
        `;
    }, ``)}`
    : `<no-notes-component></no-notes-component>`;
  notesContainer.innerHTML = `${visibleNotes}`;
  addEventListeners(notesContainer);
};

const defaultState: State = {
  filter: '',
  notes: [],
  filteredNotes: [],
};

const state = new Proxy<State>(defaultState, {
  get(target, prop, receiver) {
    if (prop === 'filteredNotes') {
      return target.notes.filter(
        (note) =>
          note.title.toLowerCase().includes(target.filter.toLowerCase()) ||
          note.description.toLowerCase().includes(target.filter.toLowerCase()),
      );
    }
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    const result = Reflect.set(target, prop, value, receiver);
    if (prop === 'filter' || prop === 'notes') {
      renderNotes();
    }
    return result;
  },
});

renderNotes();
