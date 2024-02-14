import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import styles from './App.module.css';
import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const localContacts = localStorage.getItem('contacts');
    return localContacts ? JSON.parse(localContacts) : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const isDuplicate = contacts.some(
      contact => contact.name === newContact.name
    );
    if (isDuplicate) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    setContacts(prevContacts => [
      { id: nanoid(), ...newContact },
      ...prevContacts,
    ]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChangeFilter={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
