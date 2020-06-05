/* eslint-disable react-hooks/rules-of-hooks */
import React, { Component, Fragment } from 'react';
import axios from './../../axios-order';
import Alert from './../../components/UI/alert';

const ErrorHandler = (WrappedComponent) =>  {
    return class extends Component {
        state = {
            error: null
        }
        constructor(){
            super();
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            })

            this.resInterceptors = axios.interceptors.response.use(res => res , error => {
                this.setState({error: error.response});
                setTimeout(() => {
                    this.setState({error: null});
                },5000)
            })
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        errorAcknowledgedHandler = () => {
            this.setState({error: null});
        }

        render(){
            return(
                <Fragment>
                {this.state.error ? 
                    <Alert 
                    message={this.state.error.data.msg ? this.state.error.data.msg : 'Somthing went wrong'}/>: null}
                 <WrappedComponent {...this.props} />   
                </Fragment>
            )
        }
    }
}

export default ErrorHandler;
