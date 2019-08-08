import React, { PureComponent } from 'react';

import './style.css';

import Form from '../Form';

import { MyButton, MyRemoveButton} from '../UIComponents/MyButton';

class Note extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            company: this.props.company,
            eMail: this.props.eMail,
            phoneNumber: this.props.phoneNumber,
            status: this.props.status,
            category: this.props.category,
            textArea: this.props.textArea,
            photo: this.props.photo,
            isChanging: false,
            buttonTitle: 'change Note',
            changeButton: false,
            textButton: 'show more'
        };
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.showAllText = this.showAllText.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.name !== this.props.name ||
            nextProps.company !== this.props.company ||
            nextProps.eMail !== this.props.eMail ||
            nextProps.phoneNumber !== this.props.phoneNumber ||
            nextProps.status !== this.props.status ||
            nextProps.category !== this.props.category ||
            nextProps.textArea !== this.props.textArea ||
            nextProps.photo !== this.props.photo) {
            this.setState({
                isChanging: false,
                name: nextProps.name,
                company: nextProps.company,
                eMail: nextProps.eMail,
                phoneNumber: nextProps.phoneNumber,
                status: nextProps.status,
                category: nextProps.category,
                textArea: nextProps.textArea,
                photo: nextProps.photo,
            });
        }
    }

    update() {
        this.setState({
            isChanging: !this.state.isChanging,
            buttonTitle: this.state.buttonTitle === 'change Note' ? 'Hide Form' : 'change Note',
        });
    }

    remove() {
        this.props.removeNote(this.props.id);
    }

    showAllText() {
        this.setState({
            textButton: this.state.textButton === 'show more' ? 'hide' : 'show more',
        });
    }

    render() {
        const { id, updateNote } = this.props;
        const { isChanging, buttonTitle, name, company, eMail, phoneNumber, status, category, textArea, photo, textButton } = this.state;
        return (

            <div key={id} className="card">
                {
                    isChanging ? (
                        <Form
                            defaultId={id}
                            oldName={name}
                            oldCompany={company}
                            oldEMail={eMail}
                            oldPhoneNumber={phoneNumber}
                            oldStatus={status}
                            oldCategory={category}
                            oldTextArea={textArea}
                            oldPhoto={photo}
                            sendButtonTitle={'change'}
                            changeButtonTitle={this.update}
                            action={updateNote}
                        />
                    ) : (
                        <div>
                            <div className="both">
                                <div className="leftWrapper">
                                    <p>Name: {name}</p>
                                    <p>Company: {company}</p>
                                    <p>E-mail: {eMail}</p>
                                    <p>Phone Number: {phoneNumber}</p>
                                </div>
                                <div className="rightWrapper">
                                    <p>Status: {status}</p>
                                    <p>Categories:
                                        {
                                            category.map(item => (item + '\n'))
                                        }
                                    </p>
                                    {
                                        textButton === 'show more' ?(
                                            <p>{textArea.slice(1, 15)}...</p>
                                        ) : (
                                            <div className="noteText">{textArea}</div>
                                        )
                                    }
                                    <MyButton action={this.showAllText} title={textButton} ></MyButton>
                                </div>
                            </div>
                            <img src={photo} />
                        </div>
                    )
                }
                <div id="buttonsDiv">
                    <MyButton action={this.update} title={buttonTitle} ></MyButton>
                    <MyRemoveButton action={this.remove} title={'remove Note'}></MyRemoveButton>
                </div>
            </div>
        );
    }
}

export default Note;