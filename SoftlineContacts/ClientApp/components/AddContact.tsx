import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { ContactsData } from './GetContacts';

interface IAddContact {
    title: string;
    loading: boolean;
    contactsData: ContactsData;
}
export class AddContact extends React.Component<RouteComponentProps<{}>, IAddContact> {
    constructor(props) {
        super(props);
        this.state = { title: "", loading: true, contactsData: new ContactsData };
        
        var contactKey = this.props.match.params["key"];

        if (contactKey != undefined && contactKey != "" && contactKey != null) {
            fetch('api/contacts/' + contactKey)
                .then(response => response.json() as Promise<ContactsData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, contactsData: data });
                });
        }

        else {
            this.state = { title: "Create", loading: false, contactsData: new ContactsData };
        }

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }


    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();
        return <div>
            <h1>{this.state.title}</h1>
            <h3>Contact</h3>
            <hr />
            {contents}
        </div>;
    }

    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        if (this.state.contactsData.id) {
            fetch('api/contacts', {
                method: 'PUT',
                body: data,
            }).then((response) => {
                if (response.status == 400) {
                    confirm('Invalid Contact key')
                }
                else if (response.status == 200) {
                    this.props.history.push("/");
                }
            })
        }

        else {
            fetch('api/contacts', {
                method: 'POST',
                body: data,
            }).then((response) => {
                if (response.status == 400) {
                    confirm('Invalid Contact key')
                }
                else if (response.status == 200) {
                    this.props.history.push("/");
                }
            });     
        }
    }


    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/");
    }

    private validateNames(e) {
        //if(!/^[а-яa-z]+$/i.test(e.target.value));
        e.value = e.value.replace(/(\..*)\./g, '$1');
    }

    private renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="id" value={this.state.contactsData.id} />
                </div>
                <div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Key">Key</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Key" defaultValue={this.state.contactsData.key} required />
                    </div>
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" pattern="^[а-яА-ЯеЁa-zA-Z]+$" name="Name" defaultValue={this.state.contactsData.name} required />
                    </div>
                    <div>

                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Surname">Surname</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" pattern="^[а-яА-ЯеЁa-zA-Z]+$" name="Surname" defaultValue={this.state.contactsData.surname} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Tel" >Tel</label>
                    <div className="col-md-4">
                        <input className="form-control" type="tel" pattern="^[0-9]+$" name="Tel" defaultValue={this.state.contactsData.tel} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Email">Email</label>
                    <div className="col-md-4">
                        <input className="form-control" type="email" name="Email" defaultValue={this.state.contactsData.email} />
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }
}