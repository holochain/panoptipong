import React, { Component } from "react";
import {connect} from 'react-redux';
import {updateNameEntry, getPlayers} from '../actions'
import {Jdenticon} from './Common';
import './PlayersTable.css';

const Avatar = ({name}) => <Jdenticon size="30px" hash={name} />

export default class PlayersTable extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const playersLeft = this.props.players
      .filter(({teamID}) => teamID === 'L')
      .map(({name}) =>
        <li>
          <span>{ name }</span>
          <span><Avatar name={name} /></span>
        </li>
      )
    const playersRight = this.props.players
      .filter(({teamID}) => teamID === 'R')
      .map(({name}) =>
        <li>
          <span><Avatar name={name} /></span>
          <span>{ name }</span>
        </li>
      )

    return <div className="PlayersTable">
      <div className="tableWrapper">
        <ul>
          <li><h3> Team Left: {playersLeft.length} players</h3></li>
          {playersLeft}
        </ul>
        <ul>
          <li><h3>Team Right: {playersRight.length} players</h3></li>
          {playersRight}
        </ul>
      </div>
    </div>
  }
}
//
// const mapStateToProps = ({nameEntry, players}) => ({nameEntry, players})
// const mapDispatchToProps = dispatch => {
//   return {
//     updateNameEntry: (name) => {
//       dispatch(updateNameEntry(name))
//     },
//     getPlayers: (players) => {
//       dispatch(getPlayers(players))
//     }
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(PlayersTable);
