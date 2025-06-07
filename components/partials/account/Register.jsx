import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { login } from '../../../store/auth/action';

import { Form, Input } from 'antd';
import { connect } from 'react-redux';
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit = (e) => {
        Router.push('/');

        // e.preventDefault();
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         this.props.dispatch(login());
        //         Router.push('/account/login');
        //     } else {
        //     }
        // });
    };

    responseFacebook = (response) => {};

    render() {
        return (
            <div className="ps-my-account" style={{ background: 'white' }}>
                <div className="container">
                    <Form
                        style={{
                            boxShadow: '0 0 5px 0 grey',
                            paddingBottom: '20px',
                            paddingTop: '0px',
                        }}
                        className="ps-form--account"
                        onFinish={this.handleSubmit.bind(this)}>
                        {/* <ul className="ps-tab-list">
                            <li>
                                <Link href="/account/login">
                                    <a >Login</a>
                                </Link>
                            </li>
                            <li className="active">
                                <Link href="/account/register">
                                    <a style={{color: "#fff"}}>Register</a>
                                </Link>
                            </li>
                        </ul> */}
                        <div className="ps-tab active" id="register">
                            <div className="ps-form__content">
                                <h5>Register An Account</h5>
                                <div className="form-group">
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your email!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="email"
                                            placeholder="Email address"
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group form-forgot">
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your password!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="password"
                                            placeholder="Password..."
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth">
                                        Register
                                    </button>
                                </div>
                            </div>
                            {/* <div className="ps-form__footer"> */}
                            {/* <p>Connect with:</p>
                                <ul className="ps-list--social">
                                <li>
                                <FacebookLogin
                                        appId="863000811353037"
                                        fields="name,email,picture"
                                        
                                        callback={e =>
                                            this.responseFacebook(e)
                                        }
                                        className="facebook"
                                        icon="fa fa-facebook"
                                        
                                        render={renderProps => (
                                            <a
                                            className="facebook"
                                            
                                            onClick={e => renderProps.onClick(e)}>
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                          )}
                                        
                                    />
                                    </li>
                                    <li>
                                        <a className="google" href="#">
                                            <i className="fa fa-google-plus"></i>
                                        </a>
                                    </li> */}
                            {/* <li>
                                        <a className="twitter" href="#">
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="instagram" href="#">
                                            <i className="fa fa-instagram"></i>
                                        </a>
                                    </li> */}
                            {/* </ul> */}
                            {/* </div> */}
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.auth;
};
export default connect(mapStateToProps)(Register);
