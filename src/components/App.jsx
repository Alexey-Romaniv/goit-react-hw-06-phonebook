import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';

import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Section } from './Section/Section';
import PhoneBookForm from './AddedForm/AddContacts';
export const Phonebook = () => {
  const initialValues = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? initialValues
  );
  const [filter, setFilter] = useState('');

  const handleChange = filterKey => {
    setFilter(filterKey);
  };
  const addContact = ({ name, number }) => {
    const findSameContact = contacts.find(
      el => el.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );
    if (!findSameContact) {
      setContacts(prevCont => [{ name, number, id: nanoid() }, ...prevCont]);
    } else {
      Notify.warning(`${name} is already in contacts.`);
    }
  };

  const deleteContact = id => {
    setContacts(prevCont => prevCont.filter(el => el.id !== id));
  };
  const filterContacts = () => {
    if (filter) {
      return contacts.filter(({ name }) =>
        name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      );
    }
    return contacts;
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <Section title="Phonebook">
        <PhoneBookForm addContact={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter onHandleChange={handleChange} filter={filter} />
        <ContactList
          filterList={filterContacts}
          onDeleteContact={deleteContact}
        />
      </Section>
    </div>
  );
};
