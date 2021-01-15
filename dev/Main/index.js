import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';

import Form from '../Form';
import List from '../List';

import './style.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { MyButton, MyRemoveButton } from '../UIComponents/MyButton';
import CheckBox from '../UIComponents/CheckBox';
import RadioButtonsGroup from '../UIComponents/Radio';

class Main extends PureComponent {
    constructor() {
        super();
        this.state = {
            peopleList: [],
            filteredList: [],
            formButtonTitle: 'Add a Person',
            showForm: false,
            showFilter: false,
            filterButtonTitle: 'filter',
            status: '',
            categories: [],
        };
        this.showForm = this.showForm.bind(this);
        this.showFilter = this.showFilter.bind(this);
        this.addNote = this.addNote.bind(this);
        this.updateNote = this.updateNote.bind(this);
        this.removeNote = this.removeNote.bind(this);
        this.takeStatus = this.takeStatus.bind(this);
        this.takeCategory = this.takeCategory.bind(this);
        this.filter = this.filter.bind(this);
        this.hideFilter = this.hideFilter.bind(this);
        this.filterByCategory = this.filterByCategory.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:5000/people")
            .then(res => res.json())
            .then((gotPeople) => {
                    this.setState({
                        peopleList: gotPeople,
                    });
                },
                (error) => {
                    this.setState({
                        error,
                    });
                },
            );
    }

    showForm() {
        this.hideFilter();
        this.setState({
            showForm: !this.state.showForm,
            formButtonTitle: this.state.buttonTitle === 'Add a Person' ? 'Hide Form' : 'Add a Person',
        });
    }

    showFilter() {
        this.setState({
            showForm: false,
            showFilter: !this.state.showFilter,
            formButtonTitle: 'Add a Person',
            filterButtonTitle: this.state.filterButtonTitle === 'filter' ? 'Hide form' : 'filter',
        });
    }

    hideFilter() {
        this.setState({
            filterButtonTitle: 'filter',
            showFilter: false,
            filteredList: [],
            categories: [],
        });
    }

    addNote(note) {
        this.setState({
            peopleList: [note, ...this.state.peopleList],
        });
    }

    updateNote(note) {
        this.setState({
            peopleList: this.state.peopleList.map(item => (
                item._id === note._id ? note : item
            )),
        });
    }

    removeNote(id) {
        this.setState({
            peopleList: this.state.peopleList.filter(note => note._id !== id),
        });
    }

    takeStatus(status) {
        this.setState({
            status: status,
        });
    }

    takeCategory(category) {
        this.setState({
            categories: [...this.state.categories, category],
        });
    }

    filterByCategory(categories, array) {
        array = array.filter(item => item.categories.length === categories.length);
        console.log(array);
        return array.filter(item => {
            let tmp = 0;
            item.categories.map(category => {
                tmp += categories.indexOf(category);
            });
            return tmp >= 0;
        });
    }

    filter() {
        const { peopleList, status, categories } = this.state;
        let filteredList;
        if (status) filteredList = peopleList.filter(item => item.status === status);
        filteredList = categories && categories.length ? this.filterByCategory(categories, status ? filteredList : peopleList) : filteredList;
        this.setState({
            filteredList: [...filteredList],
        });
        if (!filteredList.length) alert('No such notes');
    }

    render() {
        const { showForm: showFormAction, showFilter: showFilterAction, addNote, takeStatus, takeCategory, filter, hideFilter, updateNote, removeNote } = this;
        const { peopleList, formButtonTitle, showForm, filterButtonTitle, showFilter, filteredList } = this.state;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar className="Bar">
                        <Typography variant="h6" color="inherit">
                            List
                        </Typography>
                        {filteredList.length ? <MyRemoveButton action={hideFilter} title="hide filter" /> : <MyButton action={showFormAction} title={formButtonTitle} />}
                        <MyButton className="filterButton" action={showFilterAction} title={filterButtonTitle} />
                    </Toolbar>
                </AppBar>
                {
                    showForm ? (
                        <Form
                            showForm={showFormAction}
                            action={addNote}
                            sendButtonTitle="create"
                        />
                    ) : null
                }
                {
                    showFilter ? (
                        <div className="filterWrapper">
                            <div className="both">
                            <RadioButtonsGroup takeStatus={takeStatus}/>
                            <CheckBox takeCategory={takeCategory}/>
                            </div>
                            <MyButton action={filter} title="filter" />
                        </div>
                    ) : null
                }
                <List peopleList={filteredList.length ? filteredList : peopleList}
                      updateNote={updateNote}
                      showForm={showFormAction}
                      removeNote={removeNote}
                />
            </div>
        )
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('app'),
);