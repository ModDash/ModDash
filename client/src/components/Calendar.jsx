import React from 'react';
import CalendarEntry from './CalendarEntry.jsx';
import { Glyphicon, Overlay } from 'react-bootstrap';


class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment().format('dddd, MMMM D'),
    };
  }

  // toggle() {
  //   this.setState({
  //     show: !this.state.show
  //   });
  // }


  render() {
    // let pop = <div><strong>Holy guacamole!</strong> Check this info.</div>;
    return (
      <div className='calendar'>
        <div className='calendar-title'>
          {this.state.date}
        </div>
        <div>
        {this.props.events.map((event, i) =>
            <CalendarEntry  key={i} event={event} />
          )}
        </div>
      </div>
    );
  }
}

export default Calendar;

        // <div className='add-event-glyph'><Glyphicon glyph="plus" />
        // </div>

// maybe make the add-event-glyph into load more calendar events, or can add an event from clicking on it, not sure which is more intuitive
