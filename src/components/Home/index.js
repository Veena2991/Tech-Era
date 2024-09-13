import {Component} from 'react'
import TailSpin from 'react-loader-spinner'
import Course from '../Course'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    coursesList: [],
  }

  componentDidMount = () => {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    if (response.ok) {
      const updatedData = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))
      console.log(updatedData)
      this.setState({
        coursesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  successView = () => {
    const {coursesList} = this.state
    return (
      <div>
        <h1 className="course-heading">Courses</h1>
        <ul>
          {coursesList.map(each => (
            <Course key={each.id} details={each} />
          ))}
        </ul>
      </div>
    )
  }

  failureView = () => (
    <div className="failure-content">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
          className="failure-image"
        />
      </div>
      <h1 className="error">Oops! Something Went Wrong</h1>
      <p className="err-des">
        We cannot seem to find the page you are looking for.
      </p>
      <div>
        <button type="button" className="button" onClick={this.getCourses}>
          Retry
        </button>
      </div>
    </div>
  )

  loader = () => (
    <div data-testid="loader" className="spinner">
      <TailSpin
        height="80"
        width="80"
        color="#4fa940"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )

  checkApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.loader()

      default:
        return null
    }
  }

  render() {
    return <div>{this.checkApiStatus()}</div>
  }
}

export default Home
