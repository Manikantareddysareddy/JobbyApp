import {MdLocationOn} from 'react-icons/md'

import {FaSuitcase, FaRegStar} from 'react-icons/fa'

import './index.css'

const SimilarJobItem = props => {
  const {similarItem} = props
  const {
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
  } = similarItem

  return (
    <div className="main-job-card2">
      <div className="top-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo-image"
        />
        <div className="title-container">
          <h1 className="title">{title}</h1>
          <div className="rating-container">
            <FaRegStar className="star-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="similar-desc-container">
        <h1 className="similar-desc">Description</h1>
        <p className="similar-desc-para">{jobDescription}</p>
      </div>
      <div className="employmentType-container">
        <div className="container">
          <MdLocationOn className="icon" />
          <p className="location">{location}</p>
        </div>
        <div className="container">
          <FaSuitcase className="icon" />
          <p className="location">{employmentType}</p>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobItem
