import React, { Component } from "react";
import View from "./View";
import service from "../../services/service";
import { firebaseConnect  } from 'react-redux-firebase'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom';

class Tasks extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tasks:[],
      card: {
        blocks: [ {
          label: "SUAS TAREFAS",
          value: "20"
        }, {
          label: "ATRASADAS",
          value: "2"
        } ],
        quickTip: "Quick Tip"
      }
    }
    this.handleQuickTip = this.handleQuickTip.bind( this );
  }

  componentWillMount = () => {
    this.loadTasks();
  }

  handleSearch( value ) {
    // console.log( value );
  }

  handleFilter( value ) {
    // console.log( value );
  }

  handleQuickTip() {
    const card = { ...this.state.card };
    card.quickTip = "New Quick Tip";
    this.setState( { card } );
  }

  loadTasks = async()=> {
    const { user } = await service.getById('user', this.props.firebase.auth().currentUser.uid);
    let tasks = await service.getByHouse('task', user.houseID);
    this.setState({tasks})
  }

  filterTasks = () => {
    let tasks = [...this.state.tasks];
    tasks = tasks.filter(t => {
      return t.assignedUserID == this.props.firebase.auth().currentUser.uid
    })
    this.setState({tasks})
  }

  render() {
    return (
      <View 
        { ...this.state }
        handleSearch={ this.handleSearch }
        handleFilter={ this.handleFilter }
        handleQuickTip={ this.handleQuickTip }
      />
    );
  }
}

export default compose(
  withRouter,
  firebaseConnect()
)(Tasks);
