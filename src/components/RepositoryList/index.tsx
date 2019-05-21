import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../store';
import { Repository } from '../../store/ducks/repositories/types';
import * as Actions from '../../store/ducks/repositories/actions';
import RepositoryItem from '../RepositoryItem';

interface StateProps {
	repositories: Repository[];
}

interface DispatchProps {
	loadRequest(): void;
}

// interface OwnProps {}

type Props = StateProps & DispatchProps;

class RepositoryList extends Component<Props> {
	componentDidMount() {
		const { loadRequest } = this.props;
		loadRequest();
	}

	render() {
		const { repositories } = this.props;
		return (<ul>{repositories.map(repository => <RepositoryItem repository={repository} />)}</ul>);
	}
}

const mapStateToProps = ({ repositories: { data } }: ApplicationState) => ({
	repositories: data,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(Actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(RepositoryList);
