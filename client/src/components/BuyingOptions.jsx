import React from "react";
import axios from "axios";
import Option from "./Option";

class BuyingOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorOptions: null,
      sizeOptions: null
    };
    this.getColorOptions = this.getColorOptions.bind(this);
    this.getSizeOptions = this.getSizeOptions.bind(this);
  }

  getColorOptions() {
    axios
      .get(`/api/products/${this.props.id}/colors`)
      .then(({ data }) => {
        data.length > 0 ? this.setState({ colorOptions: data }) : "";
      })
      .catch();
  }
  getSizeOptions() {
    let id = this.props.id;
    console.log(id);
    axios
      .get(`/api/products/${this.props.id}/size`)
      .then(({ data }) => {
        console.log(data);
        data.length > 0 ? this.setState({ sizeOptions: data }) : "";
      })
      .catch();
  }

  componentDidMount() {
    this.getColorOptions();
    this.getSizeOptions();
  }

  render() {
    return (
      <div>
        {this.state.colorOptions ? (
          <Option
            type="table"
            optionName="Color"
            options={this.state.colorOptions}
            swapImage={this.props.swapImage}
          />
        ) : (
          ""
        )}
        {this.state.sizeOptions ? (
          <Option
            type="select"
            optionName="Size"
            options={this.state.sizeOptions}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default BuyingOptions;