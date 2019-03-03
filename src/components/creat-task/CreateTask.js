import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Button} from 'antd';

import './CreateTask.css';

class CreateTask extends Component {
    /**
     * @param props
     */
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * @returns {void}
     */
    componentDidMount() {
        this.props.form.validateFields();
    }

    /**
     * @param fieldsError
     * @returns {boolean}
     */
    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    /**
     * @param e
     */
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onCreate(values);
                this.props.form.resetFields();
                this.props.form.validateFields();
            }
        });
    };

    /**
     * @returns {XML}
     */
    render() {
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;

        // Only show error after a field is touched.
        const taskTitleError = isFieldTouched('title') && getFieldError('title');
        const taskDescriptionError = isFieldTouched('description') && getFieldError('description');
        return (
            <Form layout="horizontal" onSubmit={this.handleSubmit}>
                <Form.Item
                    validateStatus={taskTitleError ? 'error' : ''}
                    help={taskTitleError || ''}
                >
                    {getFieldDecorator('title', {
                        rules: [{required: true, message: 'Please input task title!'}],
                    })(
                        <Input placeholder="Title"/>
                    )}
                </Form.Item>
                <Form.Item
                    validateStatus={taskDescriptionError ? 'error' : ''}
                    help={taskDescriptionError || ''}
                >
                    {getFieldDecorator('description', {
                        rules: [{required: true, message: 'Please input task description!'}],
                    })(
                        <Input placeholder="Description"/>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="righted"
                        disabled={this.hasErrors(getFieldsError())}
                    >
                        Add New
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create({name: 'create_task'})(CreateTask);

CreateTask.propTypes = {
    onCreate: PropTypes.func.isRequired,
};
