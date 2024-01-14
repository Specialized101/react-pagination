/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from 'axios'
import { useKeycloak } from "keycloak-react-web";
import Table from './Table'
import './css/Users.css'

export default function Users() {
  const { keycloak } = useKeycloak()
  const [data, setData] = useState(null)
  const [pagination, setPagination] = useState(null)
  const [search, setSearch] = useState("")
  const [itemLimit, setItemLimit] = useState(10)
  const [queryFilterChanged, setQueryFilterChanged] = useState(false)

  useEffect(() => {
    try {
      const fetchData = async () => {
        if (keycloak.isTokenExpired()) {
          console.log('Token has expired, refreshing it...')
          await keycloak.updateToken()
        }
        let url = '/users'
        if (pagination) {
          const requestedPage = queryFilterChanged ? 1 : pagination.currentPage
          url = `${url}?page=${requestedPage}&limit=${itemLimit}&searchLname=${search}`
        }
        const response = await axios.get(url, {
          headers: {
            authorization: `Bearer ${keycloak.token}`
          }
        })
        setData(response.data.data.sort((a, b) => a.lastName < b.lastName ? -1 : 1))
        if (!pagination || queryFilterChanged) {
          setPagination({
            currentPage: parseInt(response.data.currentPage),
            itemsPerPage: parseInt(response.data.itemsPerPage),
            numberOfPages: parseInt(response.data.numberOfPages)
          })
          setQueryFilterChanged(false)
        }
      }
      fetchData()
    } catch (error) {
      console.log('Error with axios: ', error)
    }
  }, [pagination, search, itemLimit])

  const handleNext = () => {
    setPagination({ ...pagination, currentPage: pagination.currentPage + 1 })
  }

  const handlePrevious = () => {
    setPagination({ ...pagination, currentPage: pagination.currentPage - 1 })
  }

  const handleSearch = (e) => {
    setQueryFilterChanged(true)
    setSearch(e.target.value)
  }

  const handleItemLimit = (e) => {
    setQueryFilterChanged(true)
    setItemLimit(e.target.value)
  }

  return (
    <>
      {data && (
        <>
          <div className="grid">
            <label htmlFor="numberOfItems">Number of items to display: </label>
            <select defaultValue={itemLimit} name="numberOfItems" id="numberOfItems" onChange={(e) => handleItemLimit(e)}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <div></div>
          </div>
          <input
            className="search-bar"
            type="text"
            defaultValue={search}
            onChange={(e) => handleSearch(e)} />
            
          <Table handleNext={handleNext} handlePrevious={handlePrevious} data={data} />

          <div className="grid">
            <button disabled={pagination.currentPage === 1} onClick={handlePrevious}>Previous</button>
            <button className="contrast" disabled>{`${pagination.currentPage} of ${pagination.numberOfPages}`}</button>
            <button disabled={pagination.currentPage >= pagination.numberOfPages} onClick={handleNext}>Next</button>
          </div>
        </>
      )}
    </>
  )
}