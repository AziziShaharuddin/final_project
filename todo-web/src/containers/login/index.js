import React from 'react';
import classes from './login.module.css';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { login } from '../../action';
import loginlogo from '../../assets/login.png';

class Login extends React.Component {
    // constructor(props) {
    //     super(props);
    //     // this.state = {
    //     //     // email: "",
    //     //     // password: "",
    //     // }
    // }
    login() {
        const email = this._loginemail.value;
        const password = this._loginpassword.value;

        let item = { email, password }

        // let history = useHistory();

        // history.push("/dashboard");

        // this.props.history.push({
        //     pathname: '/dashboard',
        // })

        this.props.loginAction(item);

        // axios.post('http://ca93-49-124-200-218.ngrok.io/api/login', {
        //     email: email,
        //     password: password
        //   })
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });

    };
    componentDidUpdate() {
        // console.log('test',this.props.loginData);
        // console.log('test2',this.props);

        if (this.props.loginData.data.code === 200) {
            // console.log(this.props)
            this.props.history.push({
                pathname: '/dashboard',
                // state: item,
            })
        }
    }
    render() {
        return (
            <div className={classes.container}>
                <div className={classes.login}>
                    <img className={classes.logo} src={loginlogo} alt="loginlogo"/>
                    <h1 style={{ color: `#154c79` }}>Welcome to 2-Do</h1>
                    <p>Please fill in the details to view the dashboard..</p>
                    <div className={classes.input_bar}>
                        <input className={classes.input} type="text" id="email" placeholder="email" ref={(a) => this._loginemail = a} />
                        <input className={classes.input} type="password" id="password" placeholder="password" ref={(a) => this._loginpassword = a} />
                    </div>
                    <button className={classes.btn} onClick={() => this.login()}>Login
                        {/* <Link className={classes.link} to="/home">Login</Link> */}
                    </button>
                    <p>New user?
                        <Link className={classes.link} to="/register"> Signup!</Link>
                    </p>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = (state) => ({
    loginData: state.login,
})

const mapDispatchtoProps = {
    loginAction: login,
}
export default connect(mapStatetoProps, mapDispatchtoProps)(Login);

// export default Login;