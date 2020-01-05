import React from 'react';

class Harpoonist extends React.Component {
  static _messege='We need a steady hand like yours. Stay focused when your target is near. You are now a Harpoonist.';
  render() {
    return (
        <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        width='1100' 
        height='1100'
        viewBox='-5 5 250 250'
      >
        <defs>
          <linearGradient id='b'>
            <stop offset='0' stopColor='#fff' stopOpacity='1'></stop>
            <stop offset='1' stopColor='#fff' stopOpacity='0'></stop>
          </linearGradient>
          <linearGradient id='a'>
            <stop offset='0' stopColor='#f9f9f9' stopOpacity='1'></stop>
            <stop offset='1' stopColor='#f9f9f9' stopOpacity='0'></stop>
          </linearGradient>
          <marker orient='auto' overflow='visible' refX='0' refY='0'>
            <path
              fill='#333'
              fillOpacity='1'
              fillRule='evenodd'
              stroke='#000'
              strokeOpacity='1'
              strokeWidth='.4pt'
              d='M4 0l2-2-7 2 7 2-2-2z'
            ></path>
          </marker>
          <marker id='d' orient='auto' overflow='visible' refX='0' refY='0'>
            <path
              fill='#333'
              fillOpacity='1'
              fillRule='evenodd'
              stroke='#000'
              strokeOpacity='1'
              strokeWidth='.4pt'
              d='M4 0l2-2-7 2 7 2-2-2z'
            ></path>
          </marker>
          <marker orient='auto' overflow='visible' refX='0' refY='0'>
            <path
              fill='#333'
              fillOpacity='1'
              fillRule='evenodd'
              stroke='none'
              strokeOpacity='0.988'
              strokeWidth='1pt'
              d='M0 0l5-5-17.5 5L5 5 0 0z'
              transform='matrix(-.8 0 0 -.8 -10 0)'
            ></path>
          </marker>
          <marker orient='auto' overflow='visible' refX='0' refY='0'>
            <path
              fill='#333'
              fillOpacity='1'
              fillRule='evenodd'
              stroke='none'
              strokeOpacity='0.988'
              strokeWidth='1pt'
              d='M0 0l5-5-17.5 5L5 5 0 0z'
              transform='matrix(.8 0 0 .8 10 0)'
            ></path>
          </marker>
          <marker orient='auto' overflow='visible' refX='0' refY='0'>
            <path
              fill='#fff'
              fillOpacity='1'
              fillRule='evenodd'
              stroke='#000'
              strokeOpacity='0'
              strokeWidth='.4pt'
              d='M-4 0l-2 2 7-2-7-2 2 2z'
            ></path>
          </marker>
          <marker orient='auto' overflow='visible' refX='0' refY='0'>
            <path
              fill='#fff'
              fillOpacity='1'
              fillRule='evenodd'
              stroke='#000'
              strokeOpacity='1'
              strokeWidth='.4pt'
              d='M4 0l2-2-7 2 7 2-2-2z'
            ></path>
          </marker>
          <marker orient='auto' overflow='visible' refX='0' refY='0'>
            <path
              fill='#fff'
              fillOpacity='1'
              fillRule='evenodd'
              stroke='#000'
              strokeOpacity='1'
              strokeWidth='.8pt'
              d='M-10 0l-4 4L0 0l-14-4 4 4z'
            ></path>
          </marker>
          <marker orient='auto' overflow='visible' refX='0' refY='0'>
            <path
              fill='#fff'
              fillOpacity='1'
              fillRule='evenodd'
              stroke='#000'
              strokeOpacity='1'
              strokeWidth='.8pt'
              d='M10 0l4-4L0 0l14 4-4-4z'
            ></path>
          </marker>
          <marker orient='auto' overflow='visible' refX='0' refY='0'>
            <path
              fill='gray'
              fillOpacity='1'
              fillRule='evenodd'
              stroke='#000'
              strokeOpacity='1'
              strokeWidth='.8pt'
              d='M10 0l4-4L0 0l14 4-4-4z'
            ></path>
          </marker>
          <marker orient='auto' overflow='visible' refX='0' refY='0'>
            <path
              fill='#000'
              fillOpacity='1'
              fillRule='evenodd'
              stroke='#000'
              strokeOpacity='1'
              strokeWidth='.8pt'
              d='M10 0l4-4L0 0l14 4-4-4z'
            ></path>
          </marker>
          <linearGradient
            id='e'
            x1='9.769'
            x2='15.613'
            y1='26.773'
            y2='21.628'
            gradientTransform='translate(-.33 .412)'
            gradientUnits='userSpaceOnUse'
            xlinkHref='#a'
          ></linearGradient>
          <radialGradient
            id='c'
            cx='19.938'
            cy='28.159'
            r='19.52'
            fx='19.938'
            fy='28.159'
            gradientTransform='matrix(1 0 0 .9758 .02 1.303)'
            gradientUnits='userSpaceOnUse'
            xlinkHref='#b'
          ></radialGradient>
          <filter
            id='f'
            width='1.553'
            height='1.546'
            x='-0.277'
            y='-0.273'
            colorInterpolationFilters='sRGB'
          >
            <feGaussianBlur stdDeviation='0.123'></feGaussianBlur>
          </filter>
        </defs>
        <g display='inline' opacity='0.99'>
          <path
            fill='#ff9006'
            fillOpacity='1'
            stroke='#000'
            strokeDasharray='none'
            strokeDashoffset='0'
            strokeMiterlimit='4'
            strokeOpacity='0.988'
            strokeWidth='0.1'
            d='M38.997 32.734A19.466 18.993 0 0115.97 47.37 19.466 18.993 0 01.892 24.95a19.466 18.993 0 0122.93-14.784 19.466 18.993 0 0115.227 22.324'
            opacity='1'
          ></path>
          <path
            fill='url(#c)'
            fillOpacity='1'
            stroke='#000'
            strokeDasharray='none'
            strokeDashoffset='0'
            strokeMiterlimit='4'
            strokeOpacity='0.988'
            strokeWidth='0.1'
            d='M38.997 32.734A19.466 18.993 0 0115.97 47.37 19.466 18.993 0 01.892 24.95a19.466 18.993 0 0122.93-14.784 19.466 18.993 0 0115.227 22.324'
            opacity='1'
          ></path>
          <path
            fill='none'
            stroke='#000'
            strokeLinecap='butt'
            strokeLinejoin='miter'
            strokeOpacity='1'
            strokeWidth='0.265'
            d='M24.001 35.624s-1.952 4.035-3.874 4.441c-3.64.77-8.662-1.298-10.11-4.724-1.332-3.147.828-7.385 3.354-9.686 1.666-1.517 4.337-1.931 6.567-1.606 4.135.603 6.946 12.52 10.82 6.33 3.874-6.189-5.056-14.787-5.056-14.787'
          ></path>
          <path
            fill='#333'
            fillOpacity='1'
            stroke='#000'
            strokeDasharray='none'
            strokeDashoffset='0'
            strokeMiterlimit='4'
            strokeOpacity='1'
            strokeWidth='0.017'
            markerMid='url(#d)'
            d='M25.061 14.077a.834 1.215 0 00-.843.97.834 1.215 0 00.646 1.434.834 1.215 0 00.986-.937l.002-.015A.834 1.215 0 0025.2 14.1a.834 1.215 0 00-.139-.023zm-.055.704a.356.545 0 01.059.01.356.545 0 01.278.641v.007a.356.545 0 01-.422.42.356.545 0 01-.276-.643.356.545 0 01.36-.435z'
            opacity='1'
          ></path>
          <path
            fill='#fff'
            fillOpacity='1'
            stroke='none'
            strokeDasharray='none'
            strokeDashoffset='0'
            strokeMiterlimit='4'
            strokeOpacity='1'
            strokeWidth='0.017'
            d='M18.077 23.228a.053.301 0 01-.063.232.053.301 0 01-.04-.356.053.301 0 01.062-.234.053.301 0 01.041.354'
            opacity='1'
            transform='rotate(-22.458)'
          ></path>
        </g>
        <g
          fillOpacity='1'
          strokeDasharray='none'
          strokeMiterlimit='4'
          strokeOpacity='1'
          strokeWidth='0.065'
        >
          <path
            fill='#520'
            stroke='#000'
            strokeLinecap='butt'
            strokeLinejoin='miter'
            d='M14.098 24.519l9.756 11.359.601-.401-8.352-12.228z'
          ></path>
          <path
            fill='#fff'
            stroke='none'
            strokeDashoffset='0'
            d='M-3.338 35.07a.08.975 0 01-.095.75.08.975 0 01-.063-1.15.08.975 0 01.095-.758.08.975 0 01.063 1.145'
            opacity='0.63'
            transform='matrix(.78345 -.62145 .61575 .78795 0 0)'
          ></path>
          <path
            fill='#fff'
            stroke='none'
            strokeDashoffset='0'
            d='M-10.371 23.293a.08.975 0 01-.095.751.08.975 0 01-.063-1.15.08.975 0 01.095-.759.08.975 0 01.063 1.146'
            opacity='0.63'
            transform='matrix(.53019 -.84788 .844 .53634 0 0)'
          ></path>
          <path
            fill='#4d4d4d'
            stroke='none'
            strokeLinecap='butt'
            strokeLinejoin='miter'
            d='M11.846 17.814c.203 1.702-2.26 7.805-.193 7.306 2.874-.694 2.87-.61 2.87-.61l1.488-1.184s3.215-2.772 1.338-2.386c-3.904.804-4.178-1.245-5.503-3.126z'
          ></path>
          <path
            fill='url(#e)'
            stroke='none'
            strokeLinecap='butt'
            strokeLinejoin='miter'
            d='M11.833 17.832c.203 1.702-2.26 7.805-.194 7.306 2.874-.695 2.87-.61 2.87-.61l1.488-1.184s3.215-2.773 1.338-2.386c-3.904.804-4.178-1.245-5.502-3.126z'
          ></path>
          <path
            fill='#fff'
            stroke='none'
            strokeDashoffset='0'
            d='M12.411 17.937l-.358.127-.098.367-.231-.301-.38.02.215-.313-.136-.355.364.108.295-.24.01.38z'
            filter='url(#f)'
            opacity='1'
          ></path>
        </g>
      </svg>
     
    );
  }
}
export default Harpoonist;
