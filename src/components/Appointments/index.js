import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    title: '',
    date: '',
    starred: false,
  }

  toggleFavorite = titleId => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (eachAppointment.titleId === titleId) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  filterActive = () => {
    const {starred} = this.state
    this.setState({starred: !starred})
  }

  addNewAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state

    const newAppointment = {
      titleId: uuidv4(),
      title,
      date,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  displayStarredAppointments = () => {
    const {appointmentList, starred} = this.state
    if (starred) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }
    return appointmentList
  }

  render() {
    const {appointmentList, title, date, starred} = this.state
    const starStatus = starred ? 'active-star-button' : 'star-button'
    const filteredAppointments = this.displayStarredAppointments()
    console.log(appointmentList, title)

    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="appointment-card-container">
            <div className="left-container">
              <h1 className="heading">Add Appointment</h1>
              <form
                className="form-container"
                onSubmit={this.addNewAppointment}
              >
                <label className="label" htmlFor="title">
                  TITLE
                </label>
                <input
                  id="title"
                  placeholder="Title"
                  className="input"
                  value={title}
                  onChange={this.onChangeTitle}
                />
                <label className="label" htmlFor="appoint-date">
                  DATE
                </label>
                <input
                  type="date"
                  onChange={this.onChangeDate}
                  value={date}
                  className="input"
                  id="appoint-date"
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-image"
            />
          </div>
          <hr className="line" />
          <div className="appointments-section">
            <div className="Appointments-heading">
              <h1 className="sub-heading">Appointments</h1>
              <button
                type="button"
                onClick={this.filterActive}
                className={starStatus}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list-container">
              {filteredAppointments.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.titleId}
                  appointmentDetails={eachAppointment}
                  toggleFavorite={this.toggleFavorite}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
