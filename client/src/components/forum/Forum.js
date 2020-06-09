import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutPlayer } from "../../actions/authActions";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";


class Forum extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutPlayer();
    };

    state = {
        playerData: [],
        forum: [],
        isLoading: true,
        errors: null,
    };


    createArticle() {
        axios.post('http://localhost:8000/forum/article/create')
            .then(response => {
                this.setState({
                    isLoading: false
                });
            })
        .catch(error => this.setState({ error, isLoading:false}));
    }

    getForum() {
        axios.get('http://localhost:8000/forum/article/get')
            .then(response => {
                this.setState({
                    forum: response.data.data,
                    isLoading:false
                });
            })
            .catch(error => this.setState({ error, isLoading: false}))
    }

    getPlayer(author) {
        axios.get('http://localhost:8000/test/getplayer/' + author)
            .then(response => {
                this.setState({
                    playerData: response.data,
                    isLoading: false
                });
            })
            .catch(error => this.setState({error, isLoading: false}))
    }

    componentDidMount() {
        this.getForum();
    }




    render() {
        const { forum, isLoading, playerData } = this.state;
        const { player } = this.props.auth;

        return (
            <div className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            <b>Forum</b>
                        </h4>
                        <Link
                            to='/forum/create'
                            style={{
                                borderRadius: "3px",
                            }}
                            className="btn btn-flat waves-effect grey center black-text"
                        >
                            Create Article
                        </Link>
                        <hr />
                    </div>



                    <div className= "center-align">
                        {!isLoading ? (
                            forum.map(articles => {
                                const { title, _id, article, author } = articles;
                                return (
                                    <div key={ _id }>
                                        <b> {title}</b>
                                        <p> {article}</p>
                                        <p> author: {author} </p>


                                        <hr />
                                    </div>
                                );
                            })
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

Forum.propTypes = {
    logoutPlayer: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutPlayer }
)(Forum);