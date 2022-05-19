import moment from 'moment-timezone'

export const UTCToLocalTime = (UTCTime, format='YYYY-MM-DD HH:mm:ss') =>{
    var offset = (new Date()).getTimezoneOffset()
    console.log("=====================off set=====================", offset)
    const result =  moment.utc(UTCTime).add( -1 * offset, 'minutes').format(format)
    return result
}
