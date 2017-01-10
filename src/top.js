class Top {
  constructor() {
    this.components = {
      Table: {
        components: [<Table />],
        childComponents: {
          TableColums: {
            components: [this.components[TableColums]]
          }
        }
      }
    };
  }



  _render() {



  }

}

class Table extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (<div>
    <ul>
     <li>I am Table</li>
    </ul>
    
    </div>

    )
  }
}



const App = (props) => {
  return <div>{props.test} 2</div>
}

ReactDOM.render(<App test={<Test />}/>, document.getElementById('app'))