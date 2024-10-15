import './style.css';
import './components/HelloWorld.ts';
import './components/icons/InfoIcon.ts';
import './components/icons/TrashIcon.ts';
import './components/icons/MagnifyingGlassIcon.ts';
import './components/icons/AddNoteIcon.ts';
import './components/icons/NoteIcon.ts';
import './components/icons/EditNoteIcon.ts';
import './components/CustomButtonComponent.ts';
import './components/CustomInputComponent.ts';
import './components/NoteCardComponent.ts';
import './components/NoteFormComponent.ts';
import './components/CreateNoteComponent.ts';
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
  <create-note-component></create-note-component>
  <div id="notes-container"></div>
  
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
  const { title, body } = customEvent.detail;
  const newNote = new Note(title, body);
  console.error('Próbuję dodać takie coś', customEvent.detail);
  addNote(newNote);
};

const newNoteContainer = mainView?.querySelector('create-note-component');
if (newNoteContainer) {
  newNoteContainer.addEventListener('save-changes', onAddNote);
}

//for deleting notes

const deleteNote = (noteId: string) => {
  state.notes = state.notes.filter((note) => note.id !== noteId);
};

const onDeleteNote = (e: Event) => {
  const customEvent = e as CustomEvent;
  deleteNote(customEvent.detail);
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
  const noteComponents = notesContainer.querySelectorAll('note-card-component');
  if (noteComponents.length) {
    noteComponents.forEach((noteComponent) => {
      noteComponent.addEventListener('delete-note', onDeleteNote);
      noteComponent.addEventListener('update-note', onUpdateNote);
    });
  }
};

const notesContainer = mainView?.querySelector('#notes-container');

const render = () => {
  if (!notesContainer) return;
  const visibleNotes = state.filteredNotes.length
    ? state.filteredNotes.reduce((notesHtml, currentNote) => {
        const newNote = `<note-card-component 
        id='${currentNote.id}'
        title='${currentNote.title}'
        description='${currentNote.description}'
        createdAt='${currentNote.createdAt}'
        }'></note-card-component>`;
        return `${notesHtml} ${newNote}
        `;
      }, ``)
    : `<hello-world></hello-world>`;
  notesContainer.innerHTML = visibleNotes;
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
      return target.notes.filter((note) => {
        return (
          note.title.includes(target.filter) ||
          note.description.includes(target.filter)
        );
      });
    }
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    const result = Reflect.set(target, prop, value, receiver);
    if (prop === 'filter' || prop === 'notes') {
      render();
    }
    return result;
  },
});

//TODO remove
const createNotes = () => {
  addNote(new Note('Cat 1', 'Description for note 1'));
  addNote(new Note('Cat 2', 'Description for note 2'));
  addNote(new Note('Dog 1', 'Description for note 3'));
  addNote(new Note('Dog 2', 'Description for note 4'));
  addNote(new Note('Turtle 1', 'Description for note 5'));
};

createNotes();
