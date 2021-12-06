import React from 'react';
import { useEffect, useState } from 'react';
import classes from './dashboard.module.css';
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../action';
import List from '../../component/list';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import CanvasJSReact from '../../lib/canvasjs.react';

// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Dashboard(props) {

    // let history = useHistory();

    // if (token.length == 0) {
    //     console.log('try logout got error')
    //     history.push("/");
    // }

    const user = useSelector((state) => state?.login);
    // // console.log('user data', user);
    
    const name = useSelector((state) => state.login?.data?.data?.user?.name);
    // console.log('nama user', name);

    const token = useSelector((state) => state.login?.token);
    // console.log('token number', token);

    const id = useSelector((state) => state.login?.data?.data?.user?.id);
    // const token2 = useSelector((state) => state.login.token);
    // console.log('token2', token2);

    // const status = useSelector((state) => state.login.data.status);
    // const stateData = useSelector((state) => state.login.data)
    // console.log('state DATA OBJECT',stateData);

    // const retrieve = useSelector((state) => state.retrieve.data);
    // console.log(retrieve);

    const dispatch = useDispatch();

    let history = useHistory();

    // console.log('user token',user.token);
    // if (token === '') {
    //     console.log('gagaha')
    //     history.push('/');
    // }
    const [data, getData] = useState("");
    const [pendingData, setCountPending] = useState("");
    const [completedData, setCountCompleted] = useState("");
    const [deletedData, setCountDeleted] = useState("");

    function retrieveData() {
        // dispatch(retrieveAll(id))
        axios.get(`http://localhost:8000/api/retrieve/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(function (response) {
                getData(response);
                setCountPending(filterPendingTask(response));
                setCountCompleted(filterCompletedTask(response));
                setCountDeleted(filterDeletedTask(response));
                // alert(response);
            })
            .catch(function (error) {
                console.log(error);
                // alert(error);            
            });
    }

    function filterPendingTask(data) {
        return (data.data.filter((obj) => {
            if (obj.status === 1) {
                // console.log('pending task',obj);
                return obj;
            }
        }))
    };

    // filterPendingTask(data);

    function filterCompletedTask(data) {
        return (data.data.filter((obj) => {
            if (obj.status === 2) {
                // console.log('completed object',obj);
                return obj;
            }
        }))
    };

    function filterDeletedTask(data) {
        return (data.data.filter((obj) => {
            if (obj.status === 0) {
                // console.log('deleted object',obj);
                return obj;
            }
        }))
    };

    // function onCount(item) {
    //     // console.log('try function', item);
    //     setCountPending(filterPendingTask(item));
    //     setCountCompleted(filterCompletedTask(item));
    //     setCountDeleted(filterDeletedTask(item));
    // }

    // if (token.length === 0) {
    //     console.log('abc')
    //     // history.push("/");
    // }

    // if (token === "") {
    //     history.push("/");
    // } else {
    //     retrieveData()
    // }

    // useEffect(() => {
    //     console.log('abc')
    //     if (token !== '') {
    //         retrieveData();
    //         console.log('test retrieve data')
    //     } else if (token === '') {
    //         console.log('try logout got error')
    //         history.push("/");
    //     }
    // }, [token]);
    useEffect(() => {
        console.log('abc', token)
        if (!token && token?.length === 0) {
            console.log('try logout got error')
            history.push("/");
        } 
        else if (token !== '') {
            retrieveData();
            console.log('test retrieve data')
        }
    }, [token]);
    
    // useEffect(() => {
    //     console.log('abc')
    //     if (!token) {
    //         console.log('try logout got error')
    //         history.push("/");
    //     }
    // }, [token]);

    useEffect(() => {
        if (data !== []) {
            console.log('test retrieve ke tak');
            // onGraph();
        }
    }, [])

    

    // console.log('nested data', data);
    // console.log('data length', data.data.length);

    // function trial() {
    //     history.push('/register')
    // }

    // console.log('pending Data State', pendingData);
    // console.log('completed Data State', completedData);
    // console.log('deleted Data State', deletedData);

    const [pendingChart, setPendingChart] = useState({});
    const [completedChart, setCompletedChart] = useState({});
    const [deletedChart, setDeletedChart] = useState({});

    function onGraph() {

        const totalNum = data.data.length;
        const balancePending = totalNum - pendingData.length;
        const balanceComplete = totalNum - completedData.length;
        const balanceDelete = totalNum - deletedData.length;

        // console.log('total ...', totalNum)

        setPendingChart({
            animationEnabled: true,
            data: [{
                type: "doughnut",
                showInLegend: false,
                // indexLabel: "{y}",
                yValueFormatString: "#",
                dataPoints: [
                    { y: `${pendingData.length}` },
                    { y: `${balancePending}` },
                ]
            }]
        }) ;

        setCompletedChart({
            animationEnabled: true,
            data: [{
                type: "doughnut",
                showInLegend: false,
                // indexLabel: "{y}",
                yValueFormatString: "#",
                dataPoints: [
                    { y: `${completedData.length}` },
                    { y: `${balanceComplete}` },
                ],
            }]
        }) ;

        setDeletedChart({
            animationEnabled: true,
            data: [{
                type: "doughnut",
                showInLegend: false,
                // indexLabel: "{y}",
                yValueFormatString: "#",
                dataPoints: [
                    { y: `${deletedData.length}` },
                    { y: `${balanceDelete}` },
                ]
            }]
        }); 

        // return pendingChart, completedChart, deletedChart;
    }



    return (
        <div className={classes.container}>
            <Navbar className={classes.navbar} bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">2-Do</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    {/* <Navbar.Collapse id="navbarScroll"> */}
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {/* <Nav.Link href="#action1">Home</Nav.Link>
                        <Nav.Link href="#action2">Link</Nav.Link> */}
                    </Nav>
                    <Nav className="d-flex">
                        <Navbar.Brand href="#">{name}</Navbar.Brand>
                        {/* <Button variant="outline-success" onClick={() => trial()}>try</Button> */}
                        <Button variant="outline-success" onClick={() => dispatch(logout(user))}>Logout</Button>
                    </Nav>
                    {/* </Navbar.Collapse> */}
                </Container>
            </Navbar>
            <div className={classes.header}>
                <h1>Welcome {name}</h1>
            </div>
            <div className={classes.countbtn}>
                <Button onClick={() => onGraph()}>Click me!</Button>
            </div>
            <div className={classes.countContainer}>
                <div>
                    <div className={classes.countHolder}>
                        <h4 className={classes.pendingName}>Pending Tasks</h4>

                        {/* {pendingData &&
                            <h4 className={classes.pendingCount}>{pendingData.length}</h4>
                        } */}
                        <h4 className={classes.pendingCount}>{pendingData && pendingData.length}</h4>
                    </div>
                    <div>
                        <CanvasJSChart options={pendingChart} />
                    </div>
                </div>
                <div>
                    <div className={classes.countHolder}>
                        <h4 className={classes.completedName}>Completed Tasks</h4>
                        <h4 className={classes.completedCount}>{completedData && completedData.length}</h4>
                    </div>
                    <div>
                        
                        <CanvasJSChart options={completedChart} />
                    </div>
                </div>
                <div>
                    <div className={classes.countHolder}>
                        <h4 className={classes.deletedName}>Deleted Tasks</h4>
                        <h4 className={classes.deletedCount}>{deletedData && deletedData.length}</h4>
                    </div>
                    <div>
                        <CanvasJSChart options={deletedChart} />
                    </div>
                </div>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Categories</th>
                        <th>Tasks</th>
                        <th>Date Created</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.data && data.data.map((list, index) => <List num={index +1} date_created={list.created_at} status_completion={list.status} category_name={list.task_category} task_name={list.todo_tasks} />)
                    }
                    {/* {
                        retrieve.length!==0&&console.log('abc',retrieve.length  ) 
                    } */}
                </tbody>
            </Table>
            <div>

            </div>
        </div>
    );
}

export default Dashboard;