import React, {Component} from 'react';
import {Layout, Row, Col} from 'antd';
import {filter} from 'lodash';
import {connect} from 'react-redux';

import CreateTask from '../components/creat-task/CreateTask';
import TaskList from '../components/task-list/TaskList';

import {statuses} from '../enums/statuses';

import * as tasksActions from '../store/to-do-list/actions';
import * as tasksSelectors from '../store/to-do-list/selectors';

import 'antd/dist/antd.css';
import './App.css';

const {Content} = Layout;

class App extends Component {

    /**
     * @param props
     */
    constructor(props) {
        super(props);
        this.onCreate = this.onCreate.bind(this);
        this.onChangeStatusHandler = this.onChangeStatusHandler.bind(this);
    }

    /**
     * @param status
     * @returns {[*]}
     */
    filterTasks(status) {
        return filter(this.props.tasks, item => item.status === status);
    }

    /**
     * @param task
     */
    onCreate(task) {
        this.props.onAddTask(task);
    }

    /**
     * @param item
     */
    onChangeStatusHandler(item) {
        this.props.onChangeStatus(item);
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <Layout>
                <Content className="content" overlay={1}>
                    <div className="container">
                        <Row>
                            <Col span={8}>
                                <div className="margin-5 padding-5">
                                    <h1 className="colored-red">Waiting</h1>
                                    <TaskList data={this.filterTasks(statuses.WAITING)}
                                              onChangeStatus={this.onChangeStatusHandler}/>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="margin-5 padding-5">
                                    <h1 className="colored-orange">In process</h1>
                                    <TaskList data={this.filterTasks(statuses.IN_PROGRESS)}
                                              onChangeStatus={this.onChangeStatusHandler}/>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="margin-5 padding-5">
                                    <h1 className="colored-green">Done</h1>
                                    <TaskList data={this.filterTasks(statuses.DONE)}
                                              onChangeStatus={this.onChangeStatusHandler}/>
                                </div>
                            </Col>
                            <Col span={24}>
                                <CreateTask onCreate={this.onCreate}/>
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>
        );
    }
}

/**
 * @param state
 * @returns {{tasks}}
 */
const mapStateToProps = (state) => {
    return {
        tasks: tasksSelectors.getTasks(state)
    }
};

/**
 * @param dispatch
 * @returns {{onChangeStatus: (function(*=): *), onAddTask: (function(*=): *)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        onChangeStatus: (item) => dispatch(tasksActions.changeStatus(item)),
        onAddTask: (task) => dispatch(tasksActions.addToDo(task))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
