import React from 'react';
import sample from 'lodash/collection/sample';
import { Grid, Row, Col, Panel, Glyphicon } from 'react-bootstrap';
import Player from '../../lib/player';
import PlayerPanel from './PlayerPanel';
import Inventory from './Inventory';

class Actions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      player: { loaded: false }
    };
  }

  componentDidMount() {
    this.setState({ player: Player.generate(this) });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Panel>
              <span><Glyphicon glyph="comment" />{sample(this.props.messages)}</span>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <PlayerPanel player={this.state.player} />
          </Col>
          <Col xs={6}>
            <Inventory />
          </Col>
          <Col xs={3}>
            BUFF / DEBUFF / HISTORY
          </Col>
        </Row>
      </Grid>
    );
  }
}

Actions.propTypes = {
  messages: React.PropTypes.array
};

Actions.defaultProps = {
  messages: [
    'Shit. Hello? Hello?! Fucking, meteorites. Why. Why us?!',
    'NOOOO!!! No, no, no, no, no, no. Okay, okay. Where am I. Okay. I don\'t know. This is fine. Just fine and great. Just dandy!',
    'What\'s new anymore. Huh? Huh?! I get thrown from place to place, losing everything I have, everytime.'
  ]
};

export default Actions;
