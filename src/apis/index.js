import { Axios, BASE_MATTR_URL, BASE_VISITOR_URL } from './axios'

import axios from 'axios'
export const listAsics = (page, size) => {
    return Axios.get(`/listAsicInfo?size=${size}&page=${page}`)
}

export const uploadImportFile = (url, data) => {
    return axios.put(url, data, {
        headers: {
            'Content-Type': data.type
        }
    });
}
export const getImportUrl = (data) => {
    return Axios.post('/imports/signedUrl', data)
}

export const listImports = (page, size) => {
    return Axios.get(`/imports?size=${size}&page=${page}`)
}

export const importFile = (data) => {
    return Axios.post(`/imports`, data)
}

export const listSubmissions = (page, size) => {
    return Axios.get(`/submissions?size=${size}&page=${page}`)
}

export const exportSubmissions = (range) => {
    return Axios.post(`submissions/export`, range)
}

export const getSubmission = (id) => {
    return Axios.get(`/submissions/${id}`)
}

export const listUsers = (page, size) => {
    return Axios.get(`/users?size=${size}&page=${page}`)
}

export const getUser = (id) => {
    return Axios.get(`/users/${id}`)
}

export const updateUser = (id, body) => {
    return Axios.put(`users/${id}`, body)
}

export const deleteUser = (id) => {
    return Axios.delete(`users/${id}`)
}


export const updateUserAccessLocations = (id, body) => {
    return Axios.put(`users/${id}/access_locations`, body)
}

export const listAccessLocationNames = () => {
    return Axios.get('mobile/access-locations')
}

export const listOpRequirements = (accessLocationId) => {
    return Axios.get(`mobile/op-requirements?accessLocationNameId=${accessLocationId}`)
}

export const createUser = (body) => {
    return Axios.post(`users/`, body)
}

export const login = (username, password) => {
    return Axios.post(`mobile/login`, { username, password })
}

export const listLocations = (page, size) => {
    return Axios.get(`/access-locations?size=${size}&page=${page}`)
}

export const createLocation = (body) => {
    return Axios.post(`access-locations`, body)
}

export const updateLocation = (id, body) => {
    return Axios.put(`access-locations/${id}`, body)
}

export const deleteLocation = (id) => {
    return Axios.delete(`access-locations/${id}`)
}

export const createOpRequirement = (body) => {
    return Axios.post(`mobile/op-requirements`, body)
}

export const updateOpRequirement = (id, body) => {
    return Axios.put(`mobile/op-requirements/${id}`, body)
}

export const deleteOpRequirement = (id) => {
    return Axios.delete(`mobile/op-requirements/${id}`)
}


export const listNewAEVLocations = (page, size) => {
    return Axios.get(`/new-aev-locations?size=${size}&page=${page}`)
}

export const createNewAEVLocation = (body) => {
    return Axios.post(`new-aev-locations`, body)
}

export const updateNewAEVLocation = (id, body) => {
    return Axios.put(`new-aev-locations/${id}`, body)
}

export const deleteNewAEVLocation = (id) => {
    return Axios.delete(`new-aev-locations/${id}`)
}


export const listSecurityChecks = (page, size) => {
    return Axios.get(`/security-checks?size=${size}&page=${page}`)
}

export const createSecurityCheck = (body) => {
    return Axios.post(`security-checks`, body)
}

export const updateSecurityCheck = (id, body) => {
    return Axios.put(`security-checks/${id}`, body)
}

export const deleteSecurityCheck = (id) => {
    return Axios.delete(`security-checks/${id}`)
}

export const listValidValues = () => {
    return Axios.get(`/valid-values`)
}

export const listLocationAuditPolicies = (locationId) => {
    return Axios.get(`/location-audit-policy?locationId=${locationId}`)
}

export const listAuditPolicies = (page, size) => {
    return Axios.get(`/audit-policy?size=${size}&page=${page}`)
}

export const createAuditPolicy = (body) => {
    return Axios.post(`audit-policy`, body)
}

export const updateAuditPolicy = (id, body) => {
    return Axios.put(`audit-policy/${id}`, body)
}

export const deleteAuditPolicy = (id) => {
    return Axios.delete(`audit-policy/${id}`)
}

export const createLocationAuditPolicy = (body) => {
    return Axios.post(`location-audit-policy`, body)
}

export const deleteLocationAuditPolicy = (id) => {
    return Axios.delete(`location-audit-policy/${id}`)
}

export const listAuditPolicySecurityChecks = (auditPolicyId) => {
    return Axios.get(`/audit-policy-security-checks?auditPolicyId=${auditPolicyId}`)
}

export const createAuditPolicySecurityCheck = (body) => {
    return Axios.post(`audit-policy-security-checks`, body)
}

export const deleteAuditPolicySecurityCheck = (id) => {
    return Axios.delete(`audit-policy-security-checks/${id}`)
}

export const listDigitalAsics = () => {
    return Axios.get(`${BASE_MATTR_URL}/d-asic/list`)
}

export const createDigitalAsic = (data) => {
    return Axios.post(`${BASE_MATTR_URL}/d-asic/createUser`, data)
}

export const parseSignupToken = (token) => {
    return Axios.get(`${BASE_MATTR_URL}/d-asic/parse-token?token=${token}`)
}

export const requestSignup = (data) =>{
    return Axios.post(`${BASE_MATTR_URL}/d-asic/sign-up`, data)
}

export const inviteDigitalAsic = (id) =>{
    return Axios.post(`${BASE_MATTR_URL}/d-asic/${id}/invite`, null)
}

export const updateDigitalAsic = (id, data) =>{
    return Axios.put(`${BASE_MATTR_URL}/d-asic/${id}/update`, data)
}

export const deleteDigitalAsic = (id) =>{
    return Axios.delete(`${BASE_MATTR_URL}/d-asic/${id}/delete`)
}

export const detailDigitalAsic = (id) =>{
    return Axios.get(`${BASE_MATTR_URL}/d-asic/get/${id}`)
}

// Visitor Pass Management
// BASE_VISITOR_URL
export const listVisitorPass = (page, size) => {
    return Axios.get(`${BASE_VISITOR_URL}/visitor-pass/list?size=${size}&page=${page}`)
}
export const getVisitorPassById = (id) => {
    return Axios.get(`${BASE_VISITOR_URL}/visitor-pass/${id}`)
}
export const approveVisitorPass = (id) =>{
    return Axios.post(`${BASE_VISITOR_URL}/visitor-pass/${id}/approve`)
}
export const listVisitors = () =>{
    return Axios.get(`${BASE_VISITOR_URL}/visitor/list`)
}
export const listVisitorRequests = (page, size, visitorId) =>{
    return Axios.get(`${BASE_VISITOR_URL}/visitor/requests/${visitorId}?size=${size}&page=${page}`)
}
export const rejectVisitorPass = (id, body) =>{
    return Axios.post(`${BASE_VISITOR_URL}/visitor-pass/${id}/reject`, body)
}
export const createVisitor = (body) =>{
    return Axios.post(`${BASE_VISITOR_URL}/visitor/createVisitor`, body)
}
export const createVIPReq = (id, body) =>{
    return Axios.post(`${BASE_VISITOR_URL}/visitor-pass/visitor/${id}`, body)
}