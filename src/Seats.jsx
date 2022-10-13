import "./Seats.css"
import React, { useState } from 'react'
import clsx from "clsx"
import Popup from "./Popup"

const movies = [
    {
        name: 'The Kashmir Files',
        price: 150,
        occupied: [0, 1, 2, 3, 4, 5],
        reserved: [12, 13, 18, 26,23]
    },
]

const seats = Array.from({ length: 6 * 6 }, (_, i) => i)

export default function Seats() {
    const [selectedMovie, setSelectedMovie] = useState(movies[0])
    const [selectedSeats, setSelectedSeats] = useState([])
    const [open, setOpen]= useState(false)
    const popUp=()=>{
    //   setOpen(true)
     let email= prompt('Enter Your E-mail')
     let mobile = prompt('Enter Your Mobile Number')
     let userName= prompt("Enter Your FullName")
     console.log({email})
     console.log({mobile})
     console.log({userName})
     alert(`Thank for booking ${userName}.Your booking is Sucessfully done.`)
    
    }

    return (
        <div className="App">
            <Movies
                movie={selectedMovie}
                onChange={movie => {
                    setSelectedSeats([])
                    setSelectedMovie(movie)
                }}
            />
            <ShowCase />
            <Cinema
                movie={selectedMovie}
                selectedSeats={selectedSeats}
                onSelectedSeatsChange={selectedSeats => {
                    if (selectedSeats.length <= 2) {
                        setSelectedSeats(selectedSeats)
                    }
                    else {
                        alert('A user can selected maximum 2 seats at a time')
                    }
                }}
            />
            <p className="info">

                You have selected <span className="count">{selectedSeats.length}</span>{' '}
                seats for the price of{' '}
                <span className="total">
                    {selectedSeats.length * selectedMovie.price}
                </span>
            </p>
            <div>
                <button onClick={popUp} className="process">Proceed to confirm</button>
            </div>
        </div>
            // {open && <Popup/>}
    )
}

function Movies({ movie, onChange }) {
    return (
        <div className="Movies">
            <label htmlFor="movie">Pick a movie</label>
            <select
                id="movie"
                value={movie.name}
                onChange={e => {
                    onChange(movies.find(movie => movie.name === e.target.value))
                }}
            >
                {movies.map(movie => (
                    <option key={movie.name} value={movie.name}>
                        {movie.name} (Rs.{movie.price})
                    </option>
                ))}
            </select>
        </div>
    )
}

function ShowCase() {
    return (
        <ul className="ShowCase">
            <li>
                <span className="seat" /> <small>N/A</small>
            </li>
            <li>
                <span className="seat selected" /> <small>Selected</small>
            </li>
            <li>
                <span className="seat occupied" /> <small>Occupied</small>
            </li>
            <li>
                <span className="seat reserved" /> <small>Reserved</small>
            </li>
        </ul>
    )
}

function Cinema({ movie, selectedSeats, onSelectedSeatsChange }) {
    function handleSelectedState(seat) {
        const isSelected = selectedSeats.includes(seat)
        if (isSelected) {
            onSelectedSeatsChange(
                selectedSeats.filter(selectedSeat => selectedSeat !== seat),
            )
        } else {
            onSelectedSeatsChange([...selectedSeats, seat])
        }
    }

    return (
        <div className="Cinema">
            <div className="screen" />

            <div className="seats">
                {seats.map(seat => {
                    const isSelected = selectedSeats.includes(seat)
                    const isReserved = movie.reserved.includes(seat)
                    const isOccupied = movie.occupied.includes(seat)
                    return (
                        <span
                            tabIndex="0"
                            key={seat}
                            className={clsx(
                                'seat',
                                isSelected && 'selected',
                                isOccupied && 'occupied',
                                isReserved && 'reserved'

                            )}
                            onClick={isOccupied ? null : () => handleSelectedState(seat)}
                            onKeyPress={
                                isOccupied
                                    ? null
                                    : e => {
                                        if (e.key === 'Enter') {
                                            handleSelectedState(seat)
                                        }
                                    }
                            }
                        />
                    )
                })}
            </div>
        </div>
    )
}
