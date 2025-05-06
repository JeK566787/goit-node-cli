const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require('uuid');


const contactsPath = path.join(__dirname, "/db/contacts.json");
console.log(contactsPath);

const getAll = async () => {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
}

const getById = async (id) => {
    const contacts = await getAll();
    const result = contacts.find(item => item.id === id);
    return result || null;
}

const add = async (data) => {
    const contacts = await getAll();
    const newContact = {
        id: uuidv4(),
        ...data,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

const updateById = async (id, data) => {
    const contacts = await getAll();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    contacts[index] = { id, ...data };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}

const deleteById = async (id) => {
    const contacts = await getAll();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    deleteById,
};