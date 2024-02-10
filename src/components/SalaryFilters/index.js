import './index.css'

const SalTypesList = props => {
  const {salItem, getSalaryType} = props
  const {salaryRangeId, label} = salItem

  const clickSalaryButton = () => {
    getSalaryType(salaryRangeId)
  }

  return (
    <li className="checkbox-container">
      <input type="radio" id={salaryRangeId} onChange={clickSalaryButton} />
      <label htmlFor={salaryRangeId} className="checkbox-labelEl">
        {label}
      </label>
    </li>
  )
}

export default SalTypesList
