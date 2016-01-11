import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';

class PlayerStats extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let statBars = [];

    for(let stat in this.props.stats){
      statBars.push(
        <Col xs={10} xsOffset={1}>
          <Row>
            <Col xs={6} style={{textAlign:'left'}}>{stat}</Col>
            <Col xs={6} style={{textAlign:'right'}}>{this.props.stats[stat]}</Col>
          </Row>
        </Col>
      );
    }

    return (
        <Row>
          {statBars}
        </Row>
    );
  }
}

PlayerStats.propTypes = {
  stats: React.PropTypes.object
};

export default PlayerStats;
