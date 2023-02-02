import React, { useState } from "react";
import "./seatChart.scss";
import { connect } from 'react-redux'
import { seatsArea } from '../../actions/index.js'

function SeatsCard(props) {
    const [active, setActive] = useState({
        front: false,
        left: false,
        middle: false,
        right: false,
        end: false
    });

    const frontArea = props.seats.filter(seat => "AB".includes(seat.row))
    const endArea = props.seats.filter(seat => "GH".includes(seat.row))
    const leftArea = props.seats.filter(seat => "CDEF".includes(seat.row) && seat.column < 2)
    const rightArea = props.seats.filter(seat => "CDEF".includes(seat.row) && seat.column > 5)
    const midArea = props.seats.filter(seat => "CDEF".includes(seat.row) && seat.column < 6 && seat.column > 1)


    const pickSeat = (area, array) => {
        switch (area) {
            case "front":
                if (!active.front) props.setSeatSelect({ ...props.seatsSelect, "front": array })
                else props.setSeatSelect({ ...props.seatsSelect, "front": [] })
                return setActive({ ...active, front: !active.front })
            case "left":
                if (!active.left) props.setSeatSelect({ ...props.seatsSelect, "left": array })
                else props.setSeatSelect({ ...props.seatsSelect, "left": [] })
                return setActive({ ...active, left: !active.left })
            case "middle":
                if (!active.middle) props.setSeatSelect({ ...props.seatsSelect, "middle": array })
                else props.setSeatSelect({ ...props.seatsSelect, "middle": [] })
                return setActive({ ...active, middle: !active.middle })
            case "right":
                if (!active.right) props.setSeatSelect({ ...props.seatsSelect, "right": array })
                else props.setSeatSelect({ ...props.seatsSelect, "right": [] })
                return setActive({ ...active, right: !active.right })
            case "end":
                if (!active.end) props.setSeatSelect({ ...props.seatsSelect, "end": array })
                else props.setSeatSelect({ ...props.seatsSelect, "end": [] })
                return setActive({ ...active, end: !active.end })
            default:
                return
        }
    }
    return (<>
        <div className={active.front ? "seat-chart front seats-selected seats-border" : "seat-chart front"} onClick={() => pickSeat("front", frontArea)}>
            {frontArea.map(seat => <span key={seat.id} className="seat front-seat"></span>)}
        </div>
        <div className="middle-section" >
            <div className={active.left ? "seat-chart left seats-selected seats-border" : "seat-chart left"} onClick={() => pickSeat("left", leftArea)}>
                {leftArea.map(seat => <span key={seat.id} className="seat left-seat"></span>)}
            </div>
            <div className={active.middle ? "seat-chart mid seats-selected seats-border" : "seat-chart mid"} onClick={() => pickSeat("middle", midArea)}>
                {midArea.map(seat => <span key={seat.id} className="seat mid-seat"></span>)}
            </div>
            <div className={active.right ? "seat-chart right seats-selected seats-border" : "seat-chart right"} onClick={() => pickSeat("right", rightArea)}>
                {rightArea.map(seat => <span key={seat.id} className="seat right-seat"></span>)}
            </div>
        </div>
        <div className={active.end ? "seat-chart end seats-selected seats-border" : "seat-chart end"} onClick={() => pickSeat("end", endArea)} >
            {endArea.map(seat => <span key={seat.id} className="seat end-seat"></span>)}
        </div>
    </>)

}





const mapStateToProps = state => {
    return {
        MovieSelects: state.MovieSelects,
        daySelect: state.daySelect,
        ticketsNumber: state.ticketsNumber,
        seatsSelects: state.seatsSelects
    };
};

export default connect(mapStateToProps, { seatsArea })(SeatsCard);
