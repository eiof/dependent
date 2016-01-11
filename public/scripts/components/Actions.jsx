import React from 'react';
import sample from 'lodash/collection/sample';
import { Grid, Row, Col, Panel, Glyphicon } from 'react-bootstrap';
import Player from '../../lib/player';

class Actions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      player: {
        name: {
          first: 'John',
          last: 'Snow'
        }
      }
    };
  }

  componentWillMount() {
    this.setState({ player: Player.generate() });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Panel>
              <h4>{this.state.player.name.first} {this.state.player.name.last}</h4>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Panel>
              <span><Glyphicon glyph="comment" />{sample(this.props.messages)}</span>
            </Panel>
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
