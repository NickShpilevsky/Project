import React, { PureComponent } from 'react';

import TextField from '@material-ui/core/TextField';

import './style.css';

import { MyButton } from '../UIComponents/MyButton';
import RadioButtonsGroup from '../UIComponents/Radio';
import CheckboxesGroup from '../UIComponents/CheckBox';

class Form extends PureComponent {
    constructor(props) {
        super(props);
        const { defaultId, oldName, oldCompany, oldEMail, oldPhoneNumber, oldStatus, oldCategories,  oldTextArea } = this.props;
        this.state = {
            _id: defaultId || Date.now(),
            name: oldName || '',
            company: oldCompany || '',
            eMail: oldEMail || '',
            phoneNumber: oldPhoneNumber || '',
            status: oldStatus || '',
            categories: oldCategories || [],
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
        const { categories } = this.state;
        this.setState({
            categories: categories.indexOf(category) === -1 ? [...categories, category] : categories.filter(item => item !== category),
        });
    }

    submitForm(e) {
        e.preventDefault();
        const { name, company, eMail, phoneNumber, status, categories, textArea } = this.state;
        const { action, sendButtonTitle, showForm, changeButtonTitle } = this.props;
        const note = {
            _id: this.props.defaultId || 'peopleList_' + Date.now(),
            name,
            company,
            eMail,
            phoneNumber,
            status: status || 'unnecessary',
            categories,
            textArea,
        };
        action(note);

        const options = {
            method: sendButtonTitle === 'create' ? 'post' : 'put',
            headers: new Headers({
                Accept: 'application/json',
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(note),
        };
        fetch("http://localhost:5000/people", options);

        if(showForm) showForm();
        if(changeButtonTitle) changeButtonTitle();
    }

    render() {
        const { categories, status } = this.state;
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
                    <RadioButtonsGroup takeStatus={this.takeStatus} oldStatus={status}/>
                    <CheckboxesGroup takeCategory={this.takeCategory} oldChecked={categories} />
                    <MyButton action={this.submitForm} title={sendButtonTitle} variant="contained" color="primary"/>
                    </div>
                    <textarea id="textArea" onChange={this.textChange} cols="30" rows="5" placeholder="Write some notes" value={textArea} />
                </form>
            </div>
        );
    }
}

export default Form;