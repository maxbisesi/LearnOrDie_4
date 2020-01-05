import React from 'react';

class Recruit extends React.Component {
  static _messge=`
  Hello Recruit, here\'s a plastic badge. We doubt you\'ll live long enough to give it back.
  If you're scared by the blood choked gurgles coming from below deck don't worry, it'll all be over soon. 
  `
  public color = 'black';

  render() {
    return (
        <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        width='300' 
        height='250'
        viewBox='0 0 300 300'
      >
        <defs>
          <linearGradient id='a'>
            <stop offset='0' stopColor='#ececec' stopOpacity='1'></stop>
            <stop offset='1' stopColor='#ececec' stopOpacity='0'></stop>
          </linearGradient>
          <marker id='d' orient='auto' overflow='visible' refX='0' refY='0'>
            <path
              fill='navy'
              fillOpacity='1'
              fillRule='evenodd'
              stroke='none'
              strokeOpacity='1'
              strokeWidth='1pt'
              d='M0 0l5-5-17.5 5L5 5 0 0z'
              transform='matrix(.8 0 0 .8 10 0)'
            ></path>
          </marker>
          <radialGradient
            id='b'
            cx='102.651'
            cy='128.357'
            r='58.775'
            fx='102.651'
            fy='128.357'
            gradientTransform='matrix(.89265 0 0 1.02944 15.556 20.455)'
            gradientUnits='userSpaceOnUse'
            xlinkHref='#a'
          ></radialGradient>
          <filter
            id='c'
            width='1.071'
            height='1.073'
            x='-0.036'
            y='-0.036'
            colorInterpolationFilters='sRGB'
          >
            <feGaussianBlur stdDeviation='1.749'></feGaussianBlur>
          </filter>
        </defs>
        <ellipse
          cx='107.583'
          cy='142.026'
          fill='#999'
          fillOpacity='1'
          stroke='#000'
          strokeDasharray='none'
          strokeMiterlimit='3.8'
          strokeOpacity='1'
          strokeWidth='1.17'
          opacity='1'
          rx='94.872'
          ry='94.494'
        ></ellipse>
        <ellipse
          cx='110.936'
          cy='155.259'
          fill='url(#b)'
          fillOpacity='1'
          stroke='none'
          strokeDasharray='none'
          strokeMiterlimit='4'
          strokeWidth='0.048'
          filter='url(#c)'
          opacity='0.97'
          rx='58.775'
          ry='57.83'
          transform='matrix(1.47044 0 0 1.45341 -53.273 -65.483)'
        ></ellipse>
        <g fillOpacity='1' stroke='none' strokeWidth='1.068'>
          <path
            fill='#00f'
            strokeWidth='0.283'
            d='M-62.844 59.987c17.587 13.664 40.512 18.764 40.544 40.527 0 31.428-26.823 56.906-59.91 56.906-11.733-.014-23.204-3.3-32.99-9.452 12.955 11.871 31.051 18.614 49.999 18.63 37.888 0 68.603-26.367 68.603-58.894-.039-29.462-32.235-43.783-66.246-47.717z'
            opacity='0.342'
            transform='matrix(.87605 0 0 1 150.896 52.16)'
          ></path>
          <path
            fill='navy'
            strokeWidth='0.283'
            d='M-41.3 59.231C-26.735 76.297-8.346 76.105-8.314 97.868c0 31.429-26.823 56.906-59.91 56.906-11.733-.014-23.204-3.3-32.989-9.451 12.954 11.87 31.05 18.614 49.998 18.63 37.888 0 68.603-26.368 68.603-58.895-.039-29.462-23.541-44.917-58.686-45.827z'
            opacity='0.798'
            transform='matrix(.87605 0 0 1 150.896 52.16)'
          ></path>
          <path
            fill='#0ff'
            strokeWidth='0.283'
            d='M-32.587 82.662c17.852 6.226 22.015 25.267 12.593 45.19-26.836-21.373-23.988 23.66-52.646 23.66-10.163-.009-20.099-2.161-28.574-6.19 11.22 7.775 26.894 12.191 43.306 12.201 32.817 0 59.42-17.268 59.42-38.57-.034-19.294-4.64-33.715-34.099-36.291z'
            opacity='0.838'
            transform='matrix(.87605 0 0 1 150.896 52.16)'
          ></path>
          <path
            fill='navy'
            strokeDasharray='none'
            strokeMiterlimit='4'
            strokeWidth='0.075'
            markerMid='url(#d)'
            d='M-29.235 42.307a72.892 59.475 0 0141.052 53.419A72.892 59.475 0 01-61.076 155.2a72.892 59.475 0 01-40.138-9.878 83.47 61.554 0 0060.833 19.47 83.47 61.554 0 0083.47-61.553 83.47 61.554 0 00-72.324-60.933z'
            opacity='1'
            transform='matrix(.87605 0 0 1 150.896 52.16)'
          ></path>
        </g>
        <path
          fill='#000'
          fillOpacity='1'
          stroke='none'
          strokeWidth='0.287'
          d='M110.888 89.262l-6.502 3.475-3.613 29.41H64.539c-.86-1.997-2.982-2.083-5.345-2.085-3.174 0-5.747 2.333-5.747 5.212 0 2.878 2.573 5.211 5.747 5.211 2.36 0 4.48-.092 5.345-2.084h35.466v.007l2.282 79.147c-27.927-1.717-52.458-15.4-65.395-35.702l4.393.076c-4.722-4.16-6.672-7.734-5.515-19.906-7.296 10.483-7.994 18.385-6.896 19.69l4.187.074c6.953 29.049 35.064 51.252 69.737 53.513l.011.381 9.105.103.01-.368c35.655-1.426 64.842-23.97 71.94-53.619l4.806-.083c1.098-1.306.4-9.208-6.895-19.691 1.157 12.172-.793 15.746-5.515 19.906l3.122-.054c-13.163 20.662-38.362 34.496-66.942 35.79l2.297-79.09-.022-.174h37.756c.86 1.996 2.982 2.082 5.345 2.084 3.174 0 5.746-2.333 5.746-5.211 0-2.879-2.572-5.212-5.746-5.212-2.36 0-4.48.093-5.345 2.085h-38.52zm-51.694 34.412c1.135 0 2.056.716 2.056 1.6 0 .883-.92 1.6-2.056 1.6-1.136 0-2.056-.717-2.057-1.6 0-.884.921-1.6 2.057-1.6zm98.622 0c1.136 0 2.056.716 2.056 1.6 0 .883-.92 1.6-2.056 1.6-1.135 0-2.056-.717-2.056-1.6 0-.884.92-1.6 2.056-1.6z'
        ></path>
        <ellipse
          cx='28.537'
          cy='62.088'
          fill='#666'
          fillOpacity='0'
          stroke='none'
          strokeDasharray='none'
          strokeMiterlimit='4'
          strokeWidth='0.07'
          opacity='0.838'
          rx='5.481'
          ry='7.371'
        ></ellipse>
        <ellipse
          cx='32.506'
          cy='80.42'
          fill='#666'
          fillOpacity='0'
          stroke='none'
          strokeDasharray='none'
          strokeMiterlimit='4'
          strokeWidth='0.07'
          opacity='0.838'
          rx='9.827'
          ry='11.717'
        ></ellipse>
      </svg>
    );
  }
}
export default Recruit;
