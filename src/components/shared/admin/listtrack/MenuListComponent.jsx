import React, { Component } from 'react';

class MenuListComponent extends Component {
  onYear = () => {
    this.props.onYear();
  }

  onDay = () => {
    this.props.onDay();
  }
  onHome = () => {
    this.props.onHome();
  }
  onMonth = () => {
    this.props.onMonth();
  }

  render() {
    return (
      <div className="wrap-container">
        <div className="menulayout">
          <div className="p-menu">
            <button className="btn tag" onClick={this.onHome}>Home</button>
          </div>
          <div className="p-menu">
            <button className="btn tag" onClick={this.onDay}>Search</button>
          </div>
        </div>
      </div>
    );
  }
}

export default MenuListComponent;