import React from 'react'
import styles from './Records.module.css'
import {connect} from 'react-redux'
import LoaderForm from '../components/Loaders/LoaderForm'
import {loadingUsersRecords} from '../redux/Records/actionRecords'

class Records extends React.Component {


	renderTable(data) {
		const arr = []
		for (let i = 0; i < 5;) {
			arr.push([data.easy[i], data.medium[i], data.hard[i], data.expert[i]])
			i++
		}
		return arr.map((item, index) => {
			return (
				<tr className={styles.Tr} key={index}>
					<td>
						<div className={styles.User}>
							{index + 1}
						</div>
					</td>
					<td>
						<div className={styles.User}>
							{item[0] ? item[0].userName : null }
							<span>{item[0] ? item[0].records +'s': null}</span>
						</div>
					</td>
					<td>
						<div className={styles.User}>
							{item[1] ? item[1].userName : null }
							<span>{item[1]? item[1].records +'s': null}</span>
						</div>
					</td>
					<td>
						<div className={styles.User}>
							{item[2] ? item[2].userName : null }
							<span>{item[2] ? item[2].records +'s' : null}</span>
						</div>
					</td>
					<td>
						<div className={styles.User}>
							{item[3] ? item[3].userName : null }
							<span>{item[3] ? item[3].records +'s': null}</span>
						</div>
					</td>
				</tr>
			)
		})
	}


	componentDidMount() {
		this.props.loadingUsersRecords()
	}

	render() {

		return (
			<div className={'container z-depth-1  ' + styles.Block}>
				{
					this.props.loading
						? <LoaderForm/>

						: <React.Fragment>
							<h3 className={styles.Title}>Таблица рекордов игры Flip-flop</h3>
							<table>
								<thead>
								<tr className={styles.Tr}>
									<th>#</th>
									<th>easy</th>
									<th>medium</th>
									<th>hard</th>
									<th>expert</th>
								</tr>
								</thead>
								<tbody>
								{this.renderTable(this.props.flipFlop)}
								</tbody>
							</table>
						</React.Fragment>
				}
			</div>

		)
	}
}

const mapStateToProps = (state) => {
	return {
		flipFlop: state.records.flipFlop,
		loading: state.records.loading
	}
}

const dispatchToProps = (dispatch) => {
	return {
		loadingUsersRecords: () => dispatch(loadingUsersRecords()),
	}
}

export default connect(mapStateToProps, dispatchToProps)(Records)
