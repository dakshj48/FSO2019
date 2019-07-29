import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl)
const create = personObject => axios.post(baseUrl, personObject)
const deleteID = id => axios.delete(`${baseUrl}/${id}`)
const update = (id, personObject) => axios.put(`${baseUrl}/${id}`, personObject)

export { getAll, create, deleteID, update }
