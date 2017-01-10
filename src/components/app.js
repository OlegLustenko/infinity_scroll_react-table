import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import shallowCompare from 'react-addons-shallow-compare';

class GridBody extends Component {
  constructor() {
    super();
    this.state = {
      shouldUpdate: true,
      total: 0,
      displayStart: 0,
      displayEnd: 0
    };
    // this.clickEvent = this.clickEvent.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let shouldUpdate = !(
      nextProps.visibleStart >= this.state.displayStart &&
      nextProps.visibleEnd <= this.state.displayEnd
    ) || (nextProps.total !== this.state.total);

    if (shouldUpdate) {
      this.setState({
        shouldUpdate: shouldUpdate,
        total: nextProps.total,
        displayStart: nextProps.displayStart,
        displayEnd: nextProps.displayEnd
      });
    } else {
      this.setState({
        shouldUpdate: false
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
    return this.state.shouldUpdate;
  }

  render() {
    let rows = [];
    rows[0] = (<tr
      id="gridgridrectop"
      key={0}
      style={{ height: this.props.visibleStart * this.props.recordHeight }}>
      <td colSpan="200">
      </td>
    </tr>);

    for (let i = this.props.visibleStart, _i = 1; i < this.props.visibleEnd; ++i, _i++) {
      let record = this.props.records[i];
      let records = Object.keys(record);
      rows[i + 1] = (<tr
        className={i % 2 === 0 ? 'w2ui-even' : 'w2ui-odd'}
        key={_i}
        style={{ height: this.props.recordHeight }}>
        <td className="w2ui-grid-data" >
          <div title={i + 1}>{i + 1}</div>
        </td>
        {records.map((x, i)=>{
          return (
          <td className="w2ui-grid-data" key={`Row${_i}-Column${i}`}>
            <div title={record[x]}>{record[x]}</div>
          </td>)
        })}
        
        <td className="w2ui-grid-data-last"></td>
      </tr>);
    }
    rows.push((<tr id="gridgridrecbottom"
      key={rows.length}
      style={{ height: (this.props.records.length - this.props.visibleEnd) * this.props.recordHeight }}>
      <td colSpan="200"></td>
    </tr>));

    return (<table>
      <tbody>
        <tr >
          <th
            className="w2ui-grid-data"
            style={{ height: 0, width: 50 }}>
          </th>
          <th
            className="w2ui-grid-data"
            style={{ height: 0, width: 150 }}>
          </th>
          <th
            className="w2ui-grid-data"
            style={{ height: 0, width: 150 }}>
          </th>
          <th
            className="w2ui-grid-data"
            style={{ height: 0, width: 150 }}>
          </th>
          <th
            className="w2ui-grid-data"
            style={{ height: 0, width: 150 }}>
          </th>
          <th
            className="w2ui-grid-data"
            style={{ height: 0, width: 150 }}>
          </th>
          <th
            className="w2ui-grid-data"
            style={{ height: 0, width: 150 }}>
          </th>
          <th
            className="w2ui-grid-data"
            style={{ height: 0, width: 150 }}>
          </th>
          <th
            className="w2ui-grid-data"
            style={{ height: 0, width: 150 }}>
          </th>
          <th
            className="w2ui-grid-data"
            style={{ height: 0, width: 150 }}>
          </th>
          <th
            className="w2ui-grid-data-last"
            style={{ height: 0, width: 81 }}>
          </th>
        </tr>
        {rows}
      </tbody>
    </table>);
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState(this.props);
    this.onScroll = this.onScroll.bind(this);
  }
  getDefaultState(props) {

    let recordHeight = 25;
    let recordsPerBody = Math.floor((props.height - 50) / recordHeight);
    return {
      total: props.records.length,
      records: props.records,
      recordHeight: recordHeight,
      recordsPerBody: recordsPerBody,
      visibleStart: 0,
      visibleEnd: recordsPerBody,
      displayStart: 0,
      displayEnd: recordsPerBody * 2
    };
  }

  scrollState(scroll) {
    let visibleStart = Math.floor(scroll / this.state.recordHeight);
    let visibleEnd = Math.min(visibleStart + this.state.recordsPerBody, this.state.total - 1);

    let displayStart = Math.max(0, Math.floor(scroll / this.state.recordHeight) - this.state.recordsPerBody * 1.5);
    let displayEnd = Math.min(displayStart + 2.5 * this.state.recordsPerBody, this.state.total - 1);

    this.setState({
      visibleStart: visibleStart,
      visibleEnd: visibleEnd,
      displayStart: displayStart,
      displayEnd: displayEnd,
      scroll: scroll
    });
  }

  onScroll(event) {
    if (this.running) return;
    this.running = true;
    this.scrollState(ReactDOM.findDOMNode(this).scrollTop);
    this.running = false;
  }

  componentDidMount() {
    debugger;
    this.ss = ReactDOM.findDOMNode(this);
  }

  render() {
    return (
      <div>
      <div id="grid"
      style={{ width: this.props.width, height: this.props.height }}
      name="grid"
      className="w2ui-reset w2ui-grid"> 
      <div style={{ width: 1500, height: 566 }}>
        <div id="gridgridbody"
          className="w2ui-grid-body"
          style={{ top: 38, bottom: 24, left: 0, right: 0, height: 504 }}>
          <div id="gridgridrecords"
            className="w2ui-grid-records"
            style={{ top: 26, 'overflowX': 'hidden', 'overflowY': 'auto', overflowAnchor: 'none' }}
            ref="scrollable"
            onScroll={this.onScroll}>
            <GridBody
              records={this.state.records}
              total={this.state.records.length}
              visibleStart={this.state.visibleStart}
              visibleEnd={this.state.visibleEnd}
              displayStart={this.state.displayStart}
              displayEnd={this.state.displayEnd}
              recordHeight={this.state.recordHeight}
              />
          </div>
          <div id="gridgridcolumns" className="w2ui-grid-columns">
            <table>
              <tbody>
                <tr>
                  <td className="w2ui-head" style={{ width: 50, }}>
                    <div className="w2ui-resizer" name="0" style={{ height: 25, 'marginLeft': 46, }}>
                    </div>
                    <div>ID</div>
                  </td>
                  <td className="w2ui-head" style={{ width: 150 }}>
                    <div className="w2ui-resizer" name="1" style={{ height: 25, 'marginLeft': 146, }}></div>
                    <div>First Name</div>
                  </td>
                  <td className="w2ui-head" style={{ width: 150, }}>
                    <div className="w2ui-resizer" name="2" style={{ height: 25, 'marginLeft': 146, }}></div>
                    <div>Last Name</div>
                  </td>
                  <td className="w2ui-head" style={{ width: 150 }}>
                    <div className="w2ui-resizer" name="3" style={{ height: 25, 'marginLeft': 146, }}></div>
                    <div>Email</div>
                  </td>
                  <td className="w2ui-head" style={{ width: 150 }}>
                    <div className="w2ui-resizer" name="1" style={{ height: 25, 'marginLeft': 146, }}></div>
                    <div>First Name</div>
                  </td>
                  <td className="w2ui-head" style={{ width: 150 }}>
                    <div className="w2ui-resizer" name="1" style={{ height: 25, 'marginLeft': 146, }}></div>
                    <div>First Name</div>
                  </td>
                  <td className="w2ui-head" style={{ width: 150 }}>
                    <div className="w2ui-resizer" name="1" style={{ height: 25, 'marginLeft': 146, }}></div>
                    <div>First Name</div>
                  </td>
                  <td className="w2ui-head" style={{ width: 150 }}>
                    <div className="w2ui-resizer" name="1" style={{ height: 25, 'marginLeft': 146, }}></div>
                    <div>First Name</div>
                  </td>
                  <td className="w2ui-head" style={{ width: 150 }}>
                    <div className="w2ui-resizer" name="1" style={{ height: 25, 'marginLeft': 146, }}></div>
                    <div>First Name</div>
                  </td>
                  <td className="w2ui-head" style={{ width: 150 }}>
                    <div className="w2ui-resizer" name="1" style={{ height: 25, 'marginLeft': 146, }}></div>
                    <div>First Name</div>
                  </td>
                  <td className="w2ui-head" style={{ width: 100 }}>
                    <div className="w2ui-resizer" name="1" style={{ height: 25, 'marginLeft': 146, }}></div>
                    <div>Email</div>
                  </td>

                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>);
  }
}