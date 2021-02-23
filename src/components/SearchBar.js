import { Component } from 'react'

export default class SearchBar extends Component {
  constructor() {
    super()

    this.state = { 
      value1: '',
      value2: ''
    }
  }

  submit() {
    this.props.onSubmit([this.state.value1, this.state.value2])
  }

  render() {
    const { value1 } = this.state
    const { value2 } = this.state
    
    return (
      <div>
        <label htmlFor="ligne">Ligne : </label>
        <input
            name="ligne"
            value={value1}
            onChange={({ target }) => this.setState({ value1: target.value })}
        />
        <br/>
        <label htmlFor="allumette">Allumette : </label>
        <input
            name="allumette"
            value={value2}
            onChange={({ target }) => this.setState({ value2: target.value })}
        />
        <br/>
        <button onClick={() => this.submit()}> submit </button>
      </div>
    )  
  }
}