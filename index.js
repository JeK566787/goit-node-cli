import { program } from 'commander';

import contacts from "./contacts.cjs";

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const allContacts = await contacts.getAll();
            return console.log(allContacts);
            break;

        case "get":
            const oneBook = await contacts.getById(id);
            return console.log(oneBook);
            break;

        case "add":
            const newBook = await contacts.add({ name, email, phone });
            return console.log(newBook);
            break;

        case "update":
            const updateContact = await contacts.updateById(id, { name, email, phone });
            return console.log(updateContact);
            break;

        case "remove":
            const deleteContact = await contacts.deleteById(id);
            return console.log(deleteContact);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(options);