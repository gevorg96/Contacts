import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface IGetContacts {
    contactsList: ContactsData[];
    loading: boolean;
}
export class GetContacts extends React.Component<RouteComponentProps<{}>, IGetContacts> {
    constructor() {
        super();
        this.state = { contactsList: [], loading: true };
        fetch('api/contacts')
            .then(response => response.json() as Promise<ContactsData[]>)
            .then(data => {
                this.setState({ contactsList: data, loading: false });
            });

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderContacts(this.state.contactsList);
        return <div>
            <h1>Contacts</h1>
            <p>
                <Link to="/addContact"><button className="btn btn-primary">+</button></Link>
            </p>
            {contents}
        </div>;
    }

    private handleDelete(id: number) {
        if (!confirm("Do you want to delete employee with key: " + id))
            return;
        else {
            fetch('api/contacts/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        contactsList: this.state.contactsList.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
        }
    }
    private handleEdit(id: number) {
        this.props.history.push("/edit/" + id);
    }

    private renderContacts(contactsList: ContactsData[]) {
        return <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Key</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>FullName</th>
                    <th>Tel</th>
                    <th>E-mail</th>
                </tr>
            </thead>
            <tbody>
                {contactsList.map(contact =>
                    <tr key={contact.id}>
                        <td>{contact.key}</td>
                        <td>{contact.name}</td>
                        <td>{contact.surname}</td>
                        <td>{contact.name + ' ' + contact.surname}</td>
                        <td>{contact.tel}</td>
                        <td>{contact.email}</td>
                        <td>
                            <button className="btn btn-primary" onClick={(id) => this.handleEdit(contact.id)}>...</button>
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={(id) => this.handleDelete(contact.id)}>-</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

export class ContactsData {
    id: number = 0;
    key: string = "";
    name: string = "";
    surname: string = "";
    tel: string = "";
    email: string = "";
}