import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
// import "./../../styles/header.css";
import "./../../App.css";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      displayMenu: false 
    };
    this.myRef = React.createRef()
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  handleClickOutside = (event) => {
    // const domNode = ReactDOM.findDOMNode(this);
    const domNode = this.myRef.current

    if (!domNode || !domNode.contains(event.target)) {
      this.setState({
        displayMenu: false,
      });
    }
  };

  handleDisplay = () => {
    this.setState({ displayMenu: !this.state.displayMenu });
  };

  render() {
    return (
      <div ref={this.myRef} style={{ marginLeft: "20vw" }}>
        <button
          style={{
            cursor: "pointer",
            background: "none",
            border: "none",
            fontSize: "16px",
            color: "#f3f3f3",
            fontWeight: "600",
            // marginLeft: "20vw"
          }}
          onClick={this.handleDisplay}
        >
          {this.props.getUser()}
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 7.4L.6 2 2 .6l4 4 4-4L11.4 2z"
              fill="currentColor"
              fillRule="nonzero"
            />
          </svg>{" "}
        </button>

        {this.state.displayMenu === true && (
          <div style={dropdownStyle}>
            {this.props.isLogged() === true && (
              <div>
                <NavLink 
                activeStyle={{
                    color: '#8fdd3c',
                }}
                style={{textDecoration: 'none', display: 'block'}}
                className="dropdownBtn"
                to="/account">
                  Preferences
                </NavLink>
          
                <button className="dropdownBtn" onClick={this.props.doLogout}>
                  Logout
                </button>
              </div>
              
              
            )}
          </div>
        )}
      </div>
    );
  }
}
export default Dropdown;


const dropdownStyle = {
  padding: '3px 2px',
  position: "absolute",
  border: "none",
  background: "rgba(0, 0, 0, 0.2)",
  borderRadius: "5px",
};

// var linkStyle = {
//   textDecoration: 'none',
//   color: '#f3f3f3',
//   ":hover": {
//       color: 'green',
//   },
//   marginLeft: '5vw',
  
// }