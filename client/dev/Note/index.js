import React, { PureComponent } from 'react';

import './style.css';

import Form from '../Form';

import { MyButton, MyRemoveButton } from '../UIComponents/MyButton';

class Note extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props._id,
            name: this.props.name || '',
            company: this.props.company || '',
            eMail: this.props.eMail || '',
            phoneNumber: this.props.phoneNumber || '',
            status: this.props.status || '',
            categories: this.props.categories || '',
            textArea: this.props.textArea || '',
            isChanging: false,
            buttonTitle: 'change Note',
            changeButton: false,
            textButton: 'show more'
        };
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.showAllText = this.showAllText.bind(this);
    }

    showAllText() {
        this.setState({
            textButton: this.state.textButton === 'show more' ? 'hide' : 'show more',
        });
    }

    componentWillUpdate(nextProps) {
        const { _id, name, company, eMail, phoneNumber, status, categories, textArea } = nextProps;
        if(_id !== this.props._id ||
            name !== this.props.name ||
            company !== this.props.company ||
            eMail !== this.props.eMail ||
            phoneNumber !== this.props.phoneNumber ||
            status !== this.props.status ||
            categories !== this.props.categories ||
            textArea !== this.props.textArea) {
            this.setState({
                isChanging: false,
                _id: _id,
                name: name,
                company: company,
                eMail: eMail,
                phoneNumber: phoneNumber,
                status: status,
                categories: categories,
                textArea: textArea,
            });
        }
    }

    update() {
        this.setState({
            isChanging: !this.state.isChanging,
            buttonTitle: this.state.buttonTitle === 'change Note' ? 'Hide Form' : 'change Note',
        });
    }

    remove(e) {
        e.preventDefault();
        this.props.removeNote(this.state._id);
        const options = {
            method: 'delete',
            headers: new Headers({
                id: this.state._id,
                Accept: 'application/json',
                "Content-Type": "application/json"
            }),
        };
        fetch("http://localhost:5000/people/" + String(this.state._id), options);
    }

    render() {
        const { showAllText, update, remove } = this;
        const { _id, updateNote } = this.props;
        const { isChanging, buttonTitle, name, company, eMail, phoneNumber, status, categories, textArea, textButton } = this.state;
        return (
            <div key={_id} className="card">
                {
                    isChanging ? (
                        <>
                            <div id="buttonsDiv">
                                <MyButton action={update} title={buttonTitle} />
                                <MyRemoveButton action={remove} title="remove Note" />
                            </div>
                            <Form
                                defaultId={_id}
                                oldName={name}
                                oldCompany={company}
                                oldEMail={eMail}
                                oldPhoneNumber={phoneNumber}
                                oldStatus={status}
                                oldCategories={categories}
                                oldTextArea={textArea}
                                sendButtonTitle="change"
                                changeButtonTitle={update}
                                action={updateNote}
                            />
                        </>
                    ) : (
                        <div id="wrapper">
                            <div className="both">
                                <div className="leftWrapper">
                                    <p>
                                        <b>Name:</b><br />
                                        {name.slice(0, 19) || 'none'}
                                    </p>
                                    <p>
                                        <b>Company:</b><br />
                                        {company.slice(0, 19) || 'none'}
                                    </p>
                                    <p>
                                        <b>E-mail:</b><br />
                                        {eMail.slice(0, 19) || 'none'}
                                    </p>
                                    <p>
                                        <b>Phone Number:</b><br />
                                        {phoneNumber.slice(0, 19) || 'none'}
                                    </p>
                                </div>
                                <div className="rightWrapper">
                                    <p><b>Status:</b> {status}</p>
                                    <p><b>Categories:</b> {categories.length ? categories.join(', ') : 'none'}</p>
                                    {
                                        textArea ? (
                                          <div id="note">
                                              {
                                                  textButton === 'show more' ? (
                                                      <div>
                                                          <div>{`${textArea.slice(0, 17)}${textArea.length <= 17 ? '' : '...'}`}</div>
                                                          <div>{textArea.length <= 17 ? null : <MyButton action={showAllText} title={textButton} />}</div>
                                                      </div>
                                                    ) : (
                                                      <div>
                                                          <div>{textArea.length <= 17 ? null : <MyButton action={showAllText} title={textButton} />}</div>
                                                          <div className="noteText">{textArea}</div>
                                                      </div>
                                                    )
                                              }
                                          </div>
                                        ) : ('note is empty')
                                    }
                                </div>
                            </div>
                                <div id="buttonsDiv">
                                    <MyButton action={update} title={buttonTitle} />
                                    <MyRemoveButton action={remove} title="remove Note" />
                                </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Note;