import React, { PureComponent } from 'react';

import TextField from '@material-ui/core/TextField';

import './style.css';

import { MyButton } from '../UIComponents/MyButton';
import RadioButtonsGroup from '../UIComponents/Radio';
import CheckboxesGroup from '../UIComponents/CheckBox';

class Form extends PureComponent {
    constructor(props) {
        super(props);
        const { defaultId, oldName, oldCompany, oldEMail, oldPhoneNumber, oldStatus, oldTextArea } = this.props;
        this.state = {
            _id: defaultId || Date.now(),
            name: oldName || '',
            company: oldCompany || '',
            eMail: oldEMail || '',
            phoneNumber: oldPhoneNumber || '',
            status: oldStatus || '',
            category: [],
            textArea: oldTextArea || '',
        };
        this.textChange = this.textChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.takeStatus = this.takeStatus.bind(this);
        this.takeCategory = this.takeCategory.bind(this);
    }

    textChange(e) {
        this.setState({
            [e.target.id]: e.target.value || '',
        });
    }

    takeStatus(status) {
        this.setState({
            status: status,
        });
    }

    takeCategory(category) {
        this.setState({
            category: [...this.state.category, category],
        });
    }

    submitForm(e) {
        e.preventDefault();
        const { name, company, eMail, phoneNumber, status, category, textArea, photo } = this.state;
        const note = {
            _id: this.props.defaultId || 'peopleList_' + Date.now(),
            name,
            company,
            eMail,
            phoneNumber,
            status: status || 'unnecessary',
            category,
            textArea,
        };
        this.props.action(note);

        if(this.props.sendButtonTitle === 'create') {
            const options = {
                method: 'post',
                headers: new Headers({
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(note),
            };
            fetch("http://localhost:5000/people", options);
        } else {
            const options = {
                method: 'put',
                headers: new Headers({
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(note),
            };
            fetch("http://localhost:5000/people", options);
        }

        if(this.props.showForm) {
            this.props.showForm();
        }
        if(this.props.changeButtonTitle) {
            this.props.changeButtonTitle();
        }
    }

    render() {
        const { sendButtonTitle } = this.props;
        let placeHolder = sendButtonTitle === 'create' ? 'enter' : 'change';
        const { name, company, eMail, phoneNumber, textArea } = this.state;
        return (
            <div className="wrapper">
                <form className="form" onSubmit={this.submitForm}>
                    <div className="leftWrapper">
                    <TextField
                        id="name"
                        label={placeHolder + ' Name'}
                        value={name}
                        onChange={this.textChange}
                        margin="normal"
                    />
                    <TextField
                        id="company"
                        label={placeHolder + ' the Company'}
                        value={company}
                        onChange={this.textChange}
                        margin="normal"
                    />
                    <TextField
                        id="eMail"
                        label={placeHolder + ' an e-mail'}
                        value={eMail}
                        onChange={this.textChange}
                        margin="normal"
                    />
                    <TextField
                        id="phoneNumber"
                        label={placeHolder + ' phone Number'}
                        value={phoneNumber}
                        onChange={this.textChange}
                        margin="normal"
                    />
                    </div>
                    <div className="rightWrapper">
                    <RadioButtonsGroup takeStatus={this.takeStatus}/>
                    <CheckboxesGroup takeCategory={this.takeCategory} />
                    <MyButton action={this.submitForm} title={sendButtonTitle} variant="contained" color="primary"/>
                    </div>
                    <textarea id="textArea" onChange={this.textChange} cols="30" rows="5" placeholder="Write some notes">{textArea}</textarea>
                </form>
            </div>
        );
    }
}

export default Form;