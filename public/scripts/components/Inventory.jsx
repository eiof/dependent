import React from 'react';
import Item from '../../lib/item';
import { Panel, Table } from 'react-bootstrap';

class Inventory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: Item.generateStarterPack() // antipattern! Booo, hiss
    };
    this.renderItems = this.renderItems.bind(this);
  }

  renderItems() {
    const items = [];
    let index = 0;
    for (const item of this.state.items) {
      items.push(
        <tr key={index}>
          <td>{item.name}</td>
          <td>{item.size}</td>
        </tr>
      );
      index++;
    }
    return items;
  }

  render() {
    const items = this.renderItems();
    return (
      <Panel>
        <Table fill>
          <thead>
            <tr>
              <th>Item</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </Table>
      </Panel>
    );
  }
}

export default Inventory;
