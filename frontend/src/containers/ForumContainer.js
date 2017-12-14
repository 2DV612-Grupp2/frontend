import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getThreads } from '../actions/thread';

import Forum from '../components/Forum';


class ForumContainer extends Component {
  componentDidMount() {
    this.props.getThreads();
  }

  render() {
    return (
      <Forum
        {...this.props}
      />
    );
  }
}

ForumContainer.propTypes = ({
  threads: PropTypes.arrayOf(PropTypes.any),
  getThreads: PropTypes.func.isRequired,
});

ForumContainer.defaultProps = ({
  threads: [],
});

const mapDispatchToProps = dispatch => ({
  getThreads: () => dispatch(getThreads()),
});

const mapStateToProps = state => ({
  threads: state.thread.threads,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForumContainer);