import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleNumberChange = event => {
    setNumber(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onAddContact({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Z ]+$"
          onChange={handleNameChange}
          title="Name may contain only letters and spaces."
          required
        />
      </label>
      <label>
        Number
        <input
          type="tel"
          value={number}
          onChange={handleNumberChange}
          pattern="[0-9]+"
          title="Phone number must be digits only"
          required
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
