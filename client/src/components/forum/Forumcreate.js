import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutPlayer } from "../../actions/authActions";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";


class Forumcreate extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutPlayer();
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            successfulCreated: true,
            article: '',
            author: '',
            title: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }




    createArticle() {
        axios.post('http://localhost:8000/forum/article/create', {article: this.state.article, author: this.state.author, title: this.state.title})
            .then(response => {
                this.setState({
                    successfulCreated: true,
                    isLoading: false
                });
            })
            .catch(error => this.setState({ error, successfulCreated: false, isLoading:false}));
    }

    handleSubmit(event) {
        this.createArticle()
        event.preventDefault();
        alert("Something happend")
        window.location.reload();
    }



    render() {
        const { player } = this.props.auth;

        return (
            <div className={"center-align"} style={{ width: "25%", margin: "auto"}}>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <p> Title: </p>
                        <input type="text" name="title" placeholder={"Title"} value={this.state.title} onChange={this.handleChange.bind(this)}/>
                    </label>
                    <label style={{ height: "500px" }}>
                        <p> Article: </p>
                        <textarea type="text" name="article" placeholder={"Article"} value={this.state.article} onChange={this.handleChange.bind(this)} />
                    </label>
                    <label>
                        <p> Author: </p>
                        <input type="text" name="author" placeholder={"Author"} value={this.state.author} onChange={this.handleChange.bind(this)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

Forumcreate.propTypes = {
    logoutPlayer: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutPlayer }
)(Forumcreate);