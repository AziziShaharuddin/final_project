import React from 'react';
import classes from './register.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import registerlogo from '../../assets/register.png';

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            password: ""
        }
    }

    register() {
        const API_URL = 'http://4f13-49-124-200-218.ngrok.io';
        console.log(this.state);
        axios.post(`http://localhost:8000/api/register`, {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        })
            .then(function (response) {
                console.log(response);
                alert('Congrats! You have successfully registered');
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            });


    }
    render() {
        return (
            <div className={classes.container}>
                <div className={classes.login}>
                    <img className={classes.logo} src={registerlogo} alt="registerlogo" />
                    <h1 style={{ color: `#154c79` }}>Sign Up</h1>
                    <p>Kindly register here..</p>
                    <div className={classes.input_bar}>
                        <input className={classes.input} type="text" id="name" placeholder="name" onChange={(name) => this.setState({ name: name.target.value })} />
                        <input className={classes.input} type="text" id="email" placeholder="email" onChange={(email) => this.setState({ email: email.target.value })} />
                        <input className={classes.input} type="password" id="password" placeholder="password" onChange={(password) => this.setState({ password: password.target.value })} />
                    </div>
                    <button className={classes.btn} onClick={() => this.register()}>Register
                        {/* <Link className={classes.link} to="/home">Login</Link> */}
                    </button>
                    <p>Already registered?
                        <Link className={classes.link} to="/"> Login</Link>
                    </p>
                </div>
            </div>
        );
    }
}
export default Register;