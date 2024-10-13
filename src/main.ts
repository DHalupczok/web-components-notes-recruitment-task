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
import { Note } from './model/note.model.ts';

interface State {
  filter: string;
  notes: Note[];
  filteredNotes: Note[];
}
const mainView = document.querySelector<HTMLDivElement>('#app');
mainView!.innerHTML = `
<note-card-component id="1" title="Sample Title" description="Sample Description" createdAt="2024-05-22T00:00:00Z"></note-card-component>
  <header class="mx"><note-icon></note-icon><h1>Notes</h1></header>
  <custom-input-component class="mx search-input" placeholder='Search notes...' class="search-input" id='search-input'>
    <magnifying-glass-icon class="search-input-icon" slot='prepend-element'></maginfying-glass-icon>
  </custom-input-component>
  <custom-button-component class="add-new-note-btn" id='add-new-note'>Add New</custom-button-component>
  <div id="notes-container"></div>
  
`;

const notesContainer = mainView?.querySelector('#notes-container');

const render = () => {
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
  if (notesContainer) notesContainer.innerHTML = visibleNotes;
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

const addNote = (note: Note) => {
  const newNotes = [...state.notes, note];
  state.notes = newNotes;
};
//TODO remove
const createNotes = () => {
  addNote(new Note('Cat 1', 'Description for note 1'));
  addNote(new Note('Cat 2', 'Description for note 2'));
  addNote(new Note('Dog 1', 'Description for note 3'));
  addNote(new Note('Dog 2', 'Description for note 4'));
  addNote(new Note('Turtle 1', 'Description for note 5'));
};

createNotes();

const searchInput = mainView?.querySelector('#search-input');
searchInput?.addEventListener('value-change', (e) => {
  const customEvent = e as CustomEvent;
  state.filter = customEvent.detail;
});
