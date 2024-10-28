import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'

import JobCard from '../JobCard'

import Header from '../Header'

import EmpTypesList from '../FiltersGroup'

import SalTypesList from '../SalaryFilters'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const profileApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileDetails: [],
    empType: employmentTypesList[0].employmentTypeId,
    searchInput: '',
    salaryQueries: [],
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    profileApiStatus: profileApiStatusConstants.initial,
    employQueries: [],
  }

  componentDidMount() {
    this.getUserProfile()
    this.getJobsDetails()
  }

  getJobsDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchInput, employQueries, salaryQueries} = this.state
    const employmentType = employQueries.join(',')
    const minimumPackage = salaryQueries.join(',')
    console.log(employQueries)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedJobData = data.jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedJobData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  getUserProfile = async () => {
    this.setState({profileApiStatus: profileApiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        profileApiStatus: profileApiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: profileApiStatusConstants.failure})
    }
  }

  onSearchJobs = event => {
    this.setState({searchInput: event.target.value})
  }

  changeEmploymentType = employmentType => {
    this.setState({employmentType}, this.getJobsDetails)
  }

  renderProfile = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">Manikantareddy</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  retryProfileDetails = () => {
    this.getUserProfile()
  }

  renderProfileFailure = () => (
    <div>
      <button
        type="button"
        className="profile-failure-button"
        onClick={this.retryProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  renderAllJobs = () => {
    const {jobsList} = this.state
    const shouldShowProductsList = jobsList.length > 0

    return shouldShowProductsList ? (
      <div className="all-jobs-container">
        <ul className="products-list">
          {jobsList.map(eachJob => (
            <JobCard jobData={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
          className="no-jobs-img"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryJobsPage = () => {
    this.getJobsDetails()
  }

  renderFailureView = () => (
    <div className="job-details-error-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        className="error-view-image"
      />
      <h1 className="job-not-found-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>

      <button
        type="button"
        className="failure-button"
        onClick={this.retryJobsPage}
      >
        Retry
      </button>
    </div>
  )

  getsearchResults = () => {
    this.getJobsDetails()
  }

  renderProfileDetails = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case profileApiStatusConstants.success:
        return this.renderProfile()
      case profileApiStatusConstants.failure:
        return this.renderProfileFailure()
      case profileApiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderAllJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAllJobs()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  getEmploymentType = id => {
    const {employQueries} = this.state
    const queryStatus = employQueries.includes(id)
    if (queryStatus === false) {
      this.setState(
        {employQueries: [...employQueries, id]},
        this.getJobsDetails,
      )
    } else {
      const updatedQueries = employQueries.filter(Item => Item !== id)
      this.setState({employQueries: updatedQueries}, this.getJobsDetails)
    }
  }

  getSalaryType = id => {
    const {salaryQueries} = this.state
    const queryStatus = salaryQueries.includes(id)
    if (queryStatus === false) {
      this.setState(
        {salaryQueries: [...salaryQueries, id]},
        this.getJobsDetails,
      )
    } else {
      const updatedQueries = salaryQueries.filter(Item => Item !== id)
      this.setState({salaryQueries: updatedQueries}, this.getJobsDetails)
    }
  }

  render() {
    const {searchInput, empType} = this.state
    return (
      <div>
        <Header />
        <div className="jobs-container">
          <div className="search-container1">
            <input
              type="search"
              className="searchEl"
              placeholder="Search"
              value={searchInput}
              onChange={this.onSearchJobs}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-icon"
              onClick={this.getsearchResults}
            >
              {' '}
              <BsSearch className="search-icon-El" />
            </button>
          </div>
          <div className="filters-container">
            {this.renderProfileDetails()}
            <hr className="horizontal-line" />
            <ul>
              <h1 className="employment-heading">Type of Employment</h1>
              {employmentTypesList.map(eachEmp => (
                <EmpTypesList
                  empItem={eachEmp}
                  getEmploymentType={this.getEmploymentType}
                  key={eachEmp.employmentTypeId}
                />
              ))}
            </ul>

            <hr className="horizontal-line" />
            <ul>
              <h1 className="salary-heading ">Salary Range</h1>
              {salaryRangesList.map(eachSal => (
                <SalTypesList
                  salItem={eachSal}
                  getSalaryType={this.getSalaryType}
                  key={eachSal.salaryRangeId}
                />
              ))}
            </ul>
          </div>
          <div>
            <div className="search-container">
              <input
                type="search"
                className="searchEl"
                placeholder="Search"
                value={searchInput}
                onChange={this.onSearchJobs}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-icon"
                onClick={this.getsearchResults}
              >
                {' '}
                <BsSearch className="search-icon-El" />
              </button>
            </div>
            {this.renderAllJobDetails()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
