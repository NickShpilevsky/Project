import React, { PureComponent } from 'react';

import './style.css';

import TextField from '@material-ui/core/TextField';
import { MyButton } from '../UIComponents/MyButton';
import RadioButtonsGroup from '../UIComponents/Radio';
import CheckboxesGroup from '../UIComponents/CheckBox';

class Form extends PureComponent {
    constructor(props) {
        super(props);
        const { defaultId, oldName, oldCompany, oldEMail, oldPhoneNumber, oldStatus, oldTextArea, oldPhoto } = this.props;
        this.state = {
            id: defaultId || Date.now(),
            name: oldName || '',
            company: oldCompany || '',
            eMail: oldEMail || '',
            phoneNumber: oldPhoneNumber || '',
            status: oldStatus || '',
            category: [],
            textArea: oldTextArea || '',
            photo: oldPhoto || '',
        };
        this.textChange = this.textChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.takeStatus = this.takeStatus.bind(this);
        this.takeCategory = this.takeCategory.bind(this);
        this.takePhoto = this.takePhoto.bind(this);
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

    takePhoto(e) {
        this.setState({
            photo: e.target.value,
        });
        console.log(e.target.value);
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
            id: this.props.defaultId || Date.now(),
            name,
            company,
            eMail,
            phoneNumber,
            status: status || 'unnecessary',
            category,
            textArea,
            photo,
        };
        this.props.action(note);
        if(this.props.showForm) {
            this.props.showForm();
        }
        if(this.props.changeButtonTitle) {
            this.props.changeButtonTitle();
        }
    }

    render() {
        if(document.getElementById('photoLoader')) {
            console.log(document.getElementById('photoLoader').value);
        }
        const { sendButtonTitle, oldCategory } = this.props;
        let placeHolder = sendButtonTitle === 'create' ? 'enter' : 'change';
        const { name, company, eMail, phoneNumber, textArea, photo } = this.state;
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
                    {/*<UploadButton title="photo">rthrt</UploadButton>*/}
                    <input type="file" id="photo" name="photo" onChange={this.takePhoto} />
                    </div>
                    <div className="rightWrapper">
                    <RadioButtonsGroup takeStatus={this.takeStatus}/>
                    <CheckboxesGroup takeCategory={this.takeCategory} />
                    <MyButton action={this.submitForm} title={sendButtonTitle} variant="contained" color="primary"></MyButton>
                    </div>
                    <textarea id="textArea" onChange={this.textChange} cols="30" rows="5" placeholder="Write some notes">{textArea}</textarea>
                </form>
            </div>
        );
    }
}

export default Form;