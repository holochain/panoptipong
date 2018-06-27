import React, { Component } from "react";
import {connect} from 'react-redux';
import {updateNameEntry, getPlayers} from '../actions'
import {Jdenticon} from './Common';
import './TeamTable.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const columns = [{
  dataField: "nameEntry",
  text: "Player Name"
}, {
  dataField: "Avatar",
  text: "Player Avatar"
}];

const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em' }}>Team {teamId} Players</h3>;
const Avatar = () => <Jdenticon size="40px" hash={this.props.players.nameEntry} />
const teamIdR = this.props.players.teamId === "R";
const teamIdL = this.props.players.teamId === "L";

const DrawPlayerTable = () => {
  const teamId = this.props.players.teamId;
  return (
  <div className="playerTable">
    {this.props.players.map( player => (
      <BootstrapTable keyField="id" data={ player.nameEntry, <Avatar /> } caption={<CaptionElement />} columns={ columns } />
    ))}
  </div>
)}

class TeamTable extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div className="teamTable">
      { this.props.children }
      <div className="tableWrapper">
        {teamIdL.forEach(DrawPlayerTable)}
        {teamIdR.forEach(DrawPlayerTable)}
      </div>
    </div>
  }
}

const mapStateToProps = ({nameEntry, players}) => ({nameEntry, players})
const mapDispatchToProps = dispatch => {
  return {
    updateNameEntry: (name) => {
      dispatch(updateNameEntry(name))
    },
    getPlayers: (players) => {
      dispatch(getPlayers(players))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TeamTable);
