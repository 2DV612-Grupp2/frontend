import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreateThread from '../components/CreateThread';
import { mockCreateThread } from '../actions/thread'; // change here to use non mock action

const sendThread = mockCreateThread; // change here to use non mock action

class CreateThreadContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorText: '',
      snackbarError: false,
      snackbarSuccess: false,
    };

    this.SubmitOnClick = this.SubmitOnClick.bind(this);
  }

  SubmitOnClick(payload, callback) {
    if (payload.title.length > 0 && payload.body.length > 0) {
      this.setState({ snackbarError: false });
      this.props.sendThread(payload, this.props.match.params.id, this.props.auth.token)
        .then(() => {
          if (this.props.error) {
            this.setState({ snackbarSuccess: false, snackbarError: true });
          } else {
            this.setState({ snackbarSuccess: true, snackbarError: false });
            callback();
            this.props.history.goBack();
          }
        });
    } else {
      this.setState({ snackbarSuccess: false, snackbarError: true, errorText: 'Thread needs both a title and body!' });
    }
  }

  render() {
    return (
      <CreateThread
        SubmitOnClick={this.SubmitOnClick}
        {...this.state}
        {...this.props}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendThread: (data, productId, token) => dispatch(sendThread(data, productId, token)),
});

const mapStateToProps = state => ({
  error: state.thread.error,
  isWaiting: state.thread.isWaiting,
  auth: state.auth,
});

CreateThreadContainer.propTypes = ({
  error: PropTypes.string,
  isWaiting: PropTypes.bool.isRequired,
  sendThread: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    token: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
});

CreateThreadContainer.defaultProps = ({
  error: null,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateThreadContainer);
