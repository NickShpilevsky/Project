import React, { PureComponent } from 'react';
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

class Home extends PureComponent {
    constructor() {
        super();
        this.state = {
            peopleList: [],
            filteredList: '',
            buttonTitle: 'Add a Person',
            showForm: false,
            showFilter: false,
            filterButton: 'filter',
            status: '',
            category: [],
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
    }

    componentDidMount() {
        fetch("http://localhost:5000/people")
            .then(res => res.json())
            .then(
                (gotPeople) => {
                    this.setState({
                        peopleList: gotPeople,
                    });
                },
                (error) => {
                    this.setState({
                        error,
                    });
                },
            )
    }

    showForm() {
        this.setState({
            showFilter: this.state.showFilter ? this.showFilter() : null,
            showForm: !this.state.showForm,
            buttonTitle: this.state.buttonTitle === 'Add a Person' ? 'Hide Form' : 'Add a Person',
        });
    }

    showFilter() {
        this.setState({
            showForm: this.state.showForm ? this.showForm() : null,
            showFilter: !this.state.showFilter,
            filterButton: this.state.filterButton === 'filter' ? 'Hide' : 'filter',
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
            category: [...this.state.category, category],
        });
    }

    filter() {
        const { peopleList, status, category } = this.state;
        let check;
        let firstCheck = [];
        if(category.length) {
            for (let i = 0; i < peopleList.length; i++) {
                check = 0;
                for (let j = 0; j < category.length; j++) {
                    for(let t = 0; t < peopleList[i].category.length; t++) {
                        if (category[j] === peopleList[i].category[t]) {
                            ++check;
                        }
                    }
                }
                console.log(check);
                console.log(category.length);
                if (check === category.length && status !== '') {
                    firstCheck.push(peopleList[i]);
                }
                if(check === category.length && status === '') {
                    this.setState({
                        filteredList: [...this.state.filteredList, peopleList[i]],
                    });
                }
            }
        }
        if(status !== '' && category.length) {
            console.log('mistake');
            this.setState({
                filteredList: firstCheck.filter(item => (item.status === status ? item : null)),
            });
        }
        if(status !== '' && !category.length) {
            for(let i = 0; i < peopleList.length; i++) {
                if(peopleList[i].status === status) {
                    this.setState({
                        filteredList: [...this.state.filteredList, peopleList[i]],
                    });
                }
            }
        }
    }

    hideFilter() {
        this.setState({
            filteredList: '',
            category: [],
        });
        this.showFilter();
    }

    render() {
        const { peopleList, buttonTitle, showForm, filterButton, showFilter, filteredList } = this.state;
        return (
            <div id="mainWrapper">
                <AppBar position="static">
                    <Toolbar className="Bar">
                        <Typography variant="h6" color="inherit">
                            List
                        </Typography>
                        <MyButton action={this.showForm} title={buttonTitle}></MyButton>
                        <MyButton className="filterButton" action={this.showFilter} title={filterButton}></MyButton>
                    </Toolbar>
                </AppBar>
                {
                    showForm ? (
                        <Form
                            showForm={this.showForm}
                            action={this.addNote}
                            sendButtonTitle={'create'}
                        />
                    ) : (
                        null
                    )
                }
                {
                    showFilter ? (
                        <div className="filterWrapper">
                            <div className="both">
                            <RadioButtonsGroup takeStatus={this.takeStatus}/>
                            <CheckBox takeCategory={this.takeCategory}/>
                            </div>
                            <div className="both">
                                <MyButton action={this.filter} title={'filter'}></MyButton>
                                <MyRemoveButton action={this.hideFilter} title={'cancel'}></MyRemoveButton>
                            </div>
                        </div>
                    ) : (
                        null
                    )
                }
                {
                    filteredList === '' ? (
                        <List peopleList={peopleList}
                              updateNote={this.updateNote}
                              showForm={this.showForm}
                              removeNote={this.removeNote}
                        />
                    ) : (
                        <List peopleList={filteredList}
                              updateNote={this.updateNote}
                              showForm={this.showForm}
                              removeNote={this.removeNote}
                        />
                    )
                }
            </div>
        )
    }
}

ReactDOM.render(
    <Home />,
    document.getElementById('app'),
);