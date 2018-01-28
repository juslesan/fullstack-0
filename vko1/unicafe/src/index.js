import React from 'react'
import ReactDOM from 'react-dom'

const Title = (props) => (
  <div>
    <h1>{props.title}</h1>
  </div>
)

const Statistics = (props) => (
  <div>
    <table>
      <tbody>
          <Statistic stat={props.arviot[0]} given={props.given[0]} />
          <Statistic stat={props.arviot[1]} given={props.given[1]} />
          <Statistic stat={props.arviot[2]} given={props.given[2]} />
          <Statistic stat="keskiarvo" given={props.ka.toFixed(1)} />
          <Statistic stat="positiiviset" given={props.positiiviset.toFixed(1)} />
      </tbody>
    </table>
  </div>
)
const Statistic = (props) => (
  <tr>
    <td>{props.stat}:</td>
    <td> {props.given}</td>
  </tr>
)

const Button = (props) => (
    <button onClick={props.func}>{props.text}</button>
)

class  App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
    this.hyvaArvio = this.hyvaArvio.bind(this);
    this.neutraaliArvio = this.neutraaliArvio.bind(this);
    this.huonoArvio = this.huonoArvio.bind(this);
  } 

  hyvaArvio = () => {
    this.setState({ hyva: this.state.hyva + 1 })
  }

  neutraaliArvio = () => {
    this.setState({ neutraali: this.state.neutraali + 1 })
  }

  huonoArvio = () => {
    this.setState({ huono: this.state.huono + 1 })
  }

  render() {
    const title1="anna palautetta"
    const title2="statistiikka"

    const arviot = ["hyvä", "neutraali", "huono"]
    const given = [this.state.hyva, this.state.neutraali, this.state.huono]
    let n = given[0] + given[1] + given[2]
    let ka = ((given[0] * 1) + (given[1] * 0)  + (given[2] * -1)) / n
    let positiiviset = given[0] / n * 100
    return(
      <div>
        <Title title={title1} />
        <div>
          <Button func={this.hyvaArvio} text={arviot[0]} />
          <Button func={this.neutraaliArvio} text={arviot[1]} />
          <Button func={this.huonoArvio} text={arviot[2]} />
        </div>
        <Title title={title2} />
        {n ? (
          <Statistics arviot={arviot} given={given} ka={ka} positiiviset={positiiviset} />
        ) : (
          <p>Ei arvosteluja!</p>
        )}
      </div>
    )
  }
} 
  
ReactDOM.render(
  <App />,
  document.getElementById('root')
)