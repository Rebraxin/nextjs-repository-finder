import axios from 'axios'
import { axiosGetCancellable } from '@helpers/axios.helper'

const axiosConfig = {
  baseURL: 'https://api.github.com/',
  auth: {
    username: process.env.GITHUB_CLIENT_ID,
    password: process.env.GITHUB_CLIENT_SECRET,
  },
}

export const searchRepos = (searchText, language) => {
  const query = language ? `${searchText}+language:${language}` : searchText

  if (isServer()) {
    return axios.get(
      `search/repositories?q=${query}&sort=stars&order=desc`,
      axiosConfig
    )
  }

  return axiosGetCancellable(`../api/search?q=${query}&sort=stars&order=desc`)
}

export const getRepoById = (id) => {
  return axios.get(`repositories/${id}`, axiosConfig)
}

export const getProfileById = (username) => {
  return axios.get(`users/${username}`, axiosConfig)
}

export const isServer = () => {
  return typeof window === 'undefined'
}
