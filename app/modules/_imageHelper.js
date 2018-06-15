import * as imageSizes from '../constants/imageSizes'

const IMAGE_URL = 'https://image.tmdb.org/t/p/';
const imageSizeMapper = {
    [imageSizes.IMAGE_SIZE_116_174]: 'w116_and_h174_bestv2',
    [imageSizes.IMAGE_SIZE_174_261]: 'w174_and_h261_bestv2',
    [imageSizes.IMAGE_SIZE_185_278]: 'w185_and_h278_bestv2',
    [imageSizes.IMAGE_SIZE_370_556]: 'w370_and_h556_bestv2',
    [imageSizes.IMAGE_SIZE_350_196]: 'w350_and_h196_bestv2',
    [imageSizes.IMAGE_SIZE_700_392]: 'w700_and_h392_bestv2'
}

export function getImageUrl(url, size) {
    return IMAGE_URL + imageSizeMapper[size] + url;
}