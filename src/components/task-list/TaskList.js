import React, {Component} from 'react';
import {Icon} from 'antd';
import PropTypes from 'prop-types';

import {statuses} from '../../enums/statuses';

import './TaskList.css'

export default class TaskList extends Component {
    /**
     * @param props
     */
    constructor(props) {
        super(props);
        this.onChangeStatusHandler = this.onChangeStatusHandler.bind(this);
    }

    /**
     * @param e
     * @param item
     * @param inProgress
     */
    onChangeStatusHandler(e, item, inProgress = false) {
        e.persist();
        if (inProgress) {
            this.props.onChangeStatus({id: item.id, toStatus: statuses.WAITING})
        } else {
            this.props.onChangeStatus({id: item.id, toStatus: item.status === statuses.WAITING ? statuses.IN_PROGRESS : statuses.DONE})
        }
    }

    /**
     * @param data
     */
    renderItems(data) {
        return data.map((item, index) => {
            return (
                <div key={index}>
                    <p>
                        {item.status === statuses.IN_PROGRESS &&
                        <Icon onClick={(e) => this.onChangeStatusHandler(e, item, true)} type="arrow-left"/>}
                        {`${index + 1}. ${item.title}`}
                        {item.status !== statuses.DONE &&
                        <Icon onClick={(e) => this.onChangeStatusHandler(e, item)} className="righted"
                              type="arrow-right"/>}
                    </p>
                    <p>{item.description}</p>
                    <hr/>
                </div>
            );
        });
    }

    /**
     * @returns {XML}
     */
    render() {
        const data = this.props.data ? this.props.data : [];
        return (
            <div>
                {this.renderItems(data)}
            </div>
        );
    }
}

TaskList.propTypes = {
    data: PropTypes.array.isRequired,
    onChangeStatus: PropTypes.func.isRequired
};