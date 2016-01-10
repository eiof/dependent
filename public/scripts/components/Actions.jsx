import React from 'react';
import sample from 'lodash/collection/sample';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import Player from '../../lib/player';

let player = Player.generate();

class Actions extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <span><Glyphicon glyph="comment" />{sample(this.props.messages)}</span>
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
