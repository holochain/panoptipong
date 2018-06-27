import React, { Component } from "react";
import {connect} from 'react-redux';
import {updateNameEntry, getPlayers} from '../actions'
import {Jdenticon} from './Common';
import './PlayersTable.css';
//
// const columns = [{
//   dataField: "nameEntry",
//   text: "Player Name"
// }, {
//   dataField: "Avatar",
//   text: "Player Avatar"
// }];

// const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em' }}>Team {teamId} Players</h3>;
const Avatar = ({name}) => <Jdenticon size="30px" hash={name} />
// const teamIdR = this.props.players.teamId === "R";
// const teamIdL = this.props.players.teamId === "L";
//
// const DrawPlayerTable = () => {
//   const teamId = this.props.players.teamId;
//   return (
//   <div className="playerTable">
//     {this.props.players.map( player => (
//       <BootstrapTable keyField="id" data={ player.nameEntry, <Avatar /> } caption={<CaptionElement />} columns={ columns } />
//     ))}
//   </div>
// )}

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
          <li><h3>{playersLeft.length} players</h3></li>
          {playersLeft}
        </ul>
        <ul>
          <li><h3>{playersRight.length} players</h3></li>
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
