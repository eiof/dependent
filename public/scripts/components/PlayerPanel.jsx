import React from 'react';
import { Row, Col, Panel, Image } from 'react-bootstrap';
import PlayerStats from './PlayerStats';

class PlayerPanel extends React.Component {

  constructor(props) {
    super(props);
  }

  isPlayerReady() {
    return (this.props.player && this.props.player.loaded === true);
  }

  render() {
    const imageSrc = this.isPlayerReady() ?
      this.props.player.picture.medium : '';
    const name = this.isPlayerReady() ?
      this.props.player.name.first + ' ' + this.props.player.name.last : 'Loading character...';
    const stats = this.isPlayerReady() ?
      <PlayerStats stats={this.props.player.stats} /> : null;


    return (
        <Panel>
          <Row>
            <Col xs={10} xsOffset={1}>
              <span>Dat image was so awkard</span>
            </Col>
            <Col xs={10} xsOffset={1} style={{ textAlign: 'center', marginBottom: '10px' }}>
              <span style={{ fontFamily: 'monospace' }}>{name}</span>
            </Col>
            {stats}
          </Row>
        </Panel>
    );
  }
}

PlayerPanel.propTypes = {
  player: React.PropTypes.object
};

export default PlayerPanel;
